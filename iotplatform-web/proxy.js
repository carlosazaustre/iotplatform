'use strict'

const debug = require('debug')('iotplatform:web:proxy')
const express = require('express')
const asyncify = require('express-asyncify')
const request = require('request-promise-native')
const { config } = require('iotplatform-utils')

const proxy = asyncify(express.Router())

proxy.get('/agents', async (req, res, next) => {
  debug(`Proxy call to /agents`)
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
    return next(new Error(err.error.error))
  }

  res.send(result)
})

proxy.get('/agent/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  debug(`Proxy call to /agent/${uuid}`)

  const options = {
    method: 'GET',
    url: `${config.proxy.endpoint}/api/agent/${uuid}`,
    headers: {
      'Authorization': `Bearer ${config.proxy.apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (err) {
    return next(new Error(err.error.error))
  }

  res.send(result)
})

proxy.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  debug(`Proxy call to /metrics/${uuid}`)

  const options = {
    method: 'GET',
    url: `${config.proxy.endpoint}/api/metrics/${uuid}`,
    headers: {
      'Authorization': `Bearer ${config.proxy.apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (err) {
    return next(new Error(err.error.error))
  }

  res.send(result)
})

proxy.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params
  debug(`Proxy call to /metrics/${uuid}/${type}`)

  const options = {
    method: 'GET',
    url: `${config.proxy.endpoint}/api/metrics/${uuid}/${type}`,
    headers: {
      'Authorization': `Bearer ${config.proxy.apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (err) {
    return next(new Error(err.error.error))
  }

  res.send(result)
})

module.exports = proxy
