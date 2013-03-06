define(["backbone"], function ( Backbone) {
	
	var app = Backbone.View.extend({
			
			el : "#mainView",
			initialize:function(){
				console.log('main views initialised !!!');
				//var socket = io.connect('http://localhost:1337');
				console.log('socket Connected');
				this.render();		
			},
			render : function(){
				var that = this ;
				var template = _.template( $('#maintpl').html()) ;
				$(that.el).append( template({  id   : "hpMain", txtContent : "lipsum" }));
			}
	});
	return app;
});