var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static('www'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//listen to all incoming request on the assigned port
app.listen(port, function () {
	console.log('Process  is listening ' + port);
});
