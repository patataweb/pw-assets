module.exports = function(gulp, plugins, config) {
  'use strict';
  var assign = Object.assign || require('object.assign');

  return function() {
    return gulp
        .src(config.javascript.src)
        .pipe(plugins.plumber())
        .pipe(plugins.jshint(config.javascript.jshint))
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.changed(config.javascript.output, {extension: '.js'}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel(config.javascript.babel))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(config.javascript.output));
  };
};