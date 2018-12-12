'use strict'

const debug = require('debug')('iotplatform:web')
const http = require('http')
const path = require('path')
const express = require('express')
const asyncify = require('express-asyncify')
const socketio = require('socket.io')
const chalk = require('chalk')
const IotPlatformAgent = require('iotplatform-agent')
const { config, utils, errors } = require('iotplatform-utils')
const proxy = require('./lib/proxy')

const port = process.env.PORT || 8080
const app = asyncify(express())
const server = http.createServer(app)
const io = socketio(server)
const agent = new IotPlatformAgent({
  mqtt: {
    host: config.proxy.mqttHost
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)
app.use(errors.handleExpressError)

// Socket.io / Websockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  utils.pipe(agent, socket)
})

server.listen(port, () => {
  console.log(`${chalk.green('[iotplatform-web]')} server listening on port ${port}`)
  agent.connect()
})

process.on('uncaughtException', errors.handleFatalError)
process.on('unhandledRejection', errors.handleFatalError)
