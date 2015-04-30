module.exports = function (plugins, callback) {
  'use strict';
  return function () {
    return plugins.runSequence('clean', ['javascript', 'html', 'sass'], callback);
  };
};
