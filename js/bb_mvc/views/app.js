define(["backbone", "socket", 'jqueryQR'], function(Backbone, io, jqueryQR) {

	var app = Backbone.View.extend({
		id : null,
		el : "#mainView",
		initialize : function() {
			console.log('main views initialised !!!');
			var socket = io.connect(window.environnement.domain+":"+window.environnement.port);
			this.id = this.generateId();
			var that = this;
			this.template = _.template(tpl.get('connexion'));
			this.messageTpl = _.template(tpl.get('comment'));
			
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
				txtContent : 'Vous pouvez connecter votre mobile !!!!', 
				urlContent : window.environnement.domain+window.environnement.file+'/mobile.html#' + this.id
			};
			$('#main-wrapper').html('');
			$('#main-wrapper').html('<h1 class="alert alert-success">Room initialized !!!!</h1>');
			this.$el.prepend(this.template(contentObj));
			$('#qrcode').qrcode({width: 170,height: 170, text: contentObj.urlContent});
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
				var that = this;
				$('#message-wrapper').prepend(that.messageTpl(data));
			}
	});
	return app;
});
