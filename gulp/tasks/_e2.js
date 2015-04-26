//@todo not ready
module.exports = function(gulp, path, protractor) {
  return function() {
    gulp.task('e2e', ['webdriver_update', 'build-e2e'], function(cb) {
      return gulp.src(path.e2eSpecsDist + "/*.js").pipe(protractor({
        configFile: "protractor.conf.js",
        args      : ['--baseUrl', 'http://127.0.0.1:9000']
      })).on('error', function(e) {
        throw e;
      });
    });
  }
};