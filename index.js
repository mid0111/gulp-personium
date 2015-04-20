'use strict';

var through = require('through2');
var path = require('path');
var fs = require('fs');
var request = require('request');
var gutil = require('gulp-util');

var pluginName = 'gulp-personium';
var options = {};

module.exports = exports = function(opts) {
  options = opts;
  return exports;
};

exports.options = options;

exports.upload = function(file, cb) {

  if(!file) {

    return through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        // return empty file
        cb(null, file);
        return;
      }
      if (file.isStream()) {
        cb(new gutil.PluginError(pluginName, 'Streaming not supported'));
        return;
      }
      uploadFile(file);
      cb(null, file);
    });
  }

  return uploadFile(file, cb);

};

function uploadFile(file, cb) {
  var filePath = file;
  if('object' === typeof filePath) {
    filePath = filePath.path;
  }

  gutil.log('File ' + filePath +  ' uploading...');

  request.put({
    url: getRequestUrl(filePath),
    body: fs.readFileSync(filePath),
    headers :{
      'Authorization': getCredential(options),
      'Content-Type': getContentType(filePath)
    },
    rejectUnauthorized : false
  }, function(err, response, body) {
    if(err) {
      gutil.log(err);
      if(cb) {
        cb(filePath, err);
      }

    } else {
      if(response) {
        gutil.log('Response: ' + response.statusCode);
      }
      if(body) {
        gutil.log('Message: ' + body);
      }
      if(cb) {
        cb(filePath);
      }
    }
  });
};

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function getContentType(filePath) {
  var ext = path.extname(filePath);

  if(ext === '.js') {
    return 'text/javascript';
  } else if(ext === '.html') {
    return 'text/html';
  } else if(ext === '.css') {
    return 'text/css';
  }
  return 'text/plain';
}

function getRequestUrl(filePath) {
  var formattedPath = path.normalize(filePath).replace(/\\/g, '\/');
  
  var regExp = new RegExp('^.*\/' + options.baseDir +'\/(.*)');
  var relativePath = formattedPath.replace(regExp, options.baseDir + '\/$1');

  var requestUrl = options.baseUrl;
  if(!endsWith(requestUrl, '/')) {
    requestUrl += '/';
  }
  requestUrl += relativePath;

  gutil.log('upload url: ' + requestUrl);

  return requestUrl;
}

function getCredential(opts) {
  if(opts.token) {
    return 'Bearer ' + opts.token;
  }
  if(opts.user) {
    return 'Basic ' + toBase64(opts.user + ':' + opts.password);
  }
  return null;
}

function toBase64(str) {
  return new Buffer(str, 'utf8').toString('base64');
}

