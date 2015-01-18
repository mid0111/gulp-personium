gulp-personium
==============

This project is gulp plugin for personium.io client development.

## Install

```bash
npm install --save-dev gulp-personium
```

## Usage

### Upload WebDAV file on change.

Upload WebDAV file to WebDAV correction.  
Note that you must create WebDAV correction in advance.

* options
  Set below options in constructor.
  * `baseDir`: Base directory to upload file.
  * `baseUrl`: Base URL to upload file.
    Upload URL = baseUrl + '/' + baseDir + relative path from baseDir
  * `token`: Request token (not contains 'Bearer').

* support extension
  * js
  * html
  * css

```js
var gulp = require('gulp');
var Personium = require('gulp-personium');

gulp.task('watch', function() {
  var personium = new Personium({
    baseUrl: 'http://192.168.59.103:8080/dc1-core/cellName',
    baseDir: 'app',
    token : 'masterToken'
  });

  gulp.watch(['app/**/*.html', 'app/**/*.js', 'app/**/*.css'])
    .on('change', personium.upload);
});

gulp.task('default', ['watch']);
```

