module.exports = function(gulp, plugins, config) {
  'use strict';
  return function() {
    return gulp
        .src(config.html.src)
        .pipe(plugins.changed(config.html.output, {extension: '.html'}))
        .pipe(plugins.minifyHtml(config.html.option))
        .pipe(gulp.dest(config.html.output));
  };
};