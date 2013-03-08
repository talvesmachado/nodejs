define(["backbone"], function (Backbone) {

	var user = Backbone.Model.extend({
		defaults : {
			id : null,
			code : null,
			view : null, 
			mySocket :null
		},
		initialize : function() {
			console.log('BACKBONE : user created');
		},
	});

	return user;
});