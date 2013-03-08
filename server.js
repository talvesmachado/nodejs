var requirejs = require('requirejs');

requirejs.config({
	nodeRequire : require
});

requirejs(['http', 'socket.io', 'js/bb_mvc/models/room', 'js/bb_mvc/collections/roomCollection', 'underscore'], function(http, socketio, room, roomCollection, _) {

	var httpServer = http.createServer(function(req, res) {
		console.log('connexion serveur');
	});

	var io = socketio.listen(httpServer);
	var myRoomCollection = new roomCollection();

	httpServer.listen(1337);
	io.sockets.on('connection', function(socket) {
		var myRoom = null;
		socket.on("newRoom_EVENT", function(data) {
			myRoom = new room({
				id : data.id,
				roomSocket : socket,
				mobileSockets : []

			});
			myRoomCollection.add(myRoom);
			console.log('=>> ROOM = ' + myRoom.get('id'));
			console.log('=>> COLLECTION = ' + myRoomCollection.length);
		});
		socket.on("newMobile_EVENT", function(data, fn) {
			var desktopRoom = null;
			_.each(myRoomCollection.models, function(room) {
				if (room.get('id') == data.id) {
					desktopRoom = room;
				}
			});
			if (desktopRoom !== null) {
				desktopRoom.get('mobileSockets').push(socket);
				console.log(desktopRoom.get('mobileSockets'));
				socket.set('roomObj', desktopRoom, function() {
				})
				fn({
					registered : true
				});
				console.log(myRoomCollection.get(socket.store.data.roomObj.get('id')));
				myRoomCollection.get(socket.store.data.roomObj.get('id')).get('roomSocket').emit('newUser_EVENT', socket.id, data);
			} else {
				fn({
					registered : false,
					error : "No live desktop connection found"
				});
			};
		});

		socket.on('mobileClick_EVENT', function(data) {

			console.log(data);
			if ( typeof socket.store.data.roomObj !== 'undefined') {
				if ( typeof myRoomCollection.get(socket.store.data.roomObj.get('id')) !== 'undefined') {
					myRoomCollection.get(socket.store.data.roomObj.get('id')).get('roomSocket').emit('mobileClickToApp_EVENT', socket.id, data);
				}
			};
		});
		socket.on('disconnect', function() {
			console.log("==> LENGTH 1 : " + myRoomCollection.length);
			var destroyThis = null;
			console.log(socket);
			if ( typeof socket.store.data.roomObj == 'undefined') {
				_.each(myRoomCollection.models, function(room) {
					if (room.get('roomSocket').id == socket.id) {
						destroyThis = room;
					}
				});

				if (destroyThis !== null) {
					myRoomCollection.remove(destroyThis);
				}
				console.log("==> LENGTH 2 : " + myRoomCollection.length);
			} else {
				var roomObj = socket.store.data.roomObj;

				for (var i in roomObj.get('mobileSockets')) {
					if (roomObj.get('mobileSockets')[i] == socket) {
						destroyThis = i;
					}
				}
				if (destroyThis !== null) {
					roomObj.get('mobileSockets').splice(destroyThis, 1);
				}
				roomObj.get('roomSocket').emit('killMobile_EVENT', socket.id);
			}

		});
	});
});
