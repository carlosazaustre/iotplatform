'use strict'

const debug = require('debug')('iotplatform:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const chalk = require('chalk')
const { handleExpressError, handleFatalError } = require('../errors')

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)
app.use(handleExpressError)

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[iotplatform-api]')} server listening on port ${port}`)
  })
}

module.exports = server
