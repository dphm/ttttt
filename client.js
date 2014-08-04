var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8484;

var client = net.connect(PORT, HOST, function() {
  console.log('Server address: ' + HOST + ':' + PORT);
  console.log('Client address: ' + client.address().address + ':' + client.address().port);

  process.stdin.resume();
  process.stdin.pipe(client);
});

client.on('data', function(data) {
  console.log(data.toString());
});

client.on('end', function() {
  console.log('Server disconnected');
});
