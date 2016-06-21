const config               = require('./webpack.config.js');
const express              = require('express');
const path                 = require('path');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

var compiler = webpack(config);
var app = express();

app.use(require('morgan')('short'));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  }
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
  console.log('Path', path.join(__dirname, 'index.html'));
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, 'localhost', function(err) {
  if (err) console.log('Error', err);
  console.log('Listening on port 8000');
});
