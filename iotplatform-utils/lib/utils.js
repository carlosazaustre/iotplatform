'use strict'

const jwt = require('jsonwebtoken')

function parsePayload (payload) {
  if (payload instanceof Buffer) {
    payload = payload.toString('utf8')
  }

  try {
    payload = JSON.parse(payload)
  } catch (err) {
    payload = null
  }

  return payload
}

function sign (payload, secret, callback) {
  jwt.sign(payload, secret, callback)
}

function verify (token, secret, callback) {
  jwt.verify(token, secret, callback)
}

function pipe (source, target) {
  if (!source.emit || !target.emit) {
    throw TypeError(`Please pass EventEmitter's as arguments`)
  }

  const emit = source._emit = source.emit

  source.emit = function () {
    emit.apply(source, arguments)
    target.emit.apply(target, arguments)
    return source
  }
}

module.exports = {
  parsePayload,
  sign,
  verify,
  pipe
}
