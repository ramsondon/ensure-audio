var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/js/ensure-audio.js',
	output: {
		path: path.join(__dirname, 'dist/js'),
		filename: 'index.js'
	},
	node: {},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test:  /\.js$/,
				exclude: /node_modules/,
				query: {
					presets: 'babel-preset-es2015',
				},
			}
		]
	},
	plugins: [
		// Avoid publishing files when compilation fails
		new webpack.NoEmitOnErrorsPlugin()
	],
	stats: {
		// Nice colored output
		colors: true
	},
	// Create Sourcemaps for the bundle
	devtool: 'source-map',
};