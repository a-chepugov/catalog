;//
'use strict';
var notify = require("gulp-notify");
var rename = require('gulp-rename');

var gulp = require('gulp');

var ProjectDir = 'public_html';
// Задание по-умолчанию =============================

gulp.task('default', ['html', 'compass', 'scss', 'css', 'js', 'connect'],
	function () {
		gulp.watch(ProjectDir + '/**/*.html', ['html']);
		//gulp.watch(ProjectDir + '/**/*.scss', ['scss']);
//		setInterval( function () {
//			gulp.run('scss');
//		},9999);

		gulp.watch(ProjectDir + '/**/*.css', ['css']);
		gulp.watch(ProjectDir + '/**/*.js', ['js']);

		gulp.watch([ProjectDir + '/**/*.{jpg,jpeg,png,svg}'], ['reloadconnect']);
	});
// Пакетные задания =============================

gulp.task('html', function () {
	return gulp.src(ProjectDir + '/**/*.html')
		.pipe(rev())
		.pipe(connect.reload())
		.on('error', console.log);
});

gulp.task('scss', function () {
	return gulp.src([ProjectDir + '/**/*.scss', '!' + ProjectDir + '/**/mixins/*.scss'])
//			.pipe(csscomb())
		.pipe(gulp.dest(ProjectDir))
		.pipe(connect.reload())
		.on('error', console.log);
});

gulp.task('css', function () {
	return gulp.src(ProjectDir + '/**/main.css')
		.pipe(autoprefixer({
			browsers: ['last 15 versions', '> 1%', 'ie 8'],
			cascade: false
		}))
		//.pipe(csslint())
		//.pipe(csslint.reporter('text'))
		.pipe(minifyCss({}))
		.pipe(rename(
			{
				basename: "main",
				suffix: ".min"
			}))
		.pipe(rev())
		.pipe(gulp.dest(ProjectDir + ''))
		.on('error', console.log);
});

gulp.task('js', function () {
	return gulp.src(ProjectDir + '/**/*.js')
		.pipe(rev())
		.pipe(connect.reload())
		.on('error', console.log);
});

// Заготовки заданий =============================

var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
gulp.task('connect', function () {
	return connect.server({
		root: ProjectDir + '',
		livereload: true
	});
});
gulp.task('reloadconnect', function () {
	return connect.reload();
});

var csscomb = require('gulp-csscomb');
gulp.task('csscomb', function () {
	return gulp.src(ProjectDir + '/**/*.scss')
		.pipe(csscomb())
		.pipe(gulp.dest(ProjectDir + ''));
});

var compass = require('gulp-compass');
gulp.task('compass', function () {
	var templatePath = ProjectDir + '/assets/templates/july/'; // Временна затычка, посмотреть настройки модуля
	return setTimeout(function () {

		gulp.src(ProjectDir + '/**/*.scss')
			.pipe(compass({
				//project: templatePath,
				config_file: templatePath + 'config.rb',
				sass: templatePath + './sass',
				css: templatePath + './stylesheets',
				task: 'watch'
			}));
	}, 1);
});

var autoprefixer = require('gulp-autoprefixer');
gulp.task('autoprefixer', function () {
	return gulp.src(ProjectDir + '/**/main.css')
		.pipe(autoprefixer({
			browsers: ['last 15 versions', '> 1%', 'ie 8'],
			cascade: false
		}))
		.pipe(rename(
			{
				suffix: ".withPrefixes"
			}))
		.pipe(gulp.dest(ProjectDir + ''));
});

var minifyCss = require('gulp-minify-css');
gulp.task('minifycss', function () {
	return gulp.src(ProjectDir + '/**/*.withPrefixes.css')
		.pipe(minifyCss({}))
		.pipe(rename(
			{
				basename: "main",
				suffix: ".min"
			}))
		.pipe(gulp.dest(ProjectDir + ''));
});

var uncss = require('gulp-uncss');
gulp.task('uncss', function () {
	return gulp.src(ProjectDir + '/**/*.min.css')
		.pipe(uncss({
			html: [ProjectDir + '/*.html', 'alex/**/*.htm']
		}))
		.pipe(gulp.dest(ProjectDir + ''));
});

var csslint = require('gulp-csslint');
gulp.task('csslint', function () {
	return gulp.src(ProjectDir + '/**/main.css')
		.pipe(csslint())
		.pipe(csslint.reporter('text'));
});

var rev = require('gulp-rev-append');
gulp.task('rev-append', function () {
	return gulp.src(ProjectDir + '/*.html')
		.pipe(rev())
		.pipe(gulp.dest(ProjectDir + ''));
});

var wiredep = require('wiredep').stream;
gulp.task('wiredep', function () {
	return gulp.src(ProjectDir + '/*.html')
		.pipe(wiredep({
			optional: 'devDependencies',
			directory: ProjectDir + '/bower_components',
			goes: 'here'
		}))
		.pipe(gulp.dest(ProjectDir + ''));
});


var shell = require('gulp-shell');
gulp.task('r', function () {
	return gulp.src(ProjectDir + '/**/requirejs-build.js')
		.pipe(shell([
			'r.js -o public_html/js/requirejs-build.js',
		], {
			templateData: {
				f: function (s) {
					return s;
				}
			}
		}));
});

//	shell([
//	'r.js -o ' + file.relative
//]));

