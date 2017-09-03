var gulp = require('gulp'),
	// sass = require('gulp-sass'),
	// browserSync = require('browser-sync').create(),
	// header = require('gulp-header'),
	// sourcemaps = require('gulp-sourcemaps'),
	// concat = require('gulp-concat'),
	// babel = require('gulp-babel'),
	gutil = require('gulp-util'),
	// cleanCSS = require('gulp-clean-css'),
	// rename = require("gulp-rename"),
	// uglify = require('gulp-uglify'),
	// umd = require('gulp-umd'),
	// clean = require('gulp-clean'),
	webpack = require('webpack'),
	// es6Pipeline = require('gulp-webpack-es6-pipeline'),

	webpackConfig = require('./webpack.config.js');
	// pkg = require('./package.json');


// Set the banner content
var banner = ['/*!\n',
	' * ramsondon.github.io - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
	' * Copyright 2017 -' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
	' * Licensed under <%= pkg.license %> (https://github.com/ramsondon/<%= pkg.name %>/blob/master/LICENSE)\n',
	' */\n',
	''
].join('');



//
// // modify some webpack config options
// var myDevConfig = Object.create(webpackConfig);
// myDevConfig.devtool = 'sourcemap';
// myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
// var devCompiler = webpack(myDevConfig);

// gulp.task('webpack:build-dev', function(callback) {
// 	// run webpack
// 	devCompiler.run(function(err, stats) {
// 		if(err) throw new gutil.PluginError('webpack:build-dev', err);
// 		gutil.log('[webpack:build-dev]', stats.toString({
// 			colors: true
// 		}));
// 		callback();
// 	});
// });

// // Compiles SCSS files from /scss into /css
// gulp.task('sass', function() {
//     gulp.src('docs/src/scss/creative.scss')
//         .pipe(sass())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(gulp.dest('docs/src/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });
// //
// // Minify compiled CSS
// gulp.task('minify-css', ['sass'], function() {
//     gulp.src('docs/src/css/creative.css')
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('docs/web/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });
//
// // Minify custom JS
// gulp.task('minify-js', ['umd'],function() {
// 	gulp.src(['docs/src/js/**/*.js'])
//     	.pipe(uglify())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('docs/web/js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
//
// 	gulp.src(['dist/xng.js'])
//     	.pipe(uglify())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('dist'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });

// gulp.task('copy', function() {
// 	return gulp.src('docs/web/js/xng.min.js')
// 		.pipe(gulp.dest('dist'));
// });
//
// gulp.task('umd', function(file) {
// 	var umdDefinition = {
// 		dependencies: function(file	) {
// 			return [
// 				{
// 					name: 'xng',
// 					amd: 'lodash',
// 					cjs: 'lodash',
// 					global: '_',
// 					param: '_'
// 				}
// 			];
// 		},
// 		exports: function (file) {
// 			return 'Xng';
// 		}
// 	};
//
// 	return gulp.src('src/xng.js')
// 		.pipe(umd(umdDefinition))
// 		.pipe(gulp.dest('dist'));
//
// });


// gulp.task('transpile', function() {
// 	gulp.src('src/**/*.js')
// 		.pipe(sourcemaps.init())
// 		.pipe(babel({
// 			presets: ['es2015']
// 		}))
// 		.pipe(concat('tuner.js'))
// 		.pipe(sourcemaps.write('.'))
// 		.pipe(gulp.dest('dist'))
// });

var compiler = webpack(Object.create(webpackConfig));

gulp.task('webpack', function(callback) {
	compiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true
		}));
		callback();
	});

	// console.log('webpack', compiler.run());
	// return gulp.src('src/**/*.js')
		// .pipe(webpack(webpackConfig))
		// .pipe(gulp.dest('dist'));
});

// gulp.task('clean', function () {
// 	return gulp.src('docs/web/js/xng.min.js', {read: false})
// 		.pipe(clean({force: true}));
// });

// Default task
// gulp.task('default', ['sass', 'minify-css', 'umd', 'minify-js']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        }
    })
});

// Dev task with browserSync
gulp.task('dev', ['browserSync','webpack'/*, 'sass', 'minify-css', 'umd', 'minify-js'*/], function() {
	gulp.watch('src/**/*.js', ['webpack']);
    // gulp.watch('docs/src/scss/*.scss', ['sass']);
    // gulp.watch('docs/src/css/*.css', ['minify-css']);
    // gulp.watch('docs/src/js/*.js', ['minify-js']);
    // gulp.watch('src/xng.js', ['umd', 'minify-js']);
	// gulp.watch('src/**/*.js', ['transpile']);
    // // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
	gulp.watch('dist/**/*.js', browserSync.reload);
    // gulp.watch('docs/js/**/*.js', browserSync.reload);
});

// // Production build
// gulp.task('build', ['webpack:build']);
//
// gulp.task('webpack:build', function(callback) {
// 	// modify some webpack config options
// 	var myConfig = Object.create(webpackConfig);
// 	myConfig.plugins = myConfig.plugins.concat(
// 		new webpack.DefinePlugin({
// 			'process.env': {
// 				// This has effect on the react lib size
// 				'NODE_ENV': JSON.stringify('production')
// 			}
// 		}),
// 		new webpack.optimize.DedupePlugin(),
// 		new webpack.optimize.UglifyJsPlugin()
// 	);
//
// 	// run webpack
// 	webpack(myConfig, function(err, stats) {
// 		if(err) throw new gutil.PluginError('webpack:build', err);
// 		gutil.log('[webpack:build]', stats.toString({
// 			colors: true
// 		}));
// 		callback();
// 	});
// });


