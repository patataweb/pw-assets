// Load configs
var config = require('./gulp/config');

// Load Lib
var gulp    = require('./node_modules/gulp/index');
var plugins = require('gulp-load-plugins')(config.loadPlugin);

// Load tasks
gulp.task('html', require('./gulp/tasks/_html')(gulp, plugins, config));
gulp.task('sass', require('./gulp/tasks/_sass')(gulp, plugins, config));
gulp.task('javascript', require('./gulp/tasks/_javascript')(gulp, plugins, config));

gulp.task('clean', require('./gulp/tasks/_clean')(gulp, plugins, config));

// Build tasks
gulp.task('build', require('./gulp/tasks/_build')(plugins, function() {}));
