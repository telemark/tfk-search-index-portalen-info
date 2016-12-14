'use strict'

const striptags = require('striptags')

module.exports = (article) => {
  let clean = {}
  Object.keys(article).forEach((dataKey) => {
    clean[dataKey] = Array.isArray(article[dataKey]) ? article[dataKey] : striptags(article[dataKey])
  })

  return clean
}
