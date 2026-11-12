// Viewer-request function (cloudfront-js-2.0). The module puts `var SITE = {...};` ahead of this file:
//
//   { canonical: 'www.example.com', redirects: ['example.com'] }, or { canonical: '', redirects: [] } when
//   the site has no domain.
//
// A request for one of the `redirects` hosts is answered with a permanent redirect to the same path and query
// on the canonical host. Any other host, the distribution's own *.cloudfront.net name included, is served.
//
// An S3 REST origin does not resolve index documents, so directory-style URIs are mapped onto their
// index.html object: /owners/ and /owners both serve /owners/index.html. A dot in the last segment marks a
// file, which passes through untouched.
function handler(event) {
  var request = event.request;
  var host = request.headers.host ? request.headers.host.value.toLowerCase() : '';

  if (SITE.redirects.indexOf(host) !== -1) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + SITE.canonical + request.uri + queryString(request.querystring) },
        // A day, so a canonical name that changes later does not stay in browsers for good.
        'cache-control': { value: 'public, max-age=86400' },
      },
    };
  }

  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.includes('.', uri.lastIndexOf('/'))) {
    request.uri = uri + '/index.html';
  }

  return request;
}

// The query string as it came, from the parsed form CloudFront gives: a key repeated has `multiValue`.
function queryString(querystring) {
  var pairs = [];

  Object.keys(querystring).forEach(function (key) {
    var entry = querystring[key];
    var values = entry.multiValue ? entry.multiValue.map(function (item) { return item.value; }) : [entry.value];

    values.forEach(function (value) {
      pairs.push(value === '' ? key : key + '=' + value);
    });
  });

  return pairs.length ? '?' + pairs.join('&') : '';
}
