module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/stylesheets/application.css': 'assets/stylesheets/scss/application.scss',
          'assets/stylesheets/ie6-8.css': 'assets/stylesheets/scss/ie6-8.scss'
        }
      }
    },
    uglify: {
      ephread: {
        options: {
          sourceMap: true,
          compress: true
        },
        files: {
          'assets/javascripts/application.js': [
            'assets/javascripts/vendor/konami.js',
            'assets/javascripts/vendor/smooth_scroll.js',
            'assets/javascripts/vendor/viewport_units_buggyfill.js',
            'assets/javascripts/lib/easter_egg.js',
            //'assets/javascripts/modules/smooth_scroll_init.js',
            'assets/javascripts/modules/easter_egg_init.js',
            'assets/javascripts/modules/viewport_units_buggyfill_init.js',
          ] 
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default',['watch']);
}