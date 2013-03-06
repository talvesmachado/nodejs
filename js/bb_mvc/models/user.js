define(["backbone"], function (Backbone) {

	var user = Backbone.Model.extend({
		defaults : {
			id : null,
			code : null,
			view : null
		},
		initialize : function() {
		},
	});

	return user;
});