define(["backbone"], function(Backbone) {

	var room = Backbone.Model.extend({
		defaults : {
			id : null,
			roomSocket : null,
			mobileSockets : null
		},
		initialize : function() {
			console.log('BACKBONE : room created');
		}
	});

	return room;
});
