var fs = require('fs');
var path = require('path');
var request = require('request');
var options = {};

module.exports = exports = function (obj) {

  options = {};
  if('string' === typeof obj.baseUrl) {
    options.baseUrl = obj.baseUrl;
  }
  if('string' === typeof obj.token) {
    options.token = obj.token;
  }
};

exports.prototype.options = options;

exports.prototype.upload = function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', uploading file...');

  var relativePath = event.path.replace(/^.*\/app\/(.*)$/g, '\/app\/$1');
  var ext = path.extname(event.path);

  var contentType;
  if(ext === '.js') {
    contentType = 'text/javascript';
  } else if(ext === '.html') {
    contentType = 'text/html';
  } else if(ext === '.css') {
    contentType = 'text/css';
  }

  request.put({
    url: options.baseUrl + relativePath,
    body: fs.readFileSync(event.path),
    headers :{
      'Authorization': 'Bearer ' + options.token,
      'Content-Type': contentType
    }
  }, function(err, response, body) {
    if(err) console.log(err);
    if(response) console.log('Response: ' + response.statusCode);
    if(body) console.log(body);
  });
};
