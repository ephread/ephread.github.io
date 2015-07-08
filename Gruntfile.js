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
            'assets/javascripts/vendor/jquery-2.1.4.js',
            'assets/javascripts/vendor/viewport_units_buggyfill.js',
            'assets/javascripts/modules/viewport_units_buggyfill_init.js',
          ] 
        }
      }
    },
    watch: {
      css: {
        files: 'assets/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'assets/**/*.js',
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default',['watch']);
}