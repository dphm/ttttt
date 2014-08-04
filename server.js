var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8484;

var server = net.createServer(function(socket) {
  console.log('Client connected: ' + socket.remoteAddress + ':' + socket.remotePort);

  process.stdin.resume();
  process.stdin.pipe(socket);
  
  socket.on('data', function(data) {
    console.log(data.toString());
  });

  socket.on('end', function() {
    console.log('Client disconnected');
  });
});

server.listen(PORT, HOST, function() {
  console.log("Listening on " + HOST + ":" + PORT);
});
