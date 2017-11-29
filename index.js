const axios = require('axios')
const striptags = require('striptags')
const generateToken = require('tfk-generate-jwt')
const { SOURCE_URL, SEARCH_SERVICE_URL, SEARCH_SERVICE_INDEX, SEARCH_SERVICE_INDEX_TYPE, JWT_KEY } = require('./config')
const addIndexUrl = `${SEARCH_SERVICE_URL}/${SEARCH_SERVICE_INDEX}/${SEARCH_SERVICE_INDEX_TYPE}`
const rmIndexUrl = `${SEARCH_SERVICE_URL}/${SEARCH_SERVICE_INDEX}`

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
  const token = generateToken({key: JWT_KEY, payload: {system: 'tfk-search-index-portalen-info'}})
  axios.defaults.headers.common['Authorization'] = token
  try {
    await axios.post(addIndexUrl, payload)
    console.log('Updated index')
  } catch (err) {
    throw err
  }
}

async function deleteIndex () {
  const token = generateToken({key: JWT_KEY, payload: {system: 'tfk-search-index-portalen-info'}})
  axios.defaults.headers.common['Authorization'] = token
  try {
    await axios.delete(rmIndexUrl)
  } catch (err) {
    console.log('deleted?')
  }
}

async function init () {
  const { data: res } = await axios.get(SOURCE_URL)
  if (!res.data || res.data.length === 0) throw Error('No data found')
  const cleaned = res.data.map(c => clean(c))
  await Promise.all(cleaned.forEach(async obj => await addIndex(obj)))
}

deleteIndex()
  .then(init)
  .then(console.log)
  .catch(console.error)
