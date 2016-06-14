// Dependencies
var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var watson = require('watson-developer-cloud');

// Configuration
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Load jsdom, and create a window.
var jsdom = require("jsdom").jsdom;
var doc = jsdom();
var window = doc.defaultView;

// Load jQuery with the simulated jsdom window.
$ = require('jquery')(window);

var result;

//////////////////
// Controllers //
////////////////

// @get '/'
app.get('/', function(req, res){
  console.log('get request');

  res.send({
    message: 'this is our api' // first controller
  })
});

// @post '/'
app.post('/', function(req, res){
  console.log('post request', req.body);
  var retrieve = watson.retrieve_and_rank({
    username: '74319030-a8c0-43d0-a824-b575fd1c5f9d',
    password: 'dPwuAXLhJgkp',
    version: 'v1',
    url: 'https://gateway.watsonplatform.net/retrieve-and-rank/api'
  });

  var solrClient = retrieve.createSolrClient({
    cluster_id: 'scf7159333_cd15_46a2_a947_dc22097629f0',
    collection_name: 'example_collection'
  });

  var query = solrClient.createQuery();
  // req.body --> this object --> {question: 'input in html form'} coming from the front end 
  query.q(req.body.question);
  solrClient.search(query, function(err, searchResponse) {
    if (err) {
      console.log('Error searching for documents: ' + err);
      
      res.send('500', {
        message: 'There was an error',
        data: err
      });

    } else {
      console.log('Found ' + searchResponse.response.numFound + ' document(s).');
      result = searchResponse.response.docs;
      console.log('All documents: ' + result);
    
      res.send({
        message: new Date(),
        data: result
      });
    }
  });
  
})

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