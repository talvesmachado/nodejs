define(["backbone", "socket"], function(Backbone, io) {

	var mobile = Backbone.View.extend({
		el : "#mainView",
		id :  null,
		registered : false,
		mySocket: null,
		initialize : function() {
			var that = this;
			var socket = io.connect(window.environnement.domain);
			this.mySocket = socket;
			socket.emit("newMobile_EVENT", { id : this.id }, function(data){
				console.log("==> mobile Emit = ");
				console.log(data);
			    if(data.registered = true){
			      that.registered = true;
			    }else{
			      console.log(data.error);
			    };
   			 });
			console.log('mobile');
			
			this.bind("remove", function() {
			  this.destroy();
			});
			
			this.render();
		},
		events : 
		{
			'click #bt-evt' : 'btClick'
		},
		render : function() {
			var that = this;
			$('#main-wrapper').html('');
			$('#main-wrapper').html('Mobile Connected to : '+ this.id +'!!!!');
		},
		btClick: function()
		{
			this.mySocket.emit('mobileClick_EVENT', 'click mobile = '+ this.id);
		}
		
	});
	return mobile;
}); 