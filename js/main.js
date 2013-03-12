requirejs.config({
	paths: {
		"jquery": "vendor/jquery-1.9.1.min",
		"jqueryQR": "vendor/jquery.qrcode.min",
		"underscore": "../node_modules/underscore/underscore",
		"backbone": "../node_modules/backbone/backbone",
		"socket": window.environnement.domain+":"+window.environnement.port+"/socket.io/socket.io.js",
		'bootstrap': 'vendor/bootstrap',
		'modernizr': 'vendor/modernizr-2.6.2-respond-1.1.0.min',
		"plugin": "plugins",
		"workspace":"bb_mvc/controllers/workspace", 
		"templates":"template-utils"
	},
	shim: {
	"bootstrap": {
			deps: ["jquery", "modernizr", "templates"]
		},	
	"jqueryQR": {
			deps: ["jquery"]
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
define([ "backbone", "workspace"], function (Backbone, workspace)
{
	tpl.loadTemplates(['connexion', 'comment'], function(){
		var mainController = new workspace();
		Backbone.history.start();
	});
});
