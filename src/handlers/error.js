const ErrorHandler = (err, _req, res, _next) => {
  const status = err.statusCode ?? 500;
  res.status(status).json({ status, message: err.message });
};

module.exports = ErrorHandler;
