// Viewer-request function (cloudfront-js-2.0). An S3 REST origin does not resolve index documents, so
// directory-style URIs are mapped onto their index.html object: /owners/ and /owners both serve
// /owners/index.html. A dot in the last segment marks a file, which passes through untouched.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.includes('.', uri.lastIndexOf('/'))) {
    request.uri = uri + '/index.html';
  }

  return request;
}
