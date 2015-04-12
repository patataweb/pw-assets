//@todo not ready
module.exports = function(gulp, path, yuidoc) {
  return function() {
    gulp.task('doc-generate', function(){
      return gulp.src(path.source)
          .pipe(yuidoc.parser(null, 'api.json'))
          .pipe(gulp.dest(path.doc));
    });
  }
};