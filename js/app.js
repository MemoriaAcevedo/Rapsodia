app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		resolve: {
			"check": function($location,$rootScope){
				if($rootScope.auth.isLoggedIn()){
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "login.html",
		controller: "loginCtrl"
	})
	.when("/login/olvidoC", {
		resolve: {
			"check": function($location,$rootScope){
				if( $rootScope.auth.isLoggedIn()){
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},

		templateUrl: "olvidoC.html",
		controller: "olvidoCtrl"
		
	})
	.when("/home/alumno", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/alumno/homeAlumno.html",
		controller: "homeCtrlAlum"
		
	})
	.when("/home/alumno/info", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/alumno/infoAlum.html",
		controller: "homeCtrlAlum"

	})
	.when("/home/alumno/editar", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/alumno/editarAlum.html",
		controller: "editarAlumCtrl"
		
	})
	.when("/home/alumno/activar", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isAlumnoAyudante() && $rootScope.auth.isAbierta()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/alumno/activarAlum.html",
		controller: "editarAlumCtrl"
		
	})
	.when("/home/alumno/comunidades", {

		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},

		templateUrl: "views/alumno/verComunidades.html",
		controller: "comunidadesCtrl"

	})
	.when("/home/alumno/verAsociadosC", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isAlumnoAyudante() && !$rootScope.auth.isComunidad()){
						$location.path('/home/alumno');
					}
				}
			}	
		},
		templateUrl: "views/alumno/verAsociadosC.html",
		controller: "asociadosCtrl"
		
	})
	.when("/home/alumno/verSelected", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isAlumnoAyudante() && !$rootScope.auth.isUserAux()){
						$location.path('/home/alumno');
					}
				}
			}	
		},
		templateUrl: "views/alumno/verSelected.html",
		controller: "verSelectedCtrl"
		
	})
	.when("/home/profesor", {
		resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/profesor/homeProfe.html",
		controller: "homeCtrlProfe"
		
	})
	.when("/home/profesor/perfil", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},

		templateUrl: "views/profesor/infoProfesor.html",
		controller: "homeCtrlProfe"

	})
	.when("/home/profesor/editarP", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},

		templateUrl: "views/profesor/editarProfe.html",
		controller: "editarProfeCtrl"

	})
	.when("/home/profesor/comunidades", {

		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
		},

		templateUrl: "views/profesor/verComunidades.html",
		controller: "comunidadesCtrlProfe"

	})
	.when("/home/profesor/info", {

		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isProfesor() && !$rootScope.auth.isUserToEdit()){
						$location.path('/home/administrador');
					}
				}
			}	
		},

		templateUrl: "views/profesor/seleccionado.html",
		controller: "infoCtrlProfe"

	})
	.when("/home/profesor/activar", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isProfesor() && $rootScope.auth.isAbierta()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/profesor/activarProfe.html",
		controller: "editarProfeCtrl"
		
	})
	.when("/home/profesor/editarC", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isProfesor() && !$rootScope.auth.isComunidad()){
						$location.path('/home/profesor');
					}
				}
			}	
		},
		templateUrl: "views/profesor/editarComunidad.html",
		controller: "editarCCtrl"
		
	})
	.when("/home/profesor/verAsociadosC", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isProfesor() && !$rootScope.auth.isComunidad()){
						$location.path('/home/profesor');
					}
				}
			}	
		},
		templateUrl: "views/profesor/verAsociadosC.html",
		controller: "asociadosCCtrl"
		
	})
	.when("/home/profesor/verDesligar", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/pro');
					}else if($rootScope.auth.isProfesor() && !$rootScope.auth.isUserAux()){
						$location.path('/home/profesor');
					}
				}
			}	
		},
		templateUrl: "views/profesor/verDesligar.html",
		controller: "desligarCtrl"
		
	})
	.when("/home/administrador", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}
				}
			}	
		},
		templateUrl: "views/administrador/homeAdmin.html",
		controller: "homeCtrlAdmin"
		
	})
	.when("/home/administrador/mp", {
		templateUrl: "views/moduloP/t1.html",		
	})
	.when("/home/administrador/perfil", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}
				}
			}	
		},

		templateUrl: "views/administrador/infoAdmin.html",
		controller: "homeCtrlAdmin"

	})
	.when("/home/administrador/editarA", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}
				}
			}	
		},

		templateUrl: "views/administrador/editarAdmin.html",
		controller: "editarAdminCtrl"

	})
	.when("/home/administrador/crear", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}
				}
			}	
		},

		templateUrl: "views/administrador/crearUsuarioAdmin.html",
		controller: "crearAdminCtrl"

	})
	.when("/home/administrador/ver", {

		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}
				}
			}	
		},

		templateUrl: "views/administrador/cuentas.html",
		controller: "cuentasCtrlAdmin"

	})
	.when("/home/administrador/info", {

		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador() && !$rootScope.auth.isUserToEdit()){
						$location.path('/home/administrador');
					}

				}
			}	
		},

		templateUrl: "views/administrador/seleccionado.html",
		controller: "infoCtrlAdmin"

	})
	.when("/home/administrador/editar", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador() && !$rootScope.auth.isUserToEdit()){
						$location.path('/home/administrador');
					}
				}
			}	
		},

		templateUrl: "views/administrador/editSelect.html",
		controller: "editarSelectedAdmin"

	})
	.when("/home/administrador/activar", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador() && $rootScope.auth.isAbierta()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/administrador/activarAdmin.html",
		controller: "editarAdminCtrl"
		
	})
	.when("/home/administrador/comunidades", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}
				}
			}	
		},
		templateUrl: "views/administrador/verComunidades.html",
		controller: "comunidadesAdminCtrl"
		
	})
	.when("/home/administrador/editarC", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador() && !$rootScope.auth.isComunidad()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/administrador/editarComunidad.html",
		controller: "editarCAdminCtrl"
		
	})
	.when("/home/administrador/verAsociadosC", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador() && !$rootScope.auth.isComunidad()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/administrador/verAsociadosC.html",
		controller: "asociadosCAdminCtrl"
		
	})
	.when("/home/administrador/verDesligar", {
		resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/alumno');
					}else if($rootScope.auth.isProfesor()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador() && !$rootScope.auth.isUserAux()){
						$location.path('/home/administrador');
					}
				}
			}	
		},
		templateUrl: "views/administrador/verDesligar.html",
		controller: "desligarAdminCtrl"
		
	})
	.otherwise({
		redirectTo: "/"
	});
});
