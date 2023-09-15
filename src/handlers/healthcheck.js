const HealthCheckHandler = (_req, res) => {
  res.send("app is healthy");
};

module.exports = HealthCheckHandler;
