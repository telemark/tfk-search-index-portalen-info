const path = require('path')
const env = process.argv[2]
if (env) {
  const envFilePath = path.resolve(process.cwd(), env)
  console.log('loading environment')
  console.log(env)
  require('dotenv').config({path: envFilePath})
} else {
  console.log('no environment loaded')
}
const axios = require('axios')
const striptags = require('striptags')
const generateToken = require('tfk-generate-jwt')
const deleteIndex = require('./lib/delete-index')
const getArticles = require('./lib/get-articles')
const addIndexUrl = `${process.env.SEARCH_SERVICE_URL}/${process.env.SEARCH_SERVICE_INDEX}/${process.env.SEARCH_SERVICE_INDEX_TYPE}`

function clean (article) {
  let clean = {}
  Object.keys(article).forEach(dataKey => {
    clean[dataKey] = Array.isArray(article[dataKey]) ? article[dataKey] : striptags(article[dataKey])
  })
  return {
    title: clean.title,
    summary: clean.description,
    tags: clean.tags,
    url: clean.url,
    matrixData: clean.jsonUrl
  }
}

async function addIndex (payload) {
  const token = generateToken({key: process.env.JWT_KEY, payload: {system: 'tfk-search-index-portalen-info'}})
  axios.defaults.headers.common['Authorization'] = token
  try {
    await axios.post(addIndexUrl, payload)
    console.log('Updated index')
  } catch (err) {
    console.error('Index not updated')
    throw err
  }
}

async function indexArticles () {
  const articles = await getArticles(process.env.SOURCE_URL)
  if (articles.length === 0) {
    throw Error('No data found')
  }
  console.log(`${articles.length} articles to index`)
  await deleteIndex()
  let cleaned = articles.map(c => clean(c))
  const next = async () => {
    if (cleaned.length > 0) {
      const article = cleaned.pop()
      await addIndex(article)
      await next()
    } else {
      console.log('All indexes updated')
    }
  }
  await next()
  return {success: true}
}

indexArticles()
  .then(console.log)
  .catch(console.error)
