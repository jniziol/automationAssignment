const gulp = require('gulp');
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const minify = require('gulp-minify');

gulp.task('css', () => {
  return gulp.src('./src/css/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('images', ['copy-images'], () => {
  return gulp.src('./src/images/**/*.jp*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images'))
});

gulp.task('copy-images', () => {
  return gulp.src('./src/images/**/*.png')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images'))
});

gulp.task('default', ['copy-html','css', 'images', 'js'], () => {
  gulp.watch('./src/css/**/*.scss', ['css']);
  gulp.watch('./src/js/**/*.js', ['js']);
  browserSync.init({
      server: {
          baseDir: "./dist/"
      }
  });
});

gulp.task('copy-html', () => {
  return gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist'))
});

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(minify({
    ext:{
      min:'.min.js'
    }}))
  .pipe(gulp.dest('./dist/js'))
  .pipe(browserSync.stream());
});