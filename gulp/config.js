/* global module */
var src = 'src';
var js = src + '/js';
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
      'run-sequence'
    ]
  },
  'global': {
    'src': src,
    'output': dist
  },
  'styles': {
    'src': styles + '/app.scss',
    'output': dist + '/styles',
    'options': {

    },
    'scssLint': {
      bundleExec: true
    }
  },
  'javascript': {
    'src': js + '/**/*.js',
    'output': dist + '/js',
    'options': {
      filename: '',
      filenameRelative: '',
      blacklist: [],
      whitelist: [],
      modules: '',
      sourceMap: true,
      sourceMapName: '',
      sourceFileName: '',
      sourceRoot: '',
      moduleRoot: '',
      moduleIds: false,
      experimental: false,
      format: {
        comments: false,
        compact: false,
        indent: {
          parentheses: true,
          adjustMultilineComment: true,
          style: '  ',
          base: 0
        }
      }
    }
  },
  'html': {
    'src': views + '/**/*.html',
    'output': dist + '/html',
    'option': {
      conditionals: true,
      spare:true
    }
  }
};