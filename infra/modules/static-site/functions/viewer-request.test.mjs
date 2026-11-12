// Checks the viewer-request function the way CloudFront runs it: as a handler over an event, with `SITE`
// defined ahead of it by the module.
//
//   node --test infra/modules/static-site/functions/viewer-request.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = readFileSync(new URL('./viewer-request.js', import.meta.url), 'utf8');

const load = (site) => new Function('SITE', `${source}\nreturn handler;`)(site);

const event = (uri, host, querystring = {}) => ({
  request: { method: 'GET', uri, querystring, headers: host === undefined ? {} : { host: { value: host } } },
});

const onDomain = load({ canonical: 'www.example.test', redirects: ['example.test'] });
const withoutDomain = load({ canonical: '', redirects: [] });

test('a directory-style URI is mapped onto its index.html, on any host', () => {
  const cases = {
    '/': '/index.html',
    '/owners/': '/owners/index.html',
    '/owners': '/owners/index.html',
    '/legal/privacy': '/legal/privacy/index.html',
    '/favicon.ico': '/favicon.ico',
    '/_astro/font.abc123.woff2': '/_astro/font.abc123.woff2',
    '/sitemap-index.xml': '/sitemap-index.xml',
  };

  for (const handler of [onDomain, withoutDomain]) {
    for (const host of ['www.example.test', 'd111111abcdef8.cloudfront.net']) {
      for (const [uri, mapped] of Object.entries(cases)) {
        assert.equal(handler(event(uri, host)).uri, mapped, `${host}${uri}`);
      }
    }
  }
});

test('a redirect host is sent to the same path on the canonical host, permanently', () => {
  const response = onDomain(event('/owners/', 'example.test'));

  assert.equal(response.statusCode, 301);
  assert.equal(response.headers.location.value, 'https://www.example.test/owners/');
  assert.equal(response.headers['cache-control'].value, 'public, max-age=86400');
});

test('the root path and the path as asked are kept: the redirect does not map it onto index.html', () => {
  assert.equal(onDomain(event('/', 'example.test')).headers.location.value, 'https://www.example.test/');
  assert.equal(onDomain(event('/owners', 'example.test')).headers.location.value, 'https://www.example.test/owners');
});

test('the query string survives the redirect as it came, repeated keys and bare keys included', () => {
  const response = onDomain(
    event('/', 'example.test', {
      utm_source: { value: 'card' },
      tag: { value: 'a', multiValue: [{ value: 'a' }, { value: 'b%20c' }] },
      flag: { value: '' },
    }),
  );

  assert.equal(response.headers.location.value, 'https://www.example.test/?utm_source=card&tag=a&tag=b%20c&flag');
});

test('the host is matched without regard to case', () => {
  assert.equal(onDomain(event('/', 'Example.TEST')).statusCode, 301);
});

test('the canonical host and the distribution name are served, not redirected', () => {
  assert.equal(onDomain(event('/', 'www.example.test')).statusCode, undefined);
  assert.equal(onDomain(event('/', 'd111111abcdef8.cloudfront.net')).statusCode, undefined);
});

test('a site with no domain redirects nothing, and a request with no host still works', () => {
  assert.equal(withoutDomain(event('/', 'example.test')).uri, '/index.html');
  assert.equal(onDomain(event('/owners', undefined)).uri, '/owners/index.html');
});
