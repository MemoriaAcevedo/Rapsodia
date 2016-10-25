app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise("/");
 
    $stateProvider
        .state("login", {
            url: "/",
            templateUrl: "login.html",
            controller: "loginCtrl",
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
			}
        })
        .state("olvidoC", {
            url: "/login/olvidoC",
            templateUrl: "olvidoC.html",
			controller: "olvidoCtrl",
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
			}
        })
        .state("alumnohome", {
            url: "/home/alumno",
            templateUrl: "views/alumno/homeAlumno.html",
			controller: "homeCtrlAlum",
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
			}
        })
        .state("alumnoinfo", {
            url: "/home/alumno/info",
            templateUrl: "views/alumno/infoAlum.html",
			controller: "homeCtrlAlum",
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
			}
        })
        .state("alumnoeditar", {
            url: "/home/alumno/editar",
            templateUrl: "views/alumno/editarAlum.html",
			controller: "editarAlumCtrl",
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
			}
        })
        .state("alumnoactivar", {
            url: "/home/alumno/activar",
            templateUrl: "views/alumno/activarAlum.html",
			controller: "editarAlumCtrl",
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
			}
        })
        .state("alumnocomunidades", {
            url: "/home/alumno/comunidades",
            templateUrl: "views/alumno/verComunidades.html",
			controller: "comunidadesCtrl",
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
			}
        })
        .state("alumnoasociados", {
            url: "/home/alumno/verAsociadosC",
            templateUrl: "views/alumno/verAsociadosC.html",
			controller: "asociadosCtrl",
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
						$state.go('alumnohome', {}, {reload: 'alumnohome'});
					}
				}
			}	
			}
        })
        .state("alumnoselected", {
            url: "/home/alumno/verSelected",
            templateUrl: "views/alumno/verSelected.html",
			controller: "verSelectedCtrl",
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
						$state.go('alumnohome', {}, {reload: 'alumnohome'});
					}
				}
			}	
			}
        })
        .state("moduloP", {
            url: "/moduloP",
            templateUrl: "views/moduloP/inicio.html",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}
			}	
			}
        })
        .state("moduloD", {
            url: "/moduloD",
            templateUrl: "views/moduloD/inicio1.html",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}
			}	
			}
        })
        .state("moduloP.inicio", {
            url: "/inicio",
            templateUrl: "views/moduloP/inicio.login.html",
            controller: "loginCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if($rootScope.auth.isLogged() && $rootScope.sesion.getUserTerminal().estadoUser == 0){
					$location.path('/moduloP/activar');
				}else if($rootScope.auth.isLogged()){
					$location.path('/moduloP/home');
				}
			}	
			}
        })
        .state("moduloD.inicio", {
            url: "/inicio",
            templateUrl: "views/moduloD/inicio.login.html",
            controller: "loginCtrlD",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if($rootScope.auth.isLoggedD() && $rootScope.sesion.getUserTerminalD().estadoUser == 0){
					$location.path('/moduloD/activar');
				}else if($rootScope.auth.isLoggedD()){
					$location.path('/moduloD/home');
				}
			}	
			}
        })
        .state("moduloP.home", {
            url: "/home",
            templateUrl: "views/moduloP/inicio.home.html",
            controller: "homeCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLogged()){
					$state.go('moduloP', {}, {reload: 'moduloP.inicio'});
				}else if($rootScope.sesion.getUserTerminal().estadoUser == 0){
					$state.go('moduloP', {}, {reload: 'moduloP.activar'});
				}
			}	
			}
        })
        .state("moduloD.home", {
            url: "/home",
            templateUrl: "views/moduloD/inicio.home1.html",
            controller: "homeCtrlD",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLoggedD()){
					$state.go('moduloD', {}, {reload: 'moduloD.inicio'});
				}
			}	
			}
        })
        .state("moduloP.deposito", {
            url: "/deposito",
            templateUrl: "views/moduloP/inicio.deposito1.html",
            controller: "homeCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLogged()){
					 $state.go('moduloP', {}, {reload: 'moduloP.inicio'});
				}else if($rootScope.sesion.getUserTerminal().estadoUser == 0){
					 $state.go('moduloP', {}, {reload: 'moduloP.activar'});
				}
			}	
			}
        })
        .state("moduloD.deposito", {
            url: "/deposito",
            templateUrl: "views/moduloD/inicio.deposito.html",
            controller: "homeCtrlD",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLoggedD()){
					$state.go('moduloD', {}, {reload: 'moduloD.inicio'});
				}
			}	
			}
        })
        .state("moduloP.retiro", {
            url: "/retiro",
            templateUrl: "views/moduloP/inicio.retiro1.html",
            controller: "homeCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLogged()){
					$state.go('moduloP', {}, {reload: 'moduloP.inicio'});
				}else if($rootScope.sesion.getUserTerminal().estadoUser == 0){
					$state.go('moduloP', {}, {reload: 'moduloP.activar'});
				}
			}	
			}
        })
        .state("moduloD.retiro", {
            url: "/retiro",
            templateUrl: "views/moduloD/inicio.retiro.html",
            controller: "homeCtrlD",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLoggedD()){
					$state.go('moduloD', {}, {reload: 'moduloD.inicio'});
				}
			}	
			}
        })
        .state("moduloP.transferir", {
            url: "/transferir",
            templateUrl: "views/moduloP/inicio.transferir.html",
            controller: "homeCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLogged()){
					$location.path('/moduloP/inicio');
				}else if($rootScope.sesion.getUserTerminal().estadoUser == 0){
					$state.go('moduloP', {}, {reload: 'moduloP.activar'});
				}
			}	
			}
        })
        .state("moduloD.transferir", {
            url: "/transferir",
            templateUrl: "views/moduloD/inicio.transferir.html",
            controller: "homeCtrlD",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLoggedD()){
					$state.go('moduloD', {}, {reload: 'moduloD.inicio'});
				}
			}	
			}
        })
        .state("moduloP.historial", {
            url: "/historial",
            templateUrl: "views/moduloP/inicio.historial.html",
            controller: "historialCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLogged()){
					$state.go('moduloP', {}, {reload: 'moduloP.inicio'});
				}else if($rootScope.sesion.getUserTerminal().estadoUser == 0){
					$state.go('moduloP', {}, {reload: 'moduloP.activar'});
				}
			}	
			}
        })
        .state("moduloD.historial", {
            url: "/historial",
            templateUrl: "views/moduloD/inicio.historial1.html",
            controller: "historialCtrlD",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLoggedD()){
					$state.go('moduloD', {}, {reload: 'moduloD.inicio'});
				}
			}	
			}
        })
        .state("moduloP.configurar", {
            url: "/configurar",
            templateUrl: "views/moduloP/inicio.configurar.html",
            controller: "configCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLogged()){
					$state.go('moduloP', {}, {reload: 'moduloP.inicio'});
				}else if($rootScope.sesion.getUserTerminal().estadoUser == 0){
					$state.go('moduloP', {}, {reload: 'moduloP.activar'});
				}
			}	
			}
        })
        .state("moduloD.configurar", {
            url: "/configurar",
            templateUrl: "views/moduloD/inicio.configurar1.html",
            controller: "configCtrlD",
            resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLoggedD()){
					$state.go('moduloD', {}, {reload: 'moduloD.inicio'});
				}
			}	
			}
        })
        .state("moduloP.activar", {
            url: "/activar",
            templateUrl: "views/moduloP/inicio.activar1.html",
            controller: "configCtrlM",
            resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else if(!$rootScope.auth.isLogged()){
					$state.go('moduloP', {}, {reload: 'moduloP.inicio'});
				}else if($rootScope.sesion.getUserTerminal().estadoUser == 1){
					$state.go('moduloP', {}, {reload: 'moduloP.home'});
				}
			}	
			}
        })
        .state("profesorhome", {
            url: "/home/profesor",
            templateUrl: "views/profesor/homeProfe.html",
			controller: "homeCtrlProfe",
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
			}
        })
        .state("profesorperfil", {
            url: "/home/profesor/perfil",
            templateUrl: "views/profesor/infoProfesor.html",
			controller: "homeCtrlProfe",
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
			}
        })
        .state("profesorperfilP", {
            url: "/home/profesor/editarP",
            templateUrl: "views/profesor/editarProfe.html",
			controller: "editarProfeCtrl",
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
			}
        })
        .state("profesorcomunidades", {
            url: "/home/profesor/comunidades",
            templateUrl: "views/profesor/verComunidades.html",
			controller: "comunidadesCtrlProfe",
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
			}
        })
        .state("profesorinfo", {
            url: "/home/profesor/info",
            templateUrl: "views/profesor/seleccionado.html",
			controller: "infoCtrlProfe",
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
			}
        })
        .state("profesoractivar", {
            url: "/home/profesor/activar",
            templateUrl: "views/profesor/activarProfe.html",
			controller: "editarProfeCtrl",
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
			}
        })
        .state("profesoreditarC", {
            url: "/home/profesor/editarC",
            templateUrl: "views/profesor/editarComunidad.html",
			controller: "editarCCtrl",
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
			}
        })
        .state("profesorverasociados", {
            url: "/home/profesor/verAsociadosC",
            templateUrl: "views/profesor/verAsociadosC.html",
			controller: "asociadosCCtrl",
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
			}
        })
        .state("profesorverdesligar", {
            url: "/home/profesor/verDesligar",
            templateUrl: "views/profesor/verDesligar.html",
			controller: "desligarCtrl",
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
			}
        })
        .state("administrador", {
            url: "/home/administrador",
            templateUrl: "views/administrador/homeAdmin.html",
			controller: "homeCtrlAdmin",
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
			}
        })
        .state("administradorperfil", {
            url: "/home/administrador/perfil",
            templateUrl: "views/administrador/infoAdmin.html",
			controller: "homeCtrlAdmin",
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
			}
        })
        .state("administradoreditarA", {
            url: "/home/administrador/editarA",
            templateUrl: "views/administrador/editarAdmin.html",
			controller: "editarAdminCtrl",
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
			}
        })
        .state("administradorcrear", {
            url: "/home/administrador/crear",
            templateUrl: "views/administrador/crearUsuarioAdmin.html",
			controller: "crearAdminCtrl",
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
			}
        })
        .state("administradorver", {
            url: "/home/administrador/ver",
            templateUrl: "views/administrador/cuentas.html",
			controller: "cuentasCtrlAdmin",
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
			}
        })
        .state("administradorinfo", {
            url: "/home/administrador/info",
            templateUrl: "views/administrador/seleccionado.html",
			controller: "infoCtrlAdmin",
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
			}
        })
        .state("administradoreditar", {
            url: "/home/administrador/editar",
            templateUrl: "views/administrador/editSelect.html",
			controller: "editarSelectedAdmin",
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
			}
        })
        .state("administradoractivar", {
            url: "/home/administrador/activar",
            templateUrl: "views/administrador/activarAdmin.html",
			controller: "editarAdminCtrl",
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
			}
        })
        .state("administradorcomunidades", {
            url: "/home/administrador/comunidades",
            templateUrl: "views/administrador/verComunidades.html",
			controller: "comunidadesAdminCtrl",
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
			}
        })
        .state("administradoreditarc", {
            url: "/home/administrador/editarC",
            templateUrl: "views/administrador/editarComunidad.html",
			controller: "editarCAdminCtrl",
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
			}
        })
        .state("administradorverasociados", {
            url: "/home/administrador/verAsociadosC",
            templateUrl: "views/administrador/verAsociadosC.html",
			controller: "asociadosCAdminCtrl",
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
			}
        })
        .state("administradorverdesligar", {
            url: "/home/administrador/verDesligar",
            templateUrl: "views/administrador/verDesligar.html",
			controller: "desligarAdminCtrl",
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
			}
        });
});