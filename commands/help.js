'use strict';

const sendMessage = require('../helpers/messenger');
const constants = require('../constants');

/**
* Sends help message to channel
*
* @param res {Object} - the response object to post back to channel
*/
function help (res) {
  sendMessage(res, constants.HELP_MESSAGE, []);
}

module.exports = help;
