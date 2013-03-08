define(["backbone", "socket"], function(Backbone, io) {

	var app = Backbone.View.extend({
		id : null,
		el : "#mainView",
		initialize : function() {
			console.log('main views initialised !!!');
			var socket = io.connect('http://nodejs.envrecette.com:1337');
			//var socket = io.connect('http://localhost:1337');
			this.id = this.generateId();
			socket.emit("newRoom_EVENT", {
				id : this.id
			});
			console.log('id = ' + this.id);
			console.log('socket Connected');
			socket.on('newUser_EVENT', function(socketID, data){
				console.log('==> NEW USER');
			      console.log(socketID);
			      console.log(data);
			  });
			  socket.on('killMobile_EVENT', function(socketID){
				console.log('==> NEW kill');
			      console.log(socketID);
			  });
			  socket.on('mobileClickToApp_EVENT', function(socketID, data){
				console.log('==> EVENT CLICK');
			      console.log(socketID);
			      console.log(data);
			  });
			 
			this.render();
		},
		render : function() {
			var that = this;
			$('#main-wrapper').html('');
			var template = _.template($('#main-wrapper').html());
			$(that.el).append(template({
				id : "hpMain",
				txtContent : "lipsum"
			}));
		},
		generateId : function() {
			var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
			var string_length = 8;
			var randomstring = '';
			for (var i = 0; i < string_length; i++) {
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum, rnum + 1);
			}
			return randomstring;
		}
	});
	return app;
});
