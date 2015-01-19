var through  = require('through2');
var gutil    = require('gulp-util');
var fs = require('fs');
var path = require('path');
var request = require('request');

module.exports = function(options) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      cb();
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-personium', 'Streaming not supported'));
      cb();
    }

    console.log('File ' + file.path +  'uploading...');

    var formattedPath = path.normalize(file.path).replace(/\\/g, '\/');
    
    var regExp = new RegExp('^.*\/' + options.baseDir +'\/(.*)');
    var relativePath = formattedPath.replace(regExp, '\/' + options.baseDir + '\/$1');
    var requestUrl = options.baseUrl + relativePath;

    var ext = path.extname(file.path);

    var contentType;
    if(ext === '.js') {
      contentType = 'text/javascript';
    } else if(ext === '.html') {
      contentType = 'text/html';
    } else if(ext === '.css') {
      contentType = 'text/css';
    }

    var parent = this;
    request.put({
      url: requestUrl,
      body: fs.readFileSync(file.path),
      headers :{
        'Authorization': 'Bearer ' + options.token,
        'Content-Type': contentType
      }
    }, function(err, response, body) {
      if(err) console.log(err);
      if(response) console.log('Response: ' + response.statusCode);
      if(body) console.log(body);

      parent.push(file);
      cb();
    });
  });
};

