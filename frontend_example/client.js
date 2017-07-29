var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var helmet = require('helmet');
var fs = require('fs');
var redis = require("redis");
var config = require('./config/config');

var subscriber;

if (config.backend == "redis") {
	subscriber = redis.createClient(config.backends[config.backend].port, config.backends[config.backend].host);
	subscriber.subscribe(config.backends.redis.channel);
}

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
	res.render('index');
});

var clientid;

io.on('connection', function(socket) {
	clientid = socket.id;

	subscriber.on("message", function(channel, message) {
		io.to(clientid).emit('stats', message);
	});
});

http.listen(process.env.PORT || 3000, function() {
	console.log('listening on *:3000');
});
