var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var paths = {
  index: './src/index.html',
  dist: './dist'
};

gulp.task('index', function() {
  return gulp.src(paths.index)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['index']);

gulp.task('index-watch', ['index'], browserSync.reload);

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });

    gulp.watch(paths.index, ['index-watch']);
});
