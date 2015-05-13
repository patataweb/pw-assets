/* global module */
var src = 'src';
var js = src + '/scripts';
var styles = src + '/styles';
var views = src + '/views';
var dist = 'dist';

module.exports = {
  'loadPlugin': {
    pattern: [
      'gulp-*',
      'gulp.*',
      'del',
      'vinyl-paths',
      'run-sequence',
      'browser-sync'
    ]
  },
  'plumber': {
    errorHandler: function(e) {
      'use strict';
      console.log(e); // @todo nicer error with gulp utility
      this.emit('end');
    }
  },
  'global': {
    'src': src,
    'output': dist
  },
  'styles': {
    'src': styles + '/app.scss',
    'output': dist + '/styles',
    'watch': styles + '/**/*.scss',
    'options': {
      'includePaths': []
    },
    'minifyCss': {

    },
    'autoprefixer': {
      browsers: ['last 2 versions'],
      cascade: false
    }
  },
  'javascript': {
    'src': js + '/**/*.js',
    'output': dist + '/js',
    'babel': {  },
    'jshint': { }
  },
  'html': {
    'src': views + '/**/*.html',
    'output': dist,
    'option': {
      conditionals: true,
      spare:true
    }
  },
  'fonts': {
    'src': src + '/fonts',
    'output': dist + '/fonts'
  },
  'sourcemap': {  },
  'browserSync': {
    open  : true,
    port  : 9090,
    server: {
      baseDir   : ['src', 'dist'],
      middleware: function(req, res, next) {
        'use strict';
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }
};
