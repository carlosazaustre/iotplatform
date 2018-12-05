'use strict'

const debug = require('debug')('iotplatform:api')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const { handleFatalError } = require('../errors')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use('/api', api)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[iotplatform-api]')} server listening on port ${port}`)
})
