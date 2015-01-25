gulp-personium
==============
[![Build Status](https://travis-ci.org/mid0111/gulp-personium.svg?branch=master)](https://travis-ci.org/mid0111/gulp-personium) [![Code Climate](https://codeclimate.com/github/mid0111/gulp-personium/badges/gpa.svg)](https://codeclimate.com/github/mid0111/gulp-personium)

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

    ````
Upload URL = baseUrl + '/' + baseDir + relative path from baseDir
    ````
  * `token`: Request token (not contains 'Bearer').

* support extension
  * js
  * html
  * css

* sample gulpfile.js to upload webdav files and to reload browser.

  ```js
  var gulp = require('gulp');
  var Personium = require('gulp-personium');
  var livereload = require('gulp-livereload');
  var personium = new Personium({
            baseUrl: 'http://192.168.59.103:8080/dc1-core/todo-app',
            baseDir: 'app',
            token : 'personium.io'
          });
  
  gulp.task('watch', function() {
    livereload.listen();
  
    gulp.watch(['app/**/*.html', 'app/**/*.js', 'app/**/*.css'])
      .on('change', function(event) {
        personium.upload(event, livereload.changed);
      });
  });
  
  gulp.task('default', ['watch']);
  
  ```

