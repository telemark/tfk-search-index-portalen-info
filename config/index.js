'use strict'

module.exports = {
  JWT_KEY: process.env.JWT_KEY || 'Louie Louie, oh no, I got to go',
  SEARCH_SERVICE_URL: process.env.SEARCH_SERVICE_URL || 'https://search.service.com/api',
  SEARCH_SERVICE_INDEX: process.env.SEARCH_SERVICE_INDEX || 'portaleninfo',
  SEARCH_SERVICE_INDEX_TYPE: process.env.SEARCH_SERVICE_INDEX_TYPE || 'article',
  SOURCE_URL: process.env.SOURCE_URL || 'http://www.portalen.com/artikler.json'
}
