var gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    bower = require('gulp-bower');

var env       = process.env.NODE_ENV || 'development',
    outputDir = './dist',
    bowerDir  = 'bower_components';

gulp.task('sass', ['bower'] , function() {
  var config = {};

  if (env === 'production') {
    config.outputStyle    = 'compressed';
    config.sourceComments = false;
  }

  config.errLogToConsole= true;

  config.includePaths = [
    bowerDir + '/susy/sass/'
  ];

  return gulp.src('./src/styles/app.scss')
      .pipe(sass(config))
      .pipe(gulp.dest(outputDir + '/styles'))
});

gulp.task('font', function() {
  return gulp.src('./src/fonts/*/*.{eot,svg,ttf,woff}')
      .pipe(gulp.dest(outputDir + '/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/fonts', ['font']);
});

gulp.task('bower', function() {
  return bower()
      .pipe(gulp.dest(bowerDir))
});

gulp.task('default', ['bower', 'font', 'sass']);