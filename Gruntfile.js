module.exports = function(grunt) {


  grunt.initConfig({
    svgmin: {
        options: {
            plugins: [
                { removeViewBox              : false },
                { removeEmptyAttrs           : false },
                { removeUselessStrokeAndFill : false }, 
            ]
        },
        dist: {
            files: {
                'dist/app/static/img/clb.svg'    : 'app/static/img/clb.svg',
                'dist/app/static/img/nav.svg'    : 'app/static/img/nav.svg',
            }
        }
    },

    cssmin: {
      target: {
        files: [
          {
              expand: true,
              cwd: 'app/static/css',
              src: ['*.css', '!*.min.css'],
              dest: 'dist/app/static/css',
              ext: '.min.css'
          },
          {
            'dist/app/static/cm/cm.min.css': ['app/static/cm/codemirror.css', 'app/static/cm/show-hint.css']
          },
         ]
      }
    },

    uglify: {
        options: {
          mangle: false
        },
        cmjs: {
          files: {
            'dist/app/static/cm/cm.min.js'   : ['app/static/cm/codemirror.js', 'app/static/cm/active-line.js', 'app/static/cm/clike.js', 'app/static/cm/matchbrackets.js', 'app/static/cm/show-hint.js'],
            'dist/app/static/js/main.min.js' : ['app/static/js/main.js']
          }
        }
    },

    'string-replace': {
      inline: {
        files:  [
            {'dist/tmp/': 'app/templates/*.html'},
            {'dist/tmp/': 'app/static/*.html'},
        ]
        ,
        options: {
          replacements: [
            {
              pattern: /<!-- codemirror includes -->(.*?)<!-- codemirror includes end -->/ig,
              replacement: '<link rel="stylesheet" href="cm/cm.min.css"><script src="cm/cm.min.js"></script>'
            },
            {
              pattern: /s\.css/ig,
              replacement: 's.min.css'
            },
            {
              pattern: /gh\.css/ig,
              replacement: 'gh.min.css'
            },
            {
              pattern: /main\.js/ig,
              replacement: 'main.min.js'
            },              
          ]
        }
      }
    },

    htmlmin: {
        dist: {
          options: {
            removeComments     : true,
            collapseWhitespace : true
          },
          files: [
            {
              expand: true,
              cwd: 'dist/tmp/app/templates/',
              src: ['*.html', '*.html'],
              dest: 'dist/app/templates/'
            },

            {
              expand: true,
              cwd: 'dist/tmp/app/static/',
              src: ['*.html', '*.html'],
              dest: 'dist/app/static/'
            },

          ]
        },
    },
      
    copy: {
      main: {
        options : {
           mode : true,
        },
        files: [
          {
              expand  : true,
              filter  : 'isFile',
              src: 
                [
                    'app/*.py',
                    'app/static/*.png',
                    'app/static/img/*.png',
                    'app/static/favicon.ico',
                    'app/static/robots.txt',
                    'app/static/sitemap.xml'
                ],
              dest: 'dist/', 
          },
        ],
      },
    },
  });    

  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['svgmin', 'cssmin', 'uglify', 'string-replace', 'htmlmin', 'copy']);    

};
