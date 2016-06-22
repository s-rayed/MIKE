// MAIN DEPS
const path    = require('path');
const webpack = require('webpack');

// PostCSS plugins
const precss   = require('precss');
const rucksack = require('rucksack-css');

// Env flags
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  debug: true,
  devtool: 'cheap-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    'whatwg-fetch',
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/static/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin
  ],

  postcss: function() {
    return [
      rucksack({
        autoprefixer: true
      }),
      precss
    ];
  },

  resolveLoader: {
    modulesDirectories: [
    './node_modules'
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  stats: {
    colors: true,
    reasons: true
  }
};
