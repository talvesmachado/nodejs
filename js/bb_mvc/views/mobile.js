define(["facebook", "backbone", "socket"], function(FB, Backbone, io) {

	var mobile = Backbone.View.extend({
		el : "#mainView",
		id : null,
		registered : false,
		mySocket : null,
		fbID : null,
		fbProfil : null,
		initialize : function() {
			var that = this;
			var socket = io.connect(window.environnement.domain + ':' + window.environnement.port);
			this.mySocket = socket;
			/**
			 *	CONNEXION FACEBOOK
			 **/
			FB.Event.subscribe('auth.login', function(response) {
				FB.api('/me', function(response) {
					console.log(response);
					that.connectToRoom(response);
					
				});
			});
			FB.getLoginStatus(function(response) {
				
				if (response.status == "connected") {

		            FB.api('/me', function(response) { 
		            	console.log(response);
							that.connectToRoom(response);
							});
				};
			});
			
			

			this.bind("remove", function() {
				that.destroy();
			});

		},
		events : {
			'click #bt-evt' : 'btClick',
		},
		fbLogout: function()
		{
				console.log("logout1");

			FB.logout(function(response) {
				console.log("logout");
	            $('#facebook_button_box').show();
	            $('#facebook_profile').hide();
	
	        });
		},
		connectToRoom : function(response) {
			var that = this;
			that.fbID = response.id;
			that.fbProfil = response;
				that.mySocket.emit("newMobile_EVENT", {
					id : that.id
				}, function(data) {
					if (data.registered = true) {
						that.registered = true;
						that.render();
					} else {
						console.log(data.error);
					};
				});
			
			/*$.getJSON('http://graph.facebook.com/' + that.fbID).success(function(data) {
				that.fbProfil = data;
				that.mySocket.emit("newMobile_EVENT", {
					id : that.id
				}, function(data) {
					if (data.registered = true) {
						that.registered = true;
						that.render();
					} else {
						console.log(data.error);
					};
				});
			});*/
		},
		render : function() {
			$('#main-wrapper').html('');
			$('#main-wrapper').html('<h1 class="alert alert-success">Mobile Connected to : ' + this.id + '!!!!</h1>');
			$('#message-from').fadeIn(1000);
		},
		btClick : function(e) {
			e.preventDefault();
			console.log($('#message').val());
			this.mySocket.emit('mobileClick_EVENT', {
				message : $('#message').val(),
				fbID : this.fbID,
				fbProfil : this.fbProfil,
			});
			console.log(this.fbProfil);
			$('#message').val('');

		}
	});
	return mobile;
});
