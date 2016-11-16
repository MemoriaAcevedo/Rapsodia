var app = angular.module("mainApp", ["ui.router","ngRoute", "ngCookies", "ngMaterial", "ngMessages", "dataGrid", "pagination", "ngFileUpload"]);

app.run(function($rootScope, auth, sesion){
	$rootScope.auth = auth;
    $rootScope.sesion = sesion;
});



