requirejs.config({
	paths: {
		"jquery": "vendor/jquery-1.9.1.min",
		"underscore": "../node_modules/underscore/underscore",
		"backbone": "../node_modules/backbone/backbone",
		"socket": "http://nodejs.envrecette.com:1337/socket.io/socket.io.js",
		//"socket": "http://localhost:1337/socket.io/socket.io.js",
		'bootstrap': 'vendor/bootstrap',
		'modernizr': 'vendor/modernizr-2.6.2-respond-1.1.0.min',
		"plugin": "plugins",
		"workspace":"bb_mvc/controllers/workspace"
	},
	shim: {
	"bootstrap": {
			deps: ["jquery", "modernizr"]
		},	
	"underscore": {
			deps: [],
			exports: "_"
		},
	"backbone": {
			deps: ["jquery", "plugin", "underscore"],
			exports: "Backbone"
		},
	}
});
define(["backbone", "workspace"], function (Backbone, workspace)
{
	var mainController = new workspace();
	
	Backbone.history.start();
});
