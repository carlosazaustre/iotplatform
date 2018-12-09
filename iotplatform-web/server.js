'use strict'

const debug = require('debug')('iotplatform:web')
const http = require('http')
const path = require('path')
const express = require('express')
const chalk = require('chalk')
const { handleFatalError } = require('../errors')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(port, () => {
  console.log(`${chalk.green('[iotplatform-web]')} server listening on port ${port}`)
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)