var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var del = require("del");

gulp.task("clean-build", function() {
    return del("dist/**/*");
});

gulp.task("build", ["clean-build"], function() {
    return gulp.src("src/**/*.jsx")
        .pipe(babel())
        .pipe(browserify())
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["build"]);
