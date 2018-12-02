'use strict'

const debug = require('debug')('iotplatform:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('iotplatform-db')

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const config = {
  database: process.env.DB_NAME || 'iotplatform',
  username: process.env.DB_USER || 'iotplatform',
  password: process.env.DB_PASS || 'iotplatform',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: s => debug(s)
}

const server = new mosca.Server(settings)

let Agent, Metric

server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError)
  Agent = services.Agent
  Metric = services.Metric

  console.log(`${chalk.green('[iotplatform-mqtt]')} server is running`)
})

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
})

server.on('clientDisconnected', client => {
  debug(`Client Disconnected: ${client.id}`)
})

server.on('published', (packet, client) => {
  debug(`Received: ${packet.topic}`)
  debug(`Payload: ${packet.payload}`)
})

server.on('error', handleFatalError)
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
