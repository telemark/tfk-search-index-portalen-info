const axios = require('axios')
const logger = require('./logger')

const getPage = async url => {
  logger('info', ['lib', 'get-articles', 'get-page', 'start', 'url', url])
  const { data } = await axios.get(url)
  return data
}

module.exports = async url => {
  let results = []
  const next = async url => {
    const page = await getPage(url)
    results = results.concat(page.data)
    if (page.meta && page.meta.pagination && page.meta.pagination.links.next) {
      logger('info', ['lib', 'get-articles', 'next', 'more pages to retrieve'])
      await next(page.meta.pagination.links.next)
    } else {
      logger('info', ['lib', 'get-articles', 'next', 'finished', `${results.length} articles`])
    }
  }
  await next(url)
  return results
}
