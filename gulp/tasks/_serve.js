module.exports = function(gulp) {
  return function() {
    gulp.task('serve', ['build'], function(done) {
      browserSync({
        open  : false,
        port  : 9000,
        server: {
          baseDir   : ['.'],
          middleware: function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
          }
        }
      }, done);
    });
  }
};