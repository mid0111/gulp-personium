gulp-personium
==============
[![Build Status](https://travis-ci.org/mid0111/gulp-personium.svg?branch=master)](https://travis-ci.org/mid0111/gulp-personium) [![Code Climate](https://codeclimate.com/github/mid0111/gulp-personium/badges/gpa.svg)](https://codeclimate.com/github/mid0111/gulp-personium) [![Coverage Status](https://coveralls.io/repos/mid0111/gulp-personium/badge.svg?branch=master)](https://coveralls.io/r/mid0111/gulp-personium?branch=master)

This project is [gulp](http://gulpjs.com/) plugin for [personium.io](http://personium.io/) client development.

## Install

```bash
npm install --save-dev gulp-personium
```

## Usage

### options

Set below options in constructor.

* `baseUrl`(required): Base URL to upload file.
* `baseDir`(required): Base directory to upload file.

  ````
Upload URL = baseUrl + '/' + baseDir + relative path from baseDir
  ````
* `token`(optional): Request token (not contains 'Bearer').

### support extension

This plugins support below extensions.
* js
* html
* css

### Sample

#### Upload webdav files.

Upload WebDAV file to WebDAV correction.  
Note that you must create WebDAV correction in advance.

```js
var gulp = require('gulp');
var Personium = require('gulp-personium');
var personium = new Personium({
  baseUrl: 'http://192.168.59.103:8080/dc1-core/todo-app',
  baseDir: 'app',
  token : 'masterToken'
});

gulp.task('upload', function() {
  gulp.src(['app/**/*.html', 'app/**/*.js', 'app/**/*.css'])
    .pipe(personium.upload());
});

gulp.task('default', ['upload']);

```

#### upload webdav files and to reload browser.

Upload WebDAV file to WebDAV correction when watching file is changed.  
Note that you must create WebDAV correction in advance.

```js
var gulp = require('gulp');
var Personium = require('gulp-personium');
var livereload = require('gulp-livereload');
var personium = new Personium({
  baseUrl: 'http://192.168.59.103:8080/dc1-core/todo-app',
  baseDir: 'app',
  token : 'masterToken'
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
