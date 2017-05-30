var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
//var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();

gulp.task('clean',function(){
    return gulp.src('dist/')
    .pipe(clean());
});

gulp.task('jshint',function(){
    return gulp.src(['js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function(){
    return es.merge([gulp.src(['bower_components/angular/angular.min.js','bower_components/angular-route/angular-route.min.js','bower_components/angular-i18n/angular-locale_pt-br.js',
    'bower_components/angular-messages/angular-messages.min.js','bower_components/firebase/firebase.js']), 
    gulp.src(['lib/**/*.js','js/**/*.js']).pipe(concat('scripts.js')).pipe(uglify())
])
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', function(){
    return gulp.src('view/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/view'))
    .pipe(browserSync.reload({
            stream: true
    }));
});

gulp.task('cssmin',function(){
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css','css/**/*.css'])
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css')) 
    .pipe(browserSync.reload({
            stream: true
    })); 
});

gulp.task('imagemin',function(){
    return gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({
            stream: true
    }));
});


gulp.task('copy',function(){
    return gulp.src('ListaTelefonica-prod.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'))
});

/*gulp.task('server', function (cb) {
  exec('node/server.js', function (err, stdout, stderr) {
    cb(err);
  });
});*/

gulp.task('browser-sync',function(){
    browserSync.init(null,{
        open: false,
        server: {
            baseDir:'dist'
        }
    });
});


gulp.task('default',function(cb){
   return runSequence('clean',['jshint','uglify','htmlmin','cssmin','imagemin','copy'],cb)
});




