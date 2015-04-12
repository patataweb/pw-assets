module.exports = function(gulp, tools, path) {
  return function() {
    gulp.task('doc', ['doc-generate'], function() {
      tools.transformAPIModel(path.doc);
    });
  }
};