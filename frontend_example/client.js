const express 	 = require('express')
	, path 		 = require('path')
	, bodyParser = require("body-parser")
	, exphbs 	 = require('express-handlebars')
	, helmet 	 = require('helmet')
	, fs 		 = require('fs')
	, redis 	 = require("redis")
	, config 	 = require('./config/config')
	, app 		 = express()
	, http 		 = require('http').createServer(app)
 	, io 		 = require('socket.io')(http);

let subscriber;

if (config.backend == "redis") {
	subscriber = redis.createClient(config.backends[config.backend].port, config.backends[config.backend].host);
	subscriber.subscribe(config.backends.redis.channel);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
	res.render('index');
});

let clientid;

io.on('connection', function(socket) {
	clientid = socket.id;

	subscriber.on("message", function(channel, message) {
		console.log(message);
		io.to(clientid).emit('stats', message);
	});
});

http.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1', function() {
	console.log('listening on *:3000');
});
