;(function(exports) {
  utilities = {};

  function utility(game) {
    var winner = game.winner();
    if (winner === 'X') return 1;
    if (winner === 'O') return -1;
    return 0;
  }

  function minimax(game) {
    if (game in utilities) return utilities[game];
    if (game.over()) {
      var u = utility(game);
      utilities[game] = u;
      return u;
    }
    var actions = game.emptySquares();
    if (game.currentTurn() === 'X') {
      var maxUtility = Number.NEGATIVE_INFINITY;
      var maxAction = actions[0];
      actions.forEach(function(action) {
        var u = minimax(game.copy().play(action));
        if (u >= maxUtility) {
          maxUtility = u;
          maxAction = action;
        }
      });
      utilities[game] = maxUtility;
      return maxUtility;
    } else {
      var minUtility = Number.POSITIVE_INFINITY;
      var minAction = actions[0];
      actions.forEach(function(action) {
        var u = minimax(game.copy().play(action));
        if (u <= minUtility) {
          minUtility = u;
          minAction = action;
        }
      });
      utilities[game] = minUtility;
      return minUtility;
    }
  }

  function bestAction(game) {
    var i = 0;
    var utilities = game.reachableGames().map(minimax);
    if (game.currentTurn() === 'X') {
      i = utilities.indexOf(arrayMax(utilities));
    } else {
      i = utilities.indexOf(arrayMin(utilities));
    }
    return game.emptySquares()[i];
  }

  function arrayMax(array) {
    return Math.max.apply(null, array);
  }

  function arrayMin(array) {
    return Math.min.apply(null, array);
  }

  module.exports = {
    bestAction: bestAction
  }
})(this);
