'use strict';

const dotenv = require('dotenv');
dotenv.load();

/**
* @returns {Object}
*/
function initializeConfig () {
  return Object.freeze({
    SLACK_API_TOKEN: process.env.SLACK_API_TOKEN,
    SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET
  });
}

module.exports = initializeConfig();
