var config = require('../lib/config');

exports.notFound = function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error', { message: '', error: err});
};

// production error handler
// no stacktraces leaked to user
exports.ProError = function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
};