function Game(p1) {
  this.p1 = p1;
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

  join: function(p2) {
    this.p2 = p2;
   },

  players: function() {
    return { p1: this.p1,
             p2: this.p2 };
  }
};
