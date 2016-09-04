var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');

gulp.task('scripts', function() {
  // minified
  gulp.src('src/ko-dropdown.js')
      .pipe(rename('ko-dropdown.min.js'))
      .pipe(uglify({ preserveComments: "license" }))
      .pipe(gulp.dest('dist'));

  // non minified
  gulp.src('src/ko-dropdown.js')
      .pipe(strip({ safe: true }))
      .pipe(gulp.dest('dist'));

  gulp.src('src/ko-dropdown.css')
      .pipe(gulp.dest('dist'));


});

gulp.task('default', ['scripts']);
