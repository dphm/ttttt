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
    if (!this.inBounds(square)) throw new RangeError(square + ' not in [0, 8]');
    if (!this.empty(square)) throw new Error('Square ' + square + ' occupied');

    var piece = this.currentTurn();
    this.board[square] = piece;
    this.history.push({ piece: piece,
                        square: square });
  },

  inBounds: function(square) {
    if (square >= 0 && square <= 8) return true;
    return false;
  },

  empty: function(square) {
    if (this.board[square] === ' ') return true;
    return false;
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

  toString: function() {
    return this.board.reduce(function(str, piece, square) {
      if (square % 3 === 2 && square !== 8) return str + piece + ' \n-----------\n ';
      if (square === 8) return str + piece + ' \n';
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
