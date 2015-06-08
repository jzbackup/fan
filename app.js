var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var util = require('util');
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'fan',
    cookie: { maxAge: 60 * 1000 * 30},
    resave: true,
    saveUninitialized: true
}));

// connect to db
mongoose.connect('mongodb://localhost/fan');

// use app.locals, which is available to the connect
app.use(function(req, res, next) {
  //res.locals.user = {username:null, authenticated:false};
  //res.locals.authenticated = ! req.user.ananymous;
  res.locals.user = req.session.user;
  //res.locals.authenticated = true;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  //res.locals.session = req.session;
  next();
});

// put all the app.get into routes file
require('./routes')(app);

// The error handlings are implemented by middlewares
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
