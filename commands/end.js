'use strict';

const sendMessage = require('../helpers/messenger');
const constants = require('../constants');

/**
* Ends game if request comes from one of the players in the game
*
* @param gameManager {Object}
* @param channelId {String}
* @param userId {String}
* @param res {Object} - the response object to post back to channel
*/
function end (gameManager, channelId, userId, res) {
  if (!gameManager.hasGame(channelId)) {
    sendMessage(res, constants.NO_GAME_EXISTS, []);
    return;
  }

  let game = gameManager.getGame(channelId);

  if (!game.validPlayer(userId)) {
    sendMessage(res, constants.INVALID_END, []);
    return;
  }

  sendMessage(res, constants.END_MESSAGE, []);
  gameManager.removeGame(channelId);
}

module.exports = end;
