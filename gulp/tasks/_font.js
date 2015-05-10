module.exports = function(gulp, plugins, config) {
  'use strict';
  return function () {
    return gulp
        .src(config.fonts.src)
        .pipe(plugins.symlink(config.fonts.output))
        ;
  };
};