'use strict'

const db = require('./')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'iotplatform',
    username: process.env.DB_USER || 'iotplatform',
    password: process.env.DB_PASS || 'iotplatform',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    setup: true
  }

  await db(config)
}

setup()
