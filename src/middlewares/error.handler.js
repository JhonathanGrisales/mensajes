const { stack } = require('../routes/bill_client.router');

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function errorhandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorhandler };
