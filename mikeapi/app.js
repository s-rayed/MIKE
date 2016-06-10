var express = require('express');
var path = require('path');

var cors = require('cors');

var logger = require('morgan');

var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/', routes);
// app.use('/users', users);


app.get('/', function(req, res){
  console.log('get request');  
  res.send({
    message: 'this is our api' // first controller
  })
});

app.post('/test', function(req, res){
  console.log('post request', req.body);
  res.send({
    message: 'this is our api' // first controller
  })
});

// app.get('/index', function(req, res){
//   res.render('index');
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
