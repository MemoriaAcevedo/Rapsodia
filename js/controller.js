var app = angular.module("mainApp", ["ui.router","ngRoute", "ngCookies", "ngMaterial", "ngMessages", "dataGrid", "pagination", "ngFileUpload", "bootstrapLightbox"]);

app.run(function($rootScope, auth, sesion){
	$rootScope.auth = auth;
    $rootScope.sesion = sesion;
});



