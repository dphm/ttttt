var tictactoe = require('./game');

function utility(game) {
  var winner = game.winner();
  if (winner === 'X') return 1;
  if (winner === 'O') return -1;
  return 0;
}

function minimax(game) {
  if (game.over()) return utility(game);
  var actions = game.emptySquares();
  if (game.currentTurn() === 'X') {
    var maxUtility = Number.NEGATIVE_INFINITY;
    var maxAction = actions[0];
    for (var i = 0; i < actions.length; i++) {
      var u = minimax(game.copy().play(actions[i]));
      if (u >= maxUtility) {
        maxUtility = u;
        maxAction = actions[i];
      }
    }
    return maxUtility;
  } else {
    var minUtility = Number.POSITIVE_INFINITY;
    var minAction = actions[0];
    for (var i = 0; i < actions.length; i++) {
      var u = minimax(game.copy().play(actions[i]));
      if (u <= minUtility) {
        minUtility = u;
        minAction = actions[i];
      }
    }
    return minUtility;
  }
}
