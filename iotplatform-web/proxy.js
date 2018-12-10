'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const request = require('request-promise-native')
const config = require('../config')

const proxy = asyncify(express.Router())

proxy.get('/agents', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${config.proxy.endpoint}/api/agents`,
    headers: {
      'Authorization': `Bearer ${config.proxy.apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (err) {
    return next(err)
  }

  res.send(result)
})

proxy.get('/agent/:uuid', (req, res) => {
  
})

proxy.get('/metrics/:uuid', (req, res) => {
  
})

proxy.get('/metrics/:uuid/:type', (req, res) => {
  
})

module.exports = proxy