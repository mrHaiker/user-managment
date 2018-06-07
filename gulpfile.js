"use strict";

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),

  reload = browserSync.reload;


var config = {  // конфиг для запуска локального сервера
  server: {
    baseDir: "./src"
  },
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_devil"
};

// ********************************** Таски **********************************

gulp.task('connect', function () {  // запускаем сервер с liveReload
  browserSync(config);
});

gulp.task('html', function () {     // перезагрузим наш сервер для обновлений при изменении html
  gulp.src('.src/index.html')
    .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function () {    // отслеживаем изменения файлов
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/**/*.js', ['html']);
});

// Default
gulp.task('default', ['connect', 'watch']);