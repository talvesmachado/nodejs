define(["backbone", "socket", 'jqueryQR'], function(Backbone, io, jqueryQR) {

	var app = Backbone.View.extend({
		id : null,
		el : "#mainView",
		initialize : function() {
			console.log('main views initialised !!!');
			var socket = io.connect(window.environnement.domain);
			this.id = this.generateId();
			var that = this;
			this.template = _.template(tpl.get('test'));
			socket.emit("newRoom_EVENT", {
				id : this.id
			});
			socket.on('newUser_EVENT', function(socketID, data) {
				console.log('==> NEW USER');
				console.log(socketID);
				console.log(data);
			});
			socket.on('killMobile_EVENT', function(socketID) {
				console.log('==> NEW kill');
				console.log(socketID);
			});
			socket.on('mobileClickToApp_EVENT', function(socketID, data){that.clickTrigger(socketID, data);});

			this.render();
		},
		render : function() {
			var that = this;
			var contentObj = {
				id : "hpMain",
				txtContent : 'vous pouvez connecter votre mobile!!!!', 
				urlContent : 'http://localhost/nodejs/mobile.html#' + this.id
			};
			$('#main-wrapper').html('');
			this.$el.html(this.template(contentObj));
			$('#qrcode').qrcode({width: 200,height: 200, text: "http://www.google.fr"});
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
		},
		clickTrigger : function (socketID, data) {
				console.log('==> EVENT CLICK');
				console.log(socketID);
				console.log(data);
			}
	});
	return app;
});
