module.exports = function(gulp, plugins, config) {
  'use strict';

  function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  }

  return function() {
      gulp.watch(config.javascript.src, ['javascript', plugins.browserSync.reload]).on('change', reportChange);
      gulp.watch(config.html.src, ['html', plugins.browserSync.reload]).on('change', reportChange);
      gulp.watch(config.styles.watch, ['sass', plugins.browserSync.reload]).on('change', reportChange);
  };
};
