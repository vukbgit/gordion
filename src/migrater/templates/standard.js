'use strict'

const logger = require('../dist/logger').logger

logger.setLevel('INFO')

module.exports.up = function (next) {
  logger.info('migration up')
  next()
}

module.exports.down = function (next) {
  logger.info('migration down')
  next()
}

module.exports.description = ''