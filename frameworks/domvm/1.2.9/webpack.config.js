'use strict';

var cache = {};
var loaders = [
	{
		test: /\.es6\.js$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		query: {
			presets: ['es2015', 'stage-0']
		}
	},
	{
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	}
];
var extensions = [
	'', '.js', '.es6.js'
];

module.exports = [{
	cache: cache,
	module: {
		loaders: loaders
	},
	entry: {
		main: './src/view',
	},
	output: {
		path: './dist',
		filename: '[name].js',
		sourceMapFilename: "[file].map",
	},
	resolve: {
		extensions: extensions,
		root: [
			__dirname,
			__dirname + '/src'
		],
		alias: {
		}
	}
}];