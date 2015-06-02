var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var paths = {
  index: './src/index.html',
  js: [
    './src/app/dss.js',
    './src/app/dss.controller.js',
  ],
  vendorJs: [
    'bower_components/angular/angular.js'
  ],
  dist: './dist'
};

gulp.task('index', function() {
  return gulp.src(paths.index)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('dss.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('vendor-js', function() {
  return gulp.src(paths.vendorJs)
    .pipe(concat('dss.vendor.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['index', 'vendor-js', 'js']);

gulp.task('index-watch', ['index'], browserSync.reload);
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });

    gulp.watch(paths.index, ['index-watch']);
    gulp.watch(paths.js, ['js-watch']);
});
