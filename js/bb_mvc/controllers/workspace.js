define(["bootstrap", "backbone", "bb_mvc/views/app", "bb_mvc/views/showAbout"], function ( _bootstrap, Backbone, app, showAbout) {

var Workspace = Backbone.Router.extend({
        initialize : function() {
            /* Instancier la vue client */
            /* cacher le message "à propos" */
           // $("#divAbout").hide();
        },
        /*--- Définition des routes

            - si l'on appelle l'url http:/mon.domaine.a.moi/index.html cela déclenche la méthode root
            - si l'on appelle l'url http:/mon.domaine.a.moi/index.html#showAbout cela déclenche la méthode showAbout
            - si l'on appelle l'url http:/mon.domaine.a.moi/index.html#hideAbout cela déclenche la méthode hideAbout
        */
        routes: {
            "" : "root",
            "showAbout" : "showAbout",
            "hideAbout" : "hideAbout"
        },

        root : function() {
            document.title = "Vous êtes à la racine ...";
            this.appView = new app();
        },

        showAbout : function () {
            console.log("show about ...");
            this.appView = new showAbout();
            //$("#divAbout").show();
            //$("#lnkAbout").attr("href","#hideAbout");
        },

        hideAbout : function () {
            console.log("hide about ...");
            //$("#divAbout").hide();
            //$("#lnkAbout").attr("href","#showAbout");
        }

    });

	return Workspace;
});