const express = require('express');
const app = express();
const path = require('path');


//settings 
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
const server = app.listen(app.get('port'), () => {
	console.log("servidor conectado puerto: ", app.get('port'));
})

const socketIO = require('socket.io');
const io = socketIO(server);

//websocket
io.on('connection', (socket) => {
	
	socket.on('chat:message', function(data) {
		io.sockets.emit('chat:message', data);
	});

	socket.on('chat:typing', function(data) {
		socket.broadcast.emit('chat:typing', data);
	})
})