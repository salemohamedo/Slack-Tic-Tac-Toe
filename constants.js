module.exports = {
  P1SYMBOL: ':o:',
  P2SYMBOL: ':heavy_multiplication_x:',
  boardSymbolMap: {
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:'
  },
  GAME_ALREADY_EXISTS: `Sorry, there's already a game in progress in this channel. Try playing in a different channel.`,
  NO_GAME_EXISTS: `There is currently no game in this channel.`,
  OPPONENT_NOT_IN_CHANNEL: `Sorry, you can only play with members of this channel.`,
  INVALID_COMMAND: "Sorry, I didn't quite catch that. Enter `/ttt help` to see all valid commands",
  INVALID_PLAYER: `Nice try! You're not one of the players involved in the game.`,
  INVALID_TURN: `Hey buddy! It's not your turn...`,
  INVALID_END: `Nice try! You can't end the game if you're not in it...`,
  INVALID_MOVE: `That's not a valid move. Choose from one of the numbered spots on the board`,
  INVALID_PLAY_REQUEST: "Sorry, I didn't quite catch that. Try `/ttt play @username` to start a game.",
  WIN_MESSAGE: `congrats :tada:! You won the game!!!`,
  DRAW_MESSAGE: `:neutral_face: the game is a draw...`,
  END_MESSAGE: `:sob: fine, I'll end the game`,
  HELP_MESSAGE: "Use these commands to play tic tac toe:\n`/ttt play @username` to start a game\n`/ttt move #` to move to spot #\n`/ttt forfeit` to quit the game\n`/ttt status` to display the game's current state\n`/ttt help` to list all possible commands\nP.S visit https://en.wikipedia.org/wiki/Tic-tac-toe to review the rules"
};
