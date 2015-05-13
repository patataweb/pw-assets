module.exports = function(gulp, plugins, config) {
  'use strict';
  return function() {
    var jspm = require('jspm');

    var sassOptions = config.styles.options;

    var sass = plugins.sass(sassOptions);
    sass.on('error', function(error) {
      plugins.sass.logError(error);
      this.end();
    });

    return gulp
      .src(config.styles.src)
      .pipe(plugins.plumber(config.plumber))
      .pipe(plugins.systemjsResolver({systemConfig: './config.js', includePaths: sassOptions.includePaths}))
      .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass(sassOptions))
        .pipe(plugins.autoprefixer(config.styles.autoprefixer))
        .pipe(plugins.minifyCss(config.styles.minifyCss))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(config.styles.output))
      ;
  };
};
