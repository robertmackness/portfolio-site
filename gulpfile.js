/* File: gulpfile.js */

var gulp  = require('gulp');
 
// plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');

gulp.task('demon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['default'])
    .on('change', ['default'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

// default gulp task
gulp.task('default', ['imagemin', 'miniHTML', 'miniJavascript', 'miniCSS'], function() {

  // watch HTML changes
  gulp.watch('./src/**/*.html', function() {
    gulp.run('miniHTML');
  });

  // watch JS changes
  gulp.watch('./src/public/javascripts/*.js', function() {
    gulp.run('jshint', 'miniJavascript');
  });

  // watch CSS changes
  gulp.watch('./src/public/css/*.css', function() {
    gulp.run('miniCSS');
  });

});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/public/javascripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify images
gulp.task('imagemin', function() {
  var imgSource = './src/public/images/**/*',
      imgDestination = './build/public/images';

  gulp.src(imgSource)
    .pipe(changed(imgDestination))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDestination))
})

// minify HTML
gulp.task('miniHTML', function(){
  var htmlSource = './src/**/*.html',
      htmlDestination = './build';

  gulp.src(htmlSource)
    .pipe(changed(htmlDestination))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDestination))
});

// javascript concat, strip debugging, minify/uglify
gulp.task('miniJavascript', function() {
  var jsSource = './src/public/javascripts/*.js',
      jsDestination = './build/public/javascripts/';

  gulp.src(jsSource)
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(jsDestination));
});

// CSS concat, auto-prefix and minify
gulp.task('miniCSS', function() {
  var cssSource = './src/public/css/*.css',
      cssDestination = './build/public/css/';
  gulp.src(cssSource)
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDestination));
});