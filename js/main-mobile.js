requirejs.config({
	paths: {
		"jquery": "vendor/jquery-1.9.1.min",
		"underscore": "../node_modules/underscore/underscore",
		"backbone": "../node_modules/backbone/backbone",
		/*"socket": "http://nodejs.envrecette.com:1337/socket.io/socket.io.js",*/
		"socket": "http://localhost:1337/socket.io/socket.io.js",
		'bootstrap': 'vendor/bootstrap',
		'modernizr': 'vendor/modernizr-2.6.2-respond-1.1.0.min',
		"plugin": "plugins",
		"workspaceMobile":"bb_mvc/controllers/workspaceMobile"
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
define(["backbone", "workspaceMobile"], function (Backbone, workspaceMobile)
{
	var mainController = new workspaceMobile();
	
	Backbone.history.start();
});
