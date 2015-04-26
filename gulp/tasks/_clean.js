module.exports = function (gulp, plugins, config) {
  return function() {
    return gulp
        .src([config.global.output])
        .pipe(plugins.vinylPaths(plugins.del));
  }
};
