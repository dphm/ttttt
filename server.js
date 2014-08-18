var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8484;

var ttt = require('./game');
var games = [];

var server = net.createServer(function(socket) {
  console.log('Client connected: ' + socket.remoteAddress + ':' + socket.remotePort);

  socket.write('MENU\n' +
               '====\n' +
               'CREATE: create a new tic tac toe game\n');
  
  socket.on('data', function(data) {
    console.log(data.toString());
    if (data.toString().indexOf('CREATE') !== -1) {
      var game = new ttt.Game();
      games.push(game);
      socket.write(game.toString());
    }
  });

  socket.on('end', function() {
    console.log('Client disconnected');
  });
});

server.listen(PORT, HOST, function() {
  console.log("Listening on " + HOST + ":" + PORT);
});
