module.exports = function (gulp, bump) {
  return function() {
    gulp.task('bump-version', function() {
      return gulp.src(['./package.json']).pipe(bump({type: 'patch'})).pipe(gulp.dest('./'));
    });
  }
};
