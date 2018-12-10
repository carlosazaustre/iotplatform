'use strict'

const debug = require('debug')('iotplatform:web')
const http = require('http')
const path = require('path')
const express = require('express')
const asyncify = require('express-asyncify')
const socketio = require('socket.io')
const chalk = require('chalk')
const IotPlatformAgent = require('iotplatform-agent')
const { handleExpressError, handleFatalError } = require('../errors')
const { pipe } = require('./utils')
const proxy = require('./proxy')

const port = process.env.PORT || 8080
const app = asyncify(express())
const server = http.createServer(app)
const io = socketio(server)
const agent = new IotPlatformAgent()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)
app.use(handleExpressError)

// Socket.io / Websockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  pipe(agent, socket)
})

server.listen(port, () => {
  console.log(`${chalk.green('[iotplatform-web]')} server listening on port ${port}`)
  agent.connect()
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)