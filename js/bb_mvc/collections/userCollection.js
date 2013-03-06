define(["backbone"], function (Backbone) {

	var userCollection = Backbone.Collection.extend({
		model : userModel,
		initialize : function() {
			user collection
		}
	});

	return userCollection;

});