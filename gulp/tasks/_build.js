module.exports = function(plugins, callback) {
  'use strict';
  return function() {
    if (!callback) {
      callback = function() {
      };
    }
    return plugins.runSequence('clean', ['javascript', 'html', 'sass', 'font'], callback);
  };
};
