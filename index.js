'use strict'

var Wreck = require('wreck')
var config = require('./config')
var addIndex = require('./lib/add-index')
var deleteIndex = require('./lib/delete-index')
var wreckOptions = {
  json: true
}

function indexArticles (results) {
  var list = JSON.parse(JSON.stringify(results))

  function next () {
    if (list.length > 0) {
      var article = list.pop()

      addIndex(article, function (err, payload) {
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

deleteIndex(function (error, payload) {
  if (error) {
    console.error(error)
  } else {
    console.log(payload)
    Wreck.get(config.SOURCE_URL, wreckOptions, handleArticles)
  }
})
