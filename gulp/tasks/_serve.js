module.exports = function(gulp, plugins, config) {
  'use strict';
  return function() {
    return plugins.browserSync.init(config.browserSync);
  };
};
