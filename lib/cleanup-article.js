'use strict'

const striptags = require('striptags')

// Mental note: this is done to avoid changing Portalen search method
function theGreatSwitcharoo (article) {
  article.descriptionOriginal = article.description
  article.description = article.summary

  return article
}

module.exports = (article) => {
  let clean = {}
  Object.keys(article).forEach((dataKey) => {
    clean[dataKey] = Array.isArray(article[dataKey]) ? article[dataKey] : striptags(article[dataKey])
  })

  return theGreatSwitcharoo(clean)
}
