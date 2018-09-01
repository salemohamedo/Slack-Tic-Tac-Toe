const Game = require('./game');

/**
* Maintains mapping between channels and games
* as well as the list of workspace users. Methods
* can be used to add, get and remove games.
*/
class GameManager {
  /**
  * @param workspaceUsers {Object}
  */
  constructor (workspaceUsers) {
    this._workspaceUsers = workspaceUsers;
    this._activeGames = {};
  }

  /**
  * @param channelId {String}
  * @param player1Id {String}
  * @param player2Id {String}
  */
  addGame (channelId, player1Id, player2Id) {
    this._activeGames[channelId] = new Game(3, player1Id, player2Id);
  }

  /**
  * @param userName {String}
  * @returns {Boolean}
  */
  hasUser (userName) {
    return this._workspaceUsers[userName] != null;
  }

  /**
  * @param userName {String}
  * @returns userId {String}
  */
  getUserId (userName) {
    return this._workspaceUsers[userName];
  }

  /**
  * @param channelId {String}
  * @returns {Boolean}
  */
  hasGame (channelId) {
    return this._activeGames[channelId] != null;
  }

  /**
  * @param channelId {String}
  * @returns Game {Object}
  */
  getGame (channelId) {
    return this._activeGames[channelId];
  }

  /**
  * @param channelId {String}
  */
  removeGame (channelId) {
    this._activeGames[channelId] = null;
  }
}

module.exports = GameManager;
