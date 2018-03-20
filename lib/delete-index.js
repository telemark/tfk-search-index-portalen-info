const axios = require('axios')
const generateToken = require('tfk-generate-jwt')
const pkg = require('../package.json')
const logger = require('./logger')

module.exports = async () => {
  const token = generateToken({key: process.env.JWT_KEY, payload: {system: pkg.name}})
  const url = `${process.env.SEARCH_SERVICE_URL}/${process.env.SEARCH_SERVICE_INDEX}`
  axios.defaults.headers.common['Authorization'] = token
  logger('info', ['lib', 'delete-index', 'start', 'index', process.env.SEARCH_SERVICE_INDEX])
  try {
    const msg = await axios.delete(url)
    logger('info', ['lib', 'delete-index', 'index', process.env.SEARCH_SERVICE_INDEX, 'success'])
    return msg
  } catch (error) {
    logger('error', ['lib', 'delete-index', 'index', process.env.SEARCH_SERVICE_INDEX, error])
    console.log('deleted?')
    throw error
  }
}
