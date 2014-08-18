;(function(exports) {
  var minimax = require('./minimax');

  function Game() {
    this.players = {};
    this.board = [' ', ' ', ' ',
                  ' ', ' ', ' ',
                  ' ', ' ', ' '];
    this.history = [];
  }

  Game.prototype = {
    /**
     * Game logic
     */

    play: function(square) {
      if (!inBounds(this.board, square)) throw new RangeError(square + ' not in [0, 8]');
      if (!empty(this.board, square)) throw new Error('Square ' + square + ' occupied');

      var piece = this.currentTurn();
      this.board[square] = piece;
      this.history.push({ piece: piece,
                          square: square });
      return this;
    },

    cheat: function() {
      this.play(minimax.bestAction(this));
      return this;
    },

    xSquares: function() {
      return strip(this.board.map(function(piece, square) {
        if (piece === 'X') return square;
      }));
    },

    oSquares: function() {
      return strip(this.board.map(function(piece, square) {
        if (piece === 'O') return square;
      }));
    },

    emptySquares: function() {
      return strip(this.board.map(function(piece, square) {
        if (blank(piece)) return square;
      }));
    },

    nextEmptySquare: function() {
      return this.emptySquares()[0];
    },

    reachableGames: function() {
      var _this = this;
      return this.emptySquares().map(function(square) {
        return _this.copy().play(square);
      });
    },

    win: function(squares) {
      var wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                  [0, 3, 6], [1, 4, 7], [2, 5, 8],
                  [0, 4, 8], [2, 4, 6]];

      return wins.some(function(win) {
        return win.every(function(square) {
          return contains(squares, square);
        });
      });
    },

    winner: function() {
      if (this.win(this.xSquares())) return 'X';
      if (this.win(this.oSquares())) return 'O';
      if (this.over()) return 'TIE';
    },

    over: function() {
      return this.board.filter(blank).length === 0 ||
             this.win(this.xSquares()) ||
             this.win(this.oSquares());
    },

    /**
     * Turn helpers
     */

    lastTurn: function() {
      if (this.history.length === 0) return 'O';
      return this.history[this.history.length - 1].piece;
    },

    currentTurn: function() {
      return this.lastTurn() === 'X' ? 'O' : 'X';
    },

    /**
     * Player helpers
     */

    join: function(p) {
      if (this.players.X && this.players.O) throw new Error('Full game');
      this.players.X ? this.players.O = p : this.players.X = p;
     },

    copy: function() {
      var c = new Game();
      for (var move in this.history) {
        c.play(this.history[move].square);
      }
      return c;
    },

    toString: function() {
      return this.board.reduce(function(str, piece, square) {
        if (square % 3 === 2 && square !== 8) return str + piece + ' \n-----------\n ';
        if (square === 8) return str + piece;
        return str + piece + ' | ';
      }, ' ');
    }
  };

  /**
   * Array helpers
   */

  function blank(el) {
    return el === ' ';
  }

  function empty(array, i) {
    return blank(array[i]);
  }

  function inBounds(array, i) {
    if (i >= 0 && i < array.length) return true;
    return false;
  }

  function strip(array) {
    return array.filter(function(x) { return x !== undefined; } );
  }

  function contains(array, el) {
    return array.indexOf(el) > -1;
  }

  exports.Game = Game;
})(this);
