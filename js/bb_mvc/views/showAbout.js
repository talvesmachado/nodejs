define(["backbone"], function ( Backbone) {
	
	var showAbout = Backbone.View.extend({
			
			el : "#mainView",
			initialize:function(){
				this.render();
			},
			render : function(){
				var that = this ;
				var template = _.template( $('#maintpl').html()) ;
				$(that.el).append( template({  id   : "hpMain", txtContent : "showAbout" }));
			}
	});
	return showAbout;
});