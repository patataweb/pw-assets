module.exports = function(gulp, plugins, config) {
  var assign = Object.assign || require('object.assign');

  return function() {
    return gulp
        .src(config.javascript.src)
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.changed(config.javascript.output, {extension: '.js'}))
        .pipe(plugins.babel(assign({}, config.javascript.options, {modules: 'system'})))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.javascript.output))
        ;
  }
};