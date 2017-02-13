/* eslint-disable no-multi-spaces */

import gulp       from 'gulp';
import gutil      from 'gulp-util';
import sass       from 'gulp-sass';
import uglify     from 'gulp-uglify';
import concat     from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

var ASSETS_PATH = 'assets/';

// BEGIN: Paths
var paths = {
  scripts: {
    application: [
      'node_modules/jquery/dist/jquery.js',
      'assets/javascripts/modules/showcase.js'
    ]
  },
  stylesheets: {
    application: ['assets/stylesheets/scss/application.scss']
  },

  dest: {
    javascripts: `${ASSETS_PATH}/javascripts/`,
    stylesheets: `${ASSETS_PATH}/stylesheets/`
  }
};
// END: Paths

// BEGIN: Gulp Tasks
gulp.task('stylesheet-application', [], () => {
  console.log("toto")
  return gulp.src(paths.stylesheets.application)
             .pipe(!production() ? sourcemaps.init() : gutil.noop())
             .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
             .pipe(!production() ? sourcemaps.write('.') : gutil.noop())
             .pipe(gulp.dest(paths.dest.stylesheets));
});

gulp.task('javascript-uglify-application', [], () => {
  return gulp.src(paths.scripts.application)
             .pipe(!production() ? sourcemaps.init() : gutil.noop())
             .pipe(concat('application.js'))
//             .pipe(babel({ presets: ['es2015'] }))
             .pipe(!production() ? uglify() : gutil.noop())
             .pipe(!production() ? sourcemaps.write('.') : gutil.noop())
             .pipe(gulp.dest(paths.dest.javascripts));
});

gulp.task('stylesheet', ['stylesheet-application']);
gulp.task('javascript', ['javascript-uglify-application']);

gulp.task('build', ['javascript', 'stylesheet']);

gulp.task('watch', () => {
  gulp.watch('assets/stylesheets/scss/**/*.scss', ['stylesheet']);
  gulp.watch([
    'assets/javascripts/**/*.js',
    '!assets/javascripts/application.*'
  ], [
    'javascript'
  ]);
});

gulp.task('default', ['watch']);
// END: Gulp Tasks

// BEGIN: Helper functions
function production () {
  return gutil.env.type === 'production';
}
// END: Helper functions
