module.exports = function(gulp, plugins, config) {
  'use strict';
  return function () {
    return gulp
        .src(config.styles.src)
        .pipe(plugins.scssLint(config.styles.scssLint))
        .pipe(plugins.sass(config.styles.options))
        .pipe(gulp.dest(config.styles.output))
        ;
  };
};