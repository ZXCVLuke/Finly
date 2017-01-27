'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var strip = require('gulp-strip-comments');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var inline = require('gulp-inline');

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('index.html', browserSync.reload);
});

gulp.task('inline', function() {
  gulp.src('index.html')
  .pipe(inline({
    base: '',
    css: [cssnano, autoprefixer({ browsers:['last 2 versions'] })],
  }))
  .pipe(gulp.dest('docs/'));
})
