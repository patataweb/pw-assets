module.exports = function (plugins, callback) {
  return function () {
    return plugins.runSequence('clean', ['javascript', 'html', 'sass'], callback);
  }
};
