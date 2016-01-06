var fs = require('fs');
var path = require('path');
var url = require('url');
var envify = require('envify/custom');

var defaultFile = 'index.html';
var folder = path.resolve(__dirname, '../');
var DEFAULT_PORT = 4000;

var options = {
  cleanCss: {
    s0: true
  }
};

module.exports = function main(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      server: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    nodemon: {
      prod: {
        script: 'server.js',
        options: {
          ignore: ['node_modules/**']
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/**/*'],
        tasks: ['browserify:dev'],
        options: { nospawn: true }
      },
      css: {
        files: 'src/css/**/*.less',
        tasks: ['less:dev']
      }
    },
    browserify: {
      prod: {
        options: {
          debug: false,
          transform: ['babelify', envify({NODE_ENV: 'production'})]
        },
        files: {
          'assets/js/app.js': ['src/js/index.jsx']
        }
      },
      staging: {
        options: {
          debug: false,
          transform: ['babelify', envify({NODE_ENV: 'staging'})]
        },
        files: {
          'assets/js/app.js': ['src/js/index.jsx']
        }
      },
      dev: {
        options: {
          debug: false,
          transform: ['babelify', envify({NODE_ENV: 'development'})]
        },
        files: {
          'assets/js/app.js': ['src/js/index.jsx']
        }
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      prod: {
        files: {
          'assets/js/app.js': 'assets/js/app.js'
        }
      }
    },
    less: {
      dev: {
        files: {
          'assets/css/app.css': 'src/css/cd-demo.less'
        }
      },
      prod: {
        options: {
          plugins: [
            new (require('less-plugin-clean-css'))(options.cleanCss)
          ]
        },
        files: {
          'assets/css/app.css': 'src/css/cd-demo.less'
        }
      }
    },
    browserSync: {
      files: ['assets/css/app.css', 'assets/js/app.js'],
      options: {
        watchTask: true,
        port: DEFAULT_PORT,
        server: {
          baseDir: ['./', 'assets'],
          middleware: function fn(req, res, next) {
            var fileName = url.parse(req.url);
            var fileExists;

            fileName = fileName.href.split(fileName.search).join('');
            fileExists = fs.existsSync(folder + fileName);

            if (!fileExists && fileName.indexOf('assets') < 0) {
              req.url = '/' + defaultFile;
            }

            return next();
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', '', function fn() {
    var tasks = ['less:prod', 'browserify:prod', 'uglify', 'concurrent'];
    grunt.task.run(tasks);
  });

  grunt.registerTask('build', '', function fn() {
    var tasks = ['less:prod', 'browserify:prod'];
    grunt.task.run(tasks);
  });

  grunt.registerTask('staging', '', function fn() {
    var tasks = ['less:dev', 'browserify:staging'];
    grunt.task.run(tasks);
  });

  grunt.registerTask('dev', '', function fn() {
    var tasks = ['less:dev', 'browserify:dev', 'browserSync', 'watch'];
    grunt.task.run(tasks);
  });

  grunt.event.on('watch', function fn(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
