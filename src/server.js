const express = require('express')
const personRouter = require('./routers/personRouter')
const HealthCheckHandler = require('./handlers/healthcheck')
const ErrorHandler = require('./handlers/error')
const NotFoundHandler = require('./handlers/notfound')

function createServer() {
  const app = express()
  app.use(express.json())
  app.get('/', HealthCheckHandler)
  app.use('/api', personRouter)
  app.use(ErrorHandler)
  app.use(NotFoundHandler)
  return app
}

module.exports = createServer