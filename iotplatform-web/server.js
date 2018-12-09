'use strict'

const debug = require('debug')('iotplatform:web')
const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const chalk = require('chalk')
const { handleFatalError } = require('../errors')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

// Socket.io / Websockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  socket.on('agent/message', payload => {
    console.log(payload)
  })

  setInterval(() => {
    socket.emit('agent/message', { agent: 'xxx-yyy' })
  }, 2000)
})

server.listen(port, () => {
  console.log(`${chalk.green('[iotplatform-web]')} server listening on port ${port}`)
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)