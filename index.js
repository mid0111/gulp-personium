'use strict';

var path = require('path');
var fs = require('fs');
var request = require('request');
var options = {};

module.exports = exports = function(opts) {
  options = opts;
  return exports;
};

exports.options = options;

exports.upload = function(file, done) {
  var filePath = file;
  if('object' === typeof filePath) {
    filePath = filePath.path;
  }

  console.log('File ' + filePath +  ' uploading...');

  var formattedPath = path.normalize(filePath).replace(/\\/g, '\/');
  
  var regExp = new RegExp('^.*\/' + options.baseDir +'\/(.*)');
  var relativePath = formattedPath.replace(regExp, '\/' + options.baseDir + '\/$1');

  var requestUrl = options.baseUrl;
  if(!endsWith(requestUrl, '/')) {
    requestUrl += '/';
  }
  requestUrl += relativePath;

  var ext = path.extname(filePath);

  var contentType;
  if(ext === '.js') {
    contentType = 'text/javascript';
  } else if(ext === '.html') {
    contentType = 'text/html';
  } else if(ext === '.css') {
    contentType = 'text/css';
  }

  request.put({
    url: requestUrl,
    body: fs.readFileSync(filePath),
    headers :{
      'Authorization': 'Bearer ' + options.token,
      'Content-Type': contentType
    },
    rejectUnauthorized : false
  }, function(err, response, body) {
    if(err) {
      console.error(err);
      throw err;
    }
    if(response) {
      console.log('Response: ' + response.statusCode);
    }
    if(body) {
      console.log('Message: ' + body);
    }
    done(filePath);
  });
};

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
