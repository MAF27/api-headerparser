// External Dependencies
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
if (process.env.NODE_ENV === 'production') {
	var env = 'production';
} else {
	env = 'development';
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', function(req, res){
	console.log(req.headers);
	console.log('** IP:',  req.connection.remoteAddress);

	res.send({
		ipaddress: req.connection.remoteAddress.split(':')[3],
		language: req.headers['accept-language'].split(',')[0],
		software: req.headers['user-agent'].split(/\s*[;)(]\s*/)[1]
			+ '; ' + req.headers['user-agent'].split(/\s*[;)(]\s*/)[2]
	})
});

// CONFIGURE PORT FOR DEV AND PROD, START SERVER
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('MODE: ', env);
	console.log('Server listening on port ' + app.get('port') + ' ...');
});
