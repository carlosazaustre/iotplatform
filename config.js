'use strict'

const debug = require('debug')('iotplatform:config')

const config = {
  db: {
    database: process.env.DB_NAME || 'iotplatform',
    username: process.env.DB_USER || 'iotplatform',
    password: process.env.DB_PASS || 'iotplatform',
    host: process.env.DB_HOST || 'localhost',
    logging: s => debug(s),
    dialect: 'postgres'
  },
  auth: {
    secret: process.env.SECRET || 'mysecret'
  }
}

module.exports = config
