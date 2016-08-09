"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var injectSvg = require("gulp-inject-svg");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("styles", function(){
	return gulp.src("./styles/**/*.scss")
	.pipe(sass().on("error", sass.logError))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	.pipe(concat("style.css"))
	.pipe(gulp.dest("./styles/"))
});

gulp.task("injectSvg", function(){
	return gulp.src("./**/*.html")
	.pipe(injectSvg())
	.pipe(gulp.dest("./"))
});

gulp.task("watch", function(){
	gulp.watch("./styles/**/*.scss", ["styles"]);
});
