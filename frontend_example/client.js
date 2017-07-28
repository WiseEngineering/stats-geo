var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var helmet = require('helmet');
var fs = require('fs');
var http = require('http');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
	res.render('index');
});

http.Server(app).listen(process.env.PORT || 3000, function() {
	console.log('listening on *:3000');
});
