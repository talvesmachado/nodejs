define(["bootstrap", "backbone", "bb_mvc/views/mobile"], function ( _bootstrap, Backbone, mobile) {

var workspaceMobile = Backbone.Router.extend({
        initialize : function() {
        	this.route(":name", "mobileConnect", function(name){
        		this.mobileView = new mobile({id:name});
        	});
        },
    });
	return workspaceMobile;
});