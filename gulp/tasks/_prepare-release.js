module.exports = function(gulp) {
  return function() {
    gulp.task('prepare-release', function(callback) {
      return runSequence('build', 'lint', 'bump-version', 'doc', 'changelog', callback);
    });
  }
};