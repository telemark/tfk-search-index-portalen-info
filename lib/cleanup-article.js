'use strict'

const striptags = require('striptags')

module.exports = (article) => {
  let clean = {}
  Object.keys(article).forEach((dataKey) => {
    clean[dataKey] = striptags(article[dataKey])
  })

  return clean
}
