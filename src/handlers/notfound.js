const NotFoundHandler = (req, res) => {
  res.status(404).json({
    status: 404,
    message: `The endpoint ${req.method} ${req.path} was not found`,
  });
};

module.exports = NotFoundHandler;
