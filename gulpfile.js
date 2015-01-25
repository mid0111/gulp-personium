var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.src(['test/**/*.js'])
    .pipe(mocha({reporter: 'mocha-lcov-reporter'}));
});

gulp.task('default', ['test']);

