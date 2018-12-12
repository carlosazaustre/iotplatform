'use strict'

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const chalk = require('chalk')
const { errors } = require('iotplatform-utils')

const api = require('./lib/api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)
app.use(errors.handleExpressError)

if (!module.parent) {
  process.on('uncaughtException', errors.handleFatalError)
  process.on('unhandledRejection', errors.handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[iotplatform-api]')} server listening on port ${port}`)
  })
}

module.exports = server
