/// <vs Clean='clean' SolutionOpened='build-and-watch' />
var gulp		= require('gulp');
var del			= require('del');
var concat		= require('gulp-concat');
var less		= require('gulp-less');
var uglify		= require('gulp-uglify');
var watch		= require('gulp-watch');
var sourcemaps	= require('gulp-sourcemaps');
var path		= require('path');
var flatten		= require('gulp-flatten');

var outputLocation = './dist';


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

	var vendorOutput = path.join(outputLocation, 'vendor/scripts');

	gulp.src(vendorSources.jquery)
		.pipe(concat('jquery.bundle.min.js'))
		.pipe(gulp.dest(vendorOutput));

	gulp.src(vendorSources.other)
		.pipe(concat('other.bundle.min.js'))
		.pipe(gulp.dest(vendorOutput));

	gulp.src('bower_components/modernizr/modernizr.js')
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(vendorOutput));

	gulp.src('bower_components/**/*.min.map')
		.pipe(flatten())
		.pipe(gulp.dest(vendorOutput));
});

gulp.task('vendor-css', function () {
			  
	gulp.src('bower_components/bootstrap/dist/css/*.min.css')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(outputLocation + '/vendor/css'));

	gulp.src('bower_components/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest(outputLocation + '/vendor/fonts'));
});

gulp.task('css', function () {
	gulp.src(['./Content/**/*.less', '!./Content/**/_*.less'])
		.pipe(sourcemaps.init())
		.pipe(less({
			compress: true
		}))
		.pipe(sourcemaps.write())
		.pipe(concat('compiled.min.css'))
		.pipe(gulp.dest(path.join(outputLocation, 'css')));
});

gulp.task('watch', function () {
	gulp.watch('bower_comonents/**/*', ['vendor-scripts', 'vendor-css']);
	gulp.watch('Content/**/*.less', ['css']);
});

gulp.task('build-and-watch', ['default', 'watch'], function () {});

gulp.task('default', ['clean', 'vendor-scripts', 'vendor-css', 'css'], function(){});


