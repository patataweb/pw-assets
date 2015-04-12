//@todo not ready
module.exports = function(gulp) {
  return function(gulp, tools) {
    gulp.task('update-own-deps', function() {
      tools.updateOwnDependenciesFromLocalRepositories();
    });
  }
};