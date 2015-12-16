var gulp = require("gulp");
var babelify = require("babelify");
var babel = require("gulp-babel");
var browserify = require("browserify");
var del = require("del");
var stylus = require("gulp-stylus");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");

gulp.task("clean-build", function() {
    return del.sync("dist/**/*");
});

gulp.task("browserify-js", function() {
    var b = browserify({
        entries: "./src/index.js",
        debug: true,
        transform: [babelify]
    });
    
    return b.bundle()
        .pipe(source("index.js"))
        .pipe(buffer())
        .pipe(gulp.dest("dist"));
});

gulp.task("build-js-files", function() {
    return gulp.src(["src/**/*.js", "src/**/*.jsx"])
        .pipe(babel())
        .pipe(gulp.dest("dist/src"));
});

gulp.task("build-src", ["browserify-js", "build-js-files"]);

gulp.task("build-styles", function() {
    return gulp.src("styles/**/*.styl")
        .pipe(stylus())
        .pipe(postcss([autoprefixer]))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("build", ["clean-build", "build-src", "build-styles"]);

gulp.task("default", ["build"]);
