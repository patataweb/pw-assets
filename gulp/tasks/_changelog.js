module.exports = function (gulp, fs, changelog) {
  return function() {
    gulp.task('changelog', function(callback) {
      var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
      return changelog({
        repository: pkg.repository.url,
        version   : pkg.version,
        file      : path.doc + '/CHANGELOG.md'
      }, function(err, log) {
        fs.writeFileSync(path.doc + '/CHANGELOG.md', log);
      });
    });
  }
};