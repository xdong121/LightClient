'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

var babel = require('gulp-babel'); //dave

gulp.task('scripts-reload', function () {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return buildScripts();
});

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe(babel({
      presets: ['env']
    }))
    //.pipe($.eslint())
    //.pipe($.eslint.format())
    .pipe($.size())
};