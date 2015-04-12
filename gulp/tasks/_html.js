module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp
        .src(config.html.src)
        .pipe(plugins.changed(config.html.output, {extension: '.html'}))
        .pipe(gulp.dest(config.html.output));
  }
};