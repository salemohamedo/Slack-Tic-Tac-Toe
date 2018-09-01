'use strict';

const sendMessage = require('../helpers/messenger');
const constants = require('../constants');

/**
* Sends the current game state if there is an active channel game
*
* @param gameManager {Object}
* @param channelId {string}
* @param res {Object} - the response object to post back to channel
*/
function status (gameManager, channelId, res) {
  if (!gameManager.hasGame(channelId)) {
    sendMessage(res, constants.NO_GAME_EXISTS, []);
    return;
  }

  const game = gameManager.getGame(channelId);
  const board = game.boardToString();
  const headlineMsg = game.getHeadlineMsg();
  const currentPlayerMsg = game.getCurrentPlayerMsg();

  sendMessage(res, headlineMsg, [board, currentPlayerMsg]);
}

module.exports = status;
