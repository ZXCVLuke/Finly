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



gulp.task('sass', function() {
    gulp.src('./css', { read: false })
      .pipe(clean())
    gulp.src('./sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./css'))
});

gulp.task('cssmin', function(){
    gulp.src('./css/*.css')
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(plumber())
      .pipe(rename({suffix: '.min'}))
      .pipe(cssnano({discardComments: {removeAll: true}}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./css/'))
});

gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/*.css', ['cssmin']);
});
