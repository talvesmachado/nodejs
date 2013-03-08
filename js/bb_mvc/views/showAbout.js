define(["backbone"], function ( Backbone) {
	
	var showAbout = Backbone.View.extend({
			
			el : "#mainView",
			initialize:function(){
				this.render();
			},
			render : function(){
				var that = this ;
				$('#main-wrapper').html('');
				var template = _.template( $('#main-wrapper').html()) ;
				$(that.el).append( template({  id   : "hpMain", txtContent : "showAbout" }));
			}
	});
	return showAbout;
});