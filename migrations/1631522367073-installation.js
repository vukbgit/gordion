'use strict'

const logger = require('../dist/logger').logger

logger.setLevel('INFO')

module.exports.up = function (next) {
  //dev dependencies
  if(process.env.NODE_ENV == 'development') {
    logger.info(process.cwd())

  }
  next()
}

module.exports.down = function (next) {
  logger.info('migration down')
  next()
}

module.exports.description = 'application installation'