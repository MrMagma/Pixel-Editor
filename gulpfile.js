var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var del = require("del");
var stylus = require("gulp-stylus");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task("clean-build", function() {
    return del("dist/**/*");
});

gulp.task("build-src", function() {
    return gulp.src("src/**/*.jsx")
        .pipe(babel())
        .pipe(browserify())
        .pipe(gulp.dest("dist/src"));
});

gulp.task("build-styles", function() {
    return gulp.src("styles/**/*.styl")
        .pipe(stylus())
        .pipe(postcss([autoprefixer]))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("build", ["clean-build", "build-src", "build-styles"]);

gulp.task("default", ["build"]);
