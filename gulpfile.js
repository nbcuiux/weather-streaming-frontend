// generated on 2017-02-02 using generator-webapp 2.3.2
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

const $ = gulpLoadPlugins();

gulp.task('styles', () => {
  return gulp.src('src/styles/*.scss')
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe(concat('assets/css/main.css'))
    .pipe(gulp.dest(''));
});

gulp.task('scripts', () => {
  return gulp.src([
    // Order them the way they need to be loaded
    'src/scripts/vendor/TweenMax.min.js',
    'src/scripts/vendor/TimelineMax.min.js',
    'src/scripts/vendor/jquery.magnific-popup.js',
    'src/scripts/main.js',
  ])
    .pipe(concat('main-bundle.js'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', () => {
  gulp.watch('src/styles/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);

gulp.task('production-styles', () => {
  return gulp.src('assets/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('production-scripts', () => {
  return gulp.src('assets/js/main-bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('build', ['styles','scripts', 'production-styles', 'production-scripts',]);

    