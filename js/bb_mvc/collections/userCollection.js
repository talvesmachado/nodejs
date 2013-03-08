define(["backbone", '../models/user'], function (Backbone, user) {

	var userCollection = Backbone.Collection.extend({
		model : user,
		initialize : function() {
			console.log(" BACKBONE : initialize user collection");
		}
	});

	return userCollection;

});