'use strict'

var cache = {}

var loaders = [
  {
    test: /\.es6\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.html$/, loader: 'tag',
    query: {
      type: 'babel'
    }
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  }
]

var extensions = [
  '', '.js', '.es6.js', '.html'
]

module.exports = [{
  cache: cache,
  module: {
    loaders: loaders
  },
  entry: {
    main: './src/main',
  },
  output: {
    path: './dist',
    filename: '[name].js',
    sourceMapFilename: "[file].map",
  },
  resolve: {
    extensions: extensions,
    root: [
      __dirname + '/src'
    ],
    alias: {
      "riot": __dirname+"/node_modules/riot/riot.min.js",
    }
  }
}]