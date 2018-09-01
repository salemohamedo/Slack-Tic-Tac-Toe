const constants = require('../constants');

/**
* Maintains participating players User Id's and
* the current tic tac toe board state. Methods
* implement tic tac toe logic, and fetch game state.
*/
class Game {
  /**
  * @param boardSize {Integer}
  * @param player1Id {String}
  * @param player2Id {String}
  */
  constructor (boardSize, player1Id, player2Id) {
    this._boardSize = boardSize;
    this.player1Id = player1Id;
    this.player2Id = player2Id;
    this._curPlayerIsP1 = true;
    this._board = this._initBoard(boardSize);
    this._availableSpots = new Array(boardSize * boardSize).fill(true);
  }

  /**
  * Creates a nested array representing a square grid
  *
  * @param size {Integer}
  */
  _initBoard (size) {
    return [...new Array(size)].map((d, row) => {
      return [...new Array(size)].map((d, col) => {
        let position = this._mapCoordstoMove(row, col);
        return constants.boardSymbolMap[position.toString()];
      });
    });
  }

  /**
  * Maps a move to the corresponding row, col in the board
  *
  * @example _mapMovetoCoords(9) => [2, 2] (bottom right corner)
  * @param position {Integer}
  * @returns {[]Integer}
  */
  _mapMovetoCoords (position) {
    const col = (position - 1) % this._boardSize;
    const row = (position - 1 - col) / this._boardSize;
    return [row, col];
  }

  /**
  * Maps the row, col of the board to position on the user displayed board
  *
  * @param row {Integer}
  * @param col {Integer}
  * @returns {Integer}
  */
  _mapCoordstoMove (row, col) {
    return (row * this._boardSize) + col + 1;
  }

  /**
  * @param position {Integer}
  * @returns {Boolean}
  */
  validMove (position) {
    if (position < 1 || position > this._availableSpots.length) {
      return false;
    }
    return this._availableSpots[position - 1];
  }

  /**
  * @param userId {String}
  * @returns {Boolean}
  */
  validPlayer (userId) {
    if (userId !== this.player1Id && userId !== this.player2Id) {
      return false;
    } else {
      return true;
    }
  }

  toggleCurrentPlayer () {
    this._curPlayerIsP1 = !this._curPlayerIsP1;
  }

  /**
  * @returns {String}
  */
  getCurrentPlayer () {
    if (this._curPlayerIsP1) {
      return this.player1Id;
    } else {
      return this.player2Id;
    }
  }

  /**
  * @returns {String}
  */
  getCurrentPlayerSymbol () {
    if (this._curPlayerIsP1) {
      return constants.P1SYMBOL;
    } else {
      return constants.P2SYMBOL;
    }
  }

  /**
  * @param position {Integer}
  */
  addMove (position) {
    const [row, col] = this._mapMovetoCoords(position);
    if (this._curPlayerIsP1) {
      this._board[row][col] = constants.P1SYMBOL;
    } else {
      this._board[row][col] = constants.P2SYMBOL;
    }
    this._availableSpots[position - 1] = false;
  }

  /**
  * Checks if the current player occupies one
  * of the winning states on the board
  *
  * @returns {Boolean}
  */
  isWinner () {
    return this._horizontalWinner() || this._verticalWinner() || this._diagonalWinner();
  }

  /**
  * @returns {Boolean}
  */
  isBoardFull () {
    for (let row = 0; row < this._boardSize; row++) {
      for (let col = 0; col < this._boardSize; col++) {
        if (this._board[row][col] !== constants.P1SYMBOL &&
                    this._board[row][col] !== constants.P2SYMBOL) {
          return false;
        }
      }
    }
    return true;
  }

  /**
  * @returns {Boolean}
  */
  _horizontalWinner () {
    for (let row = 0; row < this._boardSize; row++) {
      if (this._board[row][0] === this._board[row][1] &&
                this._board[row][1] === this._board[row][2]) {
        return true;
      }
    }

    return false;
  }

  /**
  * @returns {Boolean}
  */
  _verticalWinner () {
    for (let col = 0; col < this._boardSize; col++) {
      if (this._board[0][col] === this._board[1][col] &&
                this._board[1][col] === this._board[2][col]) {
        return true;
      }
    }

    return false;
  }

  /**
  * @returns {Boolean}
  */
  _diagonalWinner () {
    if (this._board[0][0] === this._board[1][1] &&
            this._board[1][1] === this._board[2][2]) {
      return true;
    } else if (this._board[0][2] === this._board[1][1] &&
                 this._board[1][1] === this._board[2][0]) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * @returns {String}
  */
  boardToString () {
    return this._board.map((row) => row.join('')).join('\n');
  }

  /**
  * @returns {String}
  */
  getWinMsg () {
    return `<@${this.getCurrentPlayer()}> ${constants.WIN_MESSAGE}`;
  }

  /**
  * @returns {String}
  */
  getCurrentPlayerMsg () {
    return `${this.getCurrentPlayerSymbol()} <@${this.getCurrentPlayer()}> it's your turn!!!`;
  }

  /**
  * @returns {String}
  */
  getHeadlineMsg () {
    return `<@${this.player1Id}>${constants.P1SYMBOL} vs. <@${this.player2Id}>${constants.P2SYMBOL}`;
  }
}

module.exports = Game;
