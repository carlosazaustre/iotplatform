'use strict'

const debug = require('debug')('iotplatform:utils:config')

const config = {
  db: {
    database: process.env.DB_NAME || 'iotplatform',
    username: process.env.DB_USER || 'iot',
    password: process.env.DB_PASS || 'iotplatform',
    host: process.env.DB_HOST || 'localhost',
    logging: s => debug(s),
    dialect: 'postgres'
  },
  auth: {
    secret: process.env.SECRET || 'mysecret'
  },
  proxy: {
    endpoint: process.env.API_ENDPOINT || 'http://localhost:3000',
    serverHost: process.env.SERVER_HOST || 'http://localhost:8080',
    mqttHost: process.env.MQTT_HOST || 'mqtt://localhost',
    apiToken: process.env.API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlvdHBsYXRmb3JtIiwiYWRtaW4iOnRydWUsInBlcm1pc3Npb25zIjpbIm1ldHJpY3M6cmVhZCJdLCJpYXQiOjE1NDQ0MzA5MjZ9.E1eRIs0hKtR2ed6-yafIshIBKaJsG3WIv9H5p0Mwsdc'
  }
}

module.exports = config
