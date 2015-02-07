/// <vs Clean='clean' SolutionOpened='watch' />
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var outputLocation = 'dist';


gulp.task('clean', function () {
	del.sync([outputLocation + '/**']);
});

gulp.task('vendor-scripts', function () {
	var vendorSources = {
		jquery: ['bower_components/jquery/dist/jquery.min.js'
				,'bower_components/jquery-validation/dist/jquery.validate.min.js'
				,'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js'],
		other: ['bower_components/bootstrap/js/bootstrap.min.js',
					'bower_components/respond/dest/respond.min.js']
	};

	gulp.src(vendorSources.jquery)
		.pipe(concat('jquery.bundle.min.js'))
		.pipe(gulp.dest(outputLocation + '/vendor/scripts/'));

	gulp.src(vendorSources.other)
		.pipe(concat('other.bundle.min.js'))
		.pipe(gulp.dest(outputLocation + '/vendor/scripts/'));

	gulp.src('bower_components/modernizr/modernizr.js')
		.pipe(gulp.dest(outputLocation + '/vendor/scripts/'));
});

gulp.task('vendor-css', function () {
			  
	gulp.src('bower_components/bootstrap/dist/css/*.min.css')
		.pipe(gulp.dest(outputLocation + '/vendor/css'));

	gulp.src('bower_components/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest(outputLocation + '/vendor/fonts'));
});

gulp.task('css', function () {
	gulp.src('Content/**/*.less')
		.pipe(less({
			compress: true
		}))
		.pipe(concat('compiled.min.css'))
		.pipe(gulp.dest(outputLocation + '/css'));
});

gulp.task('watch', function () {
	gulp.watch('bower_comonents/**/*', ['vendor-scripts', 'vendor-css']);
	gulp.watch('Content/**/*.less', ['css']);
});

gulp.task('default', ['clean', 'vendor-scripts', 'vendor-css', 'css', 'watch'], function(){});


