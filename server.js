var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(['http', 'socket.io', 'js/bb_mvc/models/user'], function(http, socketio, user) {


	var httpServer = http.createServer(function(req, res)
	{
		console.log('connexion serveur');
	});

	var io = socketio.listen(httpServer);

	var userId = 0;
	io.sockets.on('connection', function(socket){ 

		var myUser = new user({
				id : userId,
				code : "testcode"+userId
			});
	//	myUserCollection.add(myUser);
		socket.emit('newUsr',myUser);
		console.log('new user connected = ' + myUser);
		userId++;
	});

	httpServer.listen(1337);

});