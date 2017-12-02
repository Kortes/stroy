var gulp 	= require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    csso = require('gulp-csso'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    nunjucks = require('gulp-nunjucks-html'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
  
var path = {
    build: { //куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        vendor: 'build/vendor'
    },
    src: { //откуда брать исходники
    	html: 'src/pages/*.html',
        templates: 'src/blocks',
        js: 'src/js/main.js',
        style: 'src/style/main.less',
        img: 'images/*.*',
        vendor: 'vendor/**/*.*'
    },
    watch: { //за изменением каких файлов мы хотим наблюдать
    	pages: 'src/pages/*.html',
        templates: 'src/blocks/**/*.njk',
        js: 'src/js/*.js',
        style: 'src/blocks/**/*.less',
        img: 'images/*.*',
        vendor: 'vendor/**/*.*'
    },
    clean: ['./build']
};

var config = {
    server: {
        baseDir: "./build"
    },
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('html', () => {
    return gulp.src(path.src.html)
        .pipe(nunjucks({
            searchPaths: [path.src.templates]
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('images', function() {
    gulp.src(path.src.img)
        .pipe(imagemin({ 
            optimizationLevel: 3, 
            progressive: true, 
            interlaced: true }))
        .pipe(gulp.dest(path.build.img))
});

gulp.task('vendor', function () {
    gulp.src(path.src.vendor)
        .pipe(gulp.dest(path.build.vendor))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
	'html',
    'images',
    'js',
    'style',
    'vendor'
]);

gulp.task('watch', function(){
    watch([path.watch.pages, path.watch.templates], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.vendor], function(event, cb) {
        gulp.start('vendor');
    });
    watch([path.watch.img], ['images']);
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);