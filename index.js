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
const addIndexUrl = `${process.env.SEARCH_SERVICE_URL}/${process.env.SEARCH_SERVICE_INDEX}/${process.env.SEARCH_SERVICE_INDEX_TYPE}`
const rmIndexUrl = `${process.env.SEARCH_SERVICE_URL}/${process.env.SEARCH_SERVICE_INDEX}`

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

async function deleteIndex () {
  const token = generateToken({key: process.env.JWT_KEY, payload: {system: 'tfk-search-index-portalen-info'}})
  axios.defaults.headers.common['Authorization'] = token
  try {
    await axios.delete(rmIndexUrl)
    console.log('index deleted')
  } catch (err) {
    console.log('deleted?')
    throw err
  }
}

async function init () {
  const { data: res } = await axios.get(process.env.SOURCE_URL)
  if (!res.data || res.data.length === 0) throw Error('No data found')
  console.log(`${res.data.length} articles to index`)
  await deleteIndex()
  const cleaned = res.data.map(c => clean(c))
  await Promise.all(cleaned.forEach(async obj => addIndex(obj)))
  console.log('All indexes updated')
  return {success: true}
}

init()
  .then(console.log)
  .catch(console.error)
