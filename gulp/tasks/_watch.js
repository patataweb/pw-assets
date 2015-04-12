//@todo not ready
module.exports = function(gulp) {
  return function() {
    function reportChange(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }

    gulp.task('watch', ['serve'], function() {
      gulp.watch(path.source, ['build-system', browserSync.reload]).on('change', reportChange);
      gulp.watch(path.html, ['build-html', browserSync.reload]).on('change', reportChange);
      gulp.watch(path.style, browserSync.reload).on('change', reportChange);
    });
  }
};