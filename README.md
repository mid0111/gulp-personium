gulp-personium
==============
[![Build Status](https://travis-ci.org/mid0111/gulp-personium.svg?branch=master)](https://travis-ci.org/mid0111/gulp-personium) [![Code Climate](https://codeclimate.com/github/mid0111/gulp-personium/badges/gpa.svg)](https://codeclimate.com/github/mid0111/gulp-personium) [![Coverage Status](https://coveralls.io/repos/mid0111/gulp-personium/badge.svg?branch=master)](https://coveralls.io/r/mid0111/gulp-personium?branch=master)

This project is [gulp](http://gulpjs.com/) plugin for [personium.io](http://personium.io/) client development.

## Install

```bash
npm install --save-dev gulp-personium
```

## Usage

### Options

Set below options in constructor.

#### baseUrl (required)

Base URL to upload file.

#### baseDir (required)

Base directory to upload file.

````
Upload URL = baseUrl + '/' + baseDir + relative path from baseDir
````

#### token (optional)

Request token (not contains 'Bearer').

#### user (optional)

Account name for Basic authentication.  
If either `user` property and `token` property are appointed, ignore `user` property.  
So request to personium.io with 'Bearer' authentication scheme.

#### password (optional)

Password for Basic authentication.

### Support extension

This plugins support below extensions.
* js
* html
* css

### Sample

#### Upload WebDAV files.

Upload WebDAV files to WebDAV corrections.  
Note that you must create WebDAV corrections in advance.

```js
var gulp = require('gulp');
var Personium = require('gulp-personium');
var personium = new Personium({
  baseUrl: 'http://fqdn/todo-app',
  baseDir: 'app',
  token : 'masterToken'
});

gulp.task('upload', function() {
  gulp.src(['app/**/*.html', 'app/**/*.js', 'app/**/*.css'])
    .pipe(personium.upload());
});

gulp.task('default', ['upload']);

```

#### Upload WebDAV files and send a change notification for LiveReload.

Upload WebDAV files to WebDAV corrections when watching files are changed.  
Note that you must create WebDAV correction in advance.

```js
var gulp = require('gulp');
var Personium = require('gulp-personium');
var livereload = require('gulp-livereload');
var personium = new Personium({
  baseUrl: 'http://fqdn/todo-app',
  baseDir: 'app',
  token : 'masterToken'
});
var source = ['app/**/*.html', 'app/**/*.js', 'app/**/*.css'];


gulp.task('upload', function() {
  gulp.src(source)
    .pipe(personium.upload());
});

gulp.task('watch', ['upload'], function() {
  livereload.listen();

  gulp.watch(source)
    .on('change', function(event) {
      personium.upload(event, livereload.changed);
    });
});

gulp.task('default', ['watch']);

```

#### Basic authentication.

Setup for Basic authentication.

```js
var Personium = require('gulp-personium');
var personium = new Personium({
  baseUrl: 'http://fqdn/dc1-core/todo-app',
  baseDir: 'app',
  user : 'account name',
  password: 'password'
});
```
