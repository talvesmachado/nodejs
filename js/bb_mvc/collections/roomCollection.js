define(["backbone", '../models/room'], function (Backbone, room) {

	var roomCollection = Backbone.Collection.extend({
		model : room,
		initialize : function() {
			console.log(" BACKBONE : initialize room collection");
		}
	});

	return roomCollection;

});