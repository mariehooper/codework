'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config');

module.exports = function () {
  fs.writeFileSync(
    path.resolve(config.build.assetsRoot, '_redirects'),
    '/api/codewars/* https://www.codewars.com/api/v1/:splat 200\n/* /index.html 200'
  )
}
