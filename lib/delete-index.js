'use strict'

const Wreck = require('wreck')
const generateToken = require('../lib/generate-token')
const config = require('../config')
const indexUrl = config.SEARCH_SERVICE_URL + '/' + config.SEARCH_SERVICE_INDEX
const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-search-index-portalen-info'}})
const wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

module.exports = (callback) => {
  Wreck.delete(indexUrl, wreckOptions, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, payload)
    }
  })
}
