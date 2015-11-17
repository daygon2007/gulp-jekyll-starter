var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var cp = require('child_process');

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>' 
  })
};

// Get all files from _sass folder, minify them, contatinate them into a single file called main.css and send it to the css folder   
gulp.task('sass', function(){
	gulp.src('_sass/*.scss')
		.pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('_site/css'));
});

// Get all files from _js folder, lint through them, minify them, contatinate them into a single file called main.js and send it to the js folder
gulp.task('js', function(){
	gulp.src('_js/*.js')
		.pipe(plumber(plumberErrorHandler))
        .pipe(jshint())
        .pipe(jshint.reporter('fail'))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('_site/js'));
});

// Get all files from _img folder, optimize them and send them to the img folder
gulp.task('img', function(){
    gulp.src('images/**/*.{png,jpg,gif}')
        .pipe(plumber(plumberErrorHandler))
        .pipe(imagemin({
            optimizationLevel: 10,
            progressive: true
            }))
        .pipe(gulp.dest('_site/img'))
});

// Watch for changes in the source folders, tell browsersync to reload the broswer if a saved change is detected
gulp.task('watch', function() {
    gulp.watch('_sass/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('_js/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('images/**/*.{png,jpg,gif}', ['img']).on('change', browserSync.reload);
});

// Have gulp run the "jekyll build" command and build the site
gulp.task('jekyll', function (gulpCallBack){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build', '--watch'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});

// Open a browser window/refresh broswer window when a change is made
gulp.task('serve', ['js','sass','img'], function () {
    // Serve files from the root of this project
    browserSync.init({
		server: {
            baseDir: "_site",
        },
		port:4000,
		reloadDelay: 15000,
        reloadDebounce: 500
    });
});

gulp.task('default', ['sass', 'js', 'img', 'watch', 'jekyll', 'serve']);