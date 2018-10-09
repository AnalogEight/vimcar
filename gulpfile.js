'use strict';

console.time("start");
var nodeModuleCache = require("fast-boot");
nodeModuleCache.start();
console.timeEnd("start");
console.time('loading plugins');
var gulp = require('gulp');
var concat = require('gulp-concat');
var help = require('gulp-task-listing');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var newer = require('gulp-newer');
var notify = require("gulp-notify");
var del = require('del');
var babel = require('gulp-babel');
console.timeEnd('loading plugins');

nodeModuleCache.saveStartupList();
nodeModuleCache.saveCache();

/* Load script config */
var scriptconfig = require('./src/scripts/script-config.json');
/*
 * Default task: `gulp`
 */

gulp.task('default', ['deploy']);


/*
 * Help task: `gulp help`
 */

gulp.task('help', help);

/*
 * Clean task: `gulp help`
 */
gulp.task('deploy:clean', function() {
  return del(['dist/**']);
});

/*
 * Deployment task: `gulp deploy`
 */

gulp.task('deploy', ['deploy:clean', 'deploy:styles', 'deploy:scripts', 'deploy:images', 'deploy:fonts']);

gulp.task('deploy:styles', ['deploy:clean'], function() {
  var sassOps = {
      outputStyle: 'compressed'
    },
    prefixOps = {
      browsers: ['last 2 versions', '> 1%', 'not ie <= 9']
    };

  return gulp.src('src/sass/pages/*.scss')
    .pipe(sass(sassOps))
    .pipe(prefixer(prefixOps))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('deploy:scripts', ['deploy:clean'], function() {
  var defaultTasks = Object.keys(scriptconfig);

  defaultTasks.forEach(function(file) {
    var object = scriptconfig[file];
    return gulp.src(object.scripts)

      /* concat files */
      .pipe(concat(file + '.js'))
      /* Compile to ES5 with Babel */
      .pipe(babel({
        presets: ['env']
      }))
      /* uglify and minify the scripts */
      .pipe(uglify())
      /* add suffix min to the filename */
      .pipe(rename({
        suffix: '.min'
      }))

      /* copy to destination folders */
      .pipe(gulp.dest('./dist/assets/scripts'))
  });
});

gulp.task('deploy:fonts', ['deploy:clean'], function() {

  return gulp.src('src/fonts/**/*.{eot,woff,woff2,ttf}')
    // Write to our dist folder
    .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('deploy:images', ['deploy:clean'], function() {

  return gulp.src('src/images/**/*.{png,svg,jpg,gif,ico}')
    // Write to our dist folder
    .pipe(gulp.dest('dist/assets/images'))
});

/*
 * Design task: `gulp design`
 */

gulp.task('design', ['design:fonts', 'design:styles', 'design:images', 'design:scripts', 'design:html'], function() {

  // File watchers
  gulp.watch('src/sass/**/*.scss', {
    interval: 1000
  }, ['design:styles']);
  gulp.watch('src/scripts/**/*.js', {
    interval: 1000
  }, ['design:scripts']);
  gulp.watch('src/fonts/**/*', {
    interval: 1000
  }, ['design:fonts']);
  gulp.watch('src/images/**/*.{svg,jpg,gif,ico,png}', {
    interval: 1000
  }, ['design:images']);
});

gulp.task('design:styles', function() {
  var sassOps = {
      outputStyle: 'compressed'
    },
    prefixOps = {
      browsers: ['last 2 versions', '> 1%', 'not ie <= 9']
    };

  return gulp.src('src/sass/pages/*.scss')
    // Init the sourcemaps
    .pipe(sourcemaps.init())
    // Convert sass to css
    .pipe(sass(sassOps))
    // Add vendor prefixes
    .pipe(prefixer(prefixOps))
    // Write the sourcemaps
    .pipe(sourcemaps.write('./'))
    // Write files to dist folder
    .pipe(gulp.dest('dist/assets/css'))
    // Reload the live server
    .pipe(notify({
      message: 'Styles done!',
      onLast: true
    }));
});

gulp.task('design:fonts', function() {
  return gulp.src('src/fonts/**/*.{eot,woff,woff2,ttf}')
    // Write to our dist folder
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(notify({
      message: 'Fonts done!',
      onLast: true
    }));
});

gulp.task('design:images', function() {
  return gulp.src('src/images/**/*.{png,svg,jpg,gif,ico}')
    // Write to our dist folder
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({
      message: 'Images done!',
      onLast: true
    }));
});


gulp.task('design:scripts', function() {
  var defaultTasks = Object.keys(scriptconfig);
  defaultTasks.forEach(function(file) {
    var object = scriptconfig[file];
    return gulp.src(object.scripts)

      /* concat files */
      .pipe(concat(file + '.min.js'))
      /* Compile to ES5 with Babel */
      .pipe(babel({
        presets: ['env']
      }))
      /* Check if newer */
      .pipe(newer('dist/assets/scripts'))
      /* uglify and minify the scripts */
      // .pipe(uglify())
      /* add suffix min to the filename */
      // .pipe(rename({
      //   suffix: '.min'
      // }))
      /* copy to destination folders */
      .pipe(gulp.dest('./dist/assets/scripts'))
      .pipe(notify({
        message: 'Scripts done for file: ' + file + '.min.js',
        onLast: true
      }));
  });
});

gulp.task('design:html', function() {
  return gulp.src('src/html/*.HTM')
    .pipe(newer('dist/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({
      message: 'HTML done!',
      onLast: true
    }));
});
