const axios = require('axios')
const logger = require('./logger')

const getPage = async url => {
  logger('info', ['lib', 'get-articles', 'get-page', 'start', 'url', url])
  const { data } = await axios.get(url)
  return data
}

module.exports = async url => {
  const page = await getPage(url)
  return page
}
