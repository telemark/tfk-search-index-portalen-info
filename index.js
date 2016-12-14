'use strict'

const Wreck = require('wreck')
const config = require('./config')
const addIndex = require('./lib/add-index')
const deleteIndex = require('./lib/delete-index')
const cleanUpArticle = require('./lib/cleanup-article')
const wreckOptions = {
  json: true
}

function indexArticles (results) {
  var list = JSON.parse(JSON.stringify(results))

  function next () {
    if (list.length > 0) {
      const article = list.pop()
      const cleanArticle = cleanUpArticle(article)
      addIndex(cleanArticle, (err, payload) => {
        if (err) {
          console.error(err)
        } else {
          console.log(payload)
          next()
        }
      })
    } else {
      console.log('Finished indexing')
    }
  }

  next()
}

function handleArticles (error, repsonse, payload) {
  if (error) {
    console.error(error)
  } else {
    indexArticles(payload.data)
  }
}

deleteIndex((error, payload) => {
  if (error) {
    console.error(error)
  } else {
    console.log(payload)
    Wreck.get(config.SOURCE_URL, wreckOptions, handleArticles)
  }
})
