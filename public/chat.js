const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function () {
	const data = {
		message: message.value,
		username: username.value
	}
	socket.emit('chat:message', data);
});

message.addEventListener('keypress', function(){
	socket.emit('chat:typing', username.value);
})

socket.on('chat:message', function(data) {
	actions.innerHTML = '';
	output.innerHTML += `<p>
		<strong>${data.username}</strong>: ${data.message}
	</p>`
	
})

socket.on('chat:typing', function(username){
	actions.innerHTML = `<p><em>${username} esta escribiendo...</em></p>`
})