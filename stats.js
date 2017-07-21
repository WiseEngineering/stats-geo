var PORT = 8190;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var messages = {};

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {

	if (typeof messages[message] == 'undefined')
		messages[message] = 0;
	else
		messages[message]++;

    console.log(remote.address + ':' + remote.port +' - ' + message);
    console.log(messages);
});

server.bind(PORT, HOST);
