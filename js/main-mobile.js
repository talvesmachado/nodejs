requirejs.config({
	paths: {
		"jquery": "vendor/jquery-1.9.1.min",
		"underscore": "../node_modules/underscore/underscore",
		"backbone": "../node_modules/backbone/backbone",
		"socket": window.environnement.domain+":"+window.environnement.port+"/socket.io/socket.io.js",
		'bootstrap': 'vendor/bootstrap',
		'modernizr': 'vendor/modernizr-2.6.2-respond-1.1.0.min',
		"plugin": "plugins",
		"workspaceMobile":"bb_mvc/controllers/workspaceMobile", 
		"templates":"template-utils",
		"facebook": "http://connect.facebook.net/fr_FR/all"
	},
	shim: {
	"bootstrap": {
			deps: ["jquery", "modernizr","templates" ]
		},	
	"underscore": {
			deps: [],
			exports: "_"
		},
	"backbone": {
			deps: ["jquery", "plugin", "underscore"],
			exports: "Backbone"
		},
	"facebook": {
			exports: "FB"
		},
	}
});
define(["facebook", "backbone", "workspaceMobile"], function (FB, Backbone, workspaceMobile)
{
	FB.init({
        appId  : '495659113829066',
        status : true, // verifie le statut de la connexion
        cookie : true, // active les cookies pour que le serveur puisse accéder à la session
        xfbml  : true  // active le XFBML (HTML de Facebook)
    });
	var mainController = new workspaceMobile();
	Backbone.history.start();
});
