// Include gulp
var gulp = require('gulp');

// Include Our Plugins

require('./tasks/sass');
require('./tasks/browserify');
//require('./tasks/copy');
require( "./tasks/vendors" );

gulp.task('build', ['vendors', 'sass', 'browserify']);

gulp.task('dev', ['vendors', 'sass', 'watchify'], function() {

  // Watch source stylesheets
  gulp.watch([
    '**/*.scss'
  ], ['sass']);
  
  gulp.watch([ "./tasks/*.js", "./gulpfile.js" ], [ "jscs-build" ]);



});


// Default Task
gulp.task('default', ['dev']);