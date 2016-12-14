'use strict'

const Wreck = require('wreck')
const generateToken = require('tfk-generate-jwt')
const config = require('../config')
const indexUrl = config.SEARCH_SERVICE_URL + '/' + config.SEARCH_SERVICE_INDEX + '/' + config.SEARCH_SERVICE_INDEX_TYPE
const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-search-index-portalen-info'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

module.exports = (payload, callback) => {
  if (!payload) {
    return callback(new Error('Missing required input: payload'), null)
  }

  wreckOptions.payload = JSON.stringify(payload)

  Wreck.post(indexUrl, wreckOptions, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, payload)
    }
  })
}
