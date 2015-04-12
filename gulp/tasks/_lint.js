//@todo not ready
module.exports = function(gulp, jshint, stylish) {
  gulp.task('lint', function() {
    return gulp.src(config.javascript.src).pipe(jshint()).pipe(jshint.reporter(stylish));
  });
};