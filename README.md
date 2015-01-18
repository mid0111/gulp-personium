gulp-personium
==============

This project is gulp plugin for personium.io client development.

## Install

```bash
npm install --save-dev gulp-personium
```

## Usage

### Upload WebDAV file on change.

```js
var gulp = require('gulp');
var Personium = require('gulp-personium');

gulp.task('watch', function() {
  var personium = new Personium({
    baseUrl: 'http://192.168.59.103:8080/dc1-core/todo-app',
    token : 'personium.io'
  });

  gulp.watch(['app/**/*.html', 'app/**/*.js'])
    .on('change', personium.upload);
});

gulp.task('default', ['watch']);
```

