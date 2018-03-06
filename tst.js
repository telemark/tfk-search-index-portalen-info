'use strict'

const cleanArticle = require('./lib/cleanup-article')
const article = require('./test/data/another-article.json')

console.log(JSON.stringify(cleanArticle(article), null, 2))
