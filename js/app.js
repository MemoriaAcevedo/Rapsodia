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

        //ALUMNO GESTION DE COMUNIDADES
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
						$location.path('/home/alumno');
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

        //ALUMNO GESTION DE PRACTICAS
        .state("alumnopracticas", {
            url: "/home/alumno/practicas",
            templateUrl: "views/alumno/practicas.html",
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
        .state("alumnoterminal", {
            url: "/home/alumno/terminal",
            templateUrl: "views/alumno/practicaT/practicaPreliminar.html",
			controller: "terminalHomeCtrl",
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
        .state("alumnopracticainfo", {
            url: "/home/alumno/practicainfo",
            templateUrl: "views/alumno/practicaT/practicainfo.html",
			controller: "terminalInfoCtrl",
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
        .state("alumnopracticahome", {
            url: "/home/alumno/practicahome",
            templateUrl: "views/alumno/practicaT/practicaHome.html",
			controller: "practicaHomeCtrl",
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
        .state("alumnopracticacanal", {
            url: "/home/alumno/practicacanal",
            templateUrl: "views/alumno/practicaT/practicaCanal.html",
			controller: "practicaCCCtrl",
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
        .state("alumnopracticahu", {
            url: "/home/alumno/practicahu",
            templateUrl: "views/alumno/practicaT/practicaHU.html",
			controller: "practicaHUCtrl",
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
        .state("alumnopracticacasoprueba", {
            url: "/home/alumno/practicacasoprueba",
            templateUrl: "views/alumno/practicaT/practicaCasoprueba1.html",
			controller: "practicaCPCtrl",
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
        .state("alumnopracticaCPI", {
            url: "/home/alumno/practicaCPI",
            templateUrl: "views/alumno/practicaT/practicaCPI.html",
			controller: "practicaCPICtrl",
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
        .state("alumnopracticaCPE", {
            url: "/home/alumno/practicaCPE",
            templateUrl: "views/alumno/practicaT/practicaCPE.html",
			controller: "practicaCPECtrl",
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
        .state("alumnopracticaincidencias", {
            url: "/home/alumno/practicaincidencias",
            templateUrl: "views/alumno/practicaT/practicaIncidencias.html",
			controller: "practicaIncidenciasCtrl",
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
        .state("alumnopracticaIInfo", {
            url: "/home/alumno/practicaII",
            templateUrl: "views/alumno/practicaT/practicaIncidenciaInfo.html",
			controller: "practicaIECtrl",
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
        .state("alumnopracticaICPInfo", {
            url: "/home/alumno/practicaICP",
            templateUrl: "views/alumno/practicaT/practicaIncidenciacpInfo.html",
			controller: "practicaICPCtrl",
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
        .state("alumnopracticaIE", {
            url: "/home/alumno/practicaIE",
            templateUrl: "views/alumno/practicaT/practicaIncidenciaEditar.html",
			controller: "practicaIECtrl",
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
        .state("alumnopracticaICPE", {
            url: "/home/alumno/practicaICPE",
            templateUrl: "views/alumno/practicaT/practicaIncidenciacpEditar.html",
			controller: "practicaICPCtrl",
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
        .state("alumnopautae", {
            url: "/home/alumno/pautaE",
            templateUrl: "views/alumno/practicaT/pautaE.html",
			controller: "alumnoPautaECtrl",
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
        .state("alumnopautaincidencias", {
            url: "/home/alumno/pautaIncidencias",
            templateUrl: "views/alumno/practicaT/pautaIncidencias.html",
			controller: "alumnoPautaECtrl",
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

        //GESTIÓN PRÁCTICA 2
        .state("alumnopractica2", {
            url: "/home/alumno/practica2",
            templateUrl: "views/alumno/practicaT/practica2.html",
			controller: "alumnoPractica2Ctrl",
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

        .state("alumnopracticainstrucciones", {
            url: "/home/alumno/practica2Instrucciones",
            templateUrl: "views/alumno/practicaT/instrucciones.html",
			controller: "alumnoPractica2Ctrl",
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

        .state("alumnopracticarepositorio", {
            url: "/home/alumno/practica2Repositorio",
            templateUrl: "views/alumno/practicaT/repositorio.html",
			controller: "alumnoPractica2Ctrl",
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

        //AYUDANTE GESTION DE PRACTICAS
        .state("ayudantepracticacasoprueba", {
            url: "/home/ayudante/practicacasoprueba",
            templateUrl: "views/ayudante/practicaCasoprueba.html",
			controller: "ayudantePracticaCPCtrl",
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
        .state("ayudantepracticaCPI", {
            url: "/home/ayudante/practicaCPI",
            templateUrl: "views/ayudante/practicaCPI.html",
			controller: "ayudantePracticaCPICtrl",
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
        .state("ayudantepracticaincidencias", {
            url: "/home/ayudante/practicaincidencias",
            templateUrl: "views/ayudante/practicaIncidencias.html",
			controller: "ayudantePracticaIncidenciasCtrl",
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
        .state("ayudantepracticaIInfo", {
            url: "/home/ayudante/practicaII",
            templateUrl: "views/ayudante/practicaIncidenciaInfo.html",
			controller: "ayudantepracticaIECtrl",
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
        .state("ayudantepracticaICPInfo", {
            url: "/home/ayudante/practicaICP",
            templateUrl: "views/ayudante/practicaIncidenciaCP.html",
			controller: "ayudantePracticaICPCtrl",
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
        .state("ayudantepracticasalumnos", {
            url: "/home/ayudante/practicasAlumno",
            templateUrl: "views/ayudante/verPracticasAlumno.html",
			controller: "practicaAyudantePracticasCtrl",
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
        .state("ayudantepracticasPreliminar", {
            url: "/home/ayudante/practicaPreliminar",
            templateUrl: "views/ayudante/preliminarPractica.html",
			controller: "preliminarPracticaCtrl",
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
        .state("ayudantepracticanal", {
            url: "/home/ayudante/practicaCanal",
            templateUrl: "views/ayudante/canalComunicacion.html",
			controller: "ayudanteCCCtrl",
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
        .state("ayudantepracticahome", {
            url: "/home/ayudante/practicahome",
            templateUrl: "views/ayudante/practicaHome.html",
			controller: "ayudantePHomeCtrl",
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
        .state("ayudantepautaincidencias", {
            url: "/home/ayudante/pautaIncidencias",
            templateUrl: "views/ayudante/pautaIncidencias.html",
			controller: "pautaECtrl",
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
        .state("ayudanteevaluar", {
            url: "/home/ayudante/evaluar",
            templateUrl: "views/ayudante/evaluar.html",
			controller: "evaluarCtrl",
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
        .state("ayudantepracticahu", {
            url: "/home/ayudante/practicahu",
            templateUrl: "views/ayudante/verHU.html",
			controller: "ayudantePracticaHUCtrl",
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
        .state("ayudantepautae", {
            url: "/home/ayudante/pautaE",
            templateUrl: "views/ayudante/pautaE.html",
			controller: "pautaECtrl",
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
        .state("ayudanteverasignados", {
            url: "/home/ayudante/verAsignados",
            templateUrl: "views/alumno/verAsignados.html",
			controller: "practicasAlumnoAsignadoAyudanteCtrl",
			resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}else if($rootScope.auth.isProfesor() && !$rootScope.auth.isComunidad()){
						$location.path('/home/profesor');
					}
				}
			}	
			}
        })

        //GESTIÓN PRÁCTICA 2
        .state("ayudantepractica2", {
            url: "/home/ayudante/practica2",
            templateUrl: "views/ayudante/practica2.html",
			controller: "ayudantePractica2Ctrl",
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

        .state("ayudantepracticainstrucciones", {
            url: "/home/ayudante/practica2Instrucciones",
            templateUrl: "views/ayudante/instrucciones.html",
			controller: "ayudantePractica2Ctrl",
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

        .state("ayudantepracticainstruccionesC", {
            url: "/home/ayudante/practica2InstruccionesC",
            templateUrl: "views/ayudante/instruccionesC.html",
			controller: "ayudantePractica2Ctrl",
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


        //PROFESOR GESTION DE USUARIO
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
						$location.path('/home/profesor');
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
						$location.path('/home/profesor');
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
        .state("profesorverasignados", {
            url: "/home/profesor/verAsignados",
            templateUrl: "views/profesor/verAsignados.html",
			controller: "practicasAlumnoAsignadoCtrl",
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

        //PROFESOR GESTION DE PRACTICAS
        .state("profesorpracticaspreliminar", {
            url: "/home/profesor/practicaPreliminar",
            templateUrl: "views/profesor/practicaT/preliminarPractica.html",
			controller: "preliminarPracticaProfeCtrl",
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
        .state("profesorpracticanal", {
            url: "/home/profesor/practicaCanal",
            templateUrl: "views/profesor/practicaT/canalComunicacion.html",
			controller: "profesorCCtrl",
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
        .state("profesorpracticahome", {
            url: "/home/profesor/practicahome",
            templateUrl: "views/profesor/practicaT/practicahome.html",
			controller: "profesorPHomeCtrl",
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
        .state("profesorpracticacasoprueba", {
            url: "/home/profesor/practicacasoprueba",
            templateUrl: "views/profesor/practicaT/practicaCasoprueba.html",
			controller: "profesorPracticaCPCtrl",
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
        .state("profesorpracticacasopruebainfo", {
            url: "/home/profesor/practicaCPI",
            templateUrl: "views/profesor/practicaT/practicaCPI.html",
			controller: "profesorPracticaCPICtrl",
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
        .state("profesorpracticaincidencias", {
            url: "/home/profesor/practicaincidencias",
            templateUrl: "views/profesor/practicaT/practicaincidencias1.html",
			controller: "profesorPracticaIncidenciasCtrl",
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
        .state("profesorpracticaincidenciasI", {
            url: "/home/profesor/practicaII",
            templateUrl: "views/profesor/practicaT/practicaIncidenciasInfo.html",
			controller: "profesorPracticaIECtrl",
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
        .state("profesorpracticaincidenciasICP", {
            url: "/home/profesor/practicaICP",
            templateUrl: "views/profesor/practicaT/practicaIncidenciascpInfo.html",
			controller: "profesorPracticaICPCtrl",
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
        .state("profesorpracticapautaE", {
            url: "/home/profesor/pautaE",
            templateUrl: "views/profesor/practicaT/pautaE.html",
			controller: "pautaEProfesorCtrl",
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
        .state("profesorpracticapautaincidencias", {
            url: "/home/profesor/pautaIncidencias",
            templateUrl: "views/profesor/practicaT/pautaIncidencias.html",
			controller: "pautaEProfesorCtrl",
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
        .state("profesorpracticaevaluar", {
            url: "/home/profesor/evaluar",
            templateUrl: "views/profesor/practicaT/evaluarP.html",
			controller: "evaluarProfesorCtrl",
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
        .state("profesorpracticahu", {
            url: "/home/profesor/practicahu",
            templateUrl: "views/profesor/practicaT/verHU.html",
			controller: "profesorPracticaHUCtrl",
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
        //GESTIÓN PRÁCTICA 2
        .state("profesorpractica2", {
            url: "/home/profesor/practica2",
            templateUrl: "views/profesor/practicaT/practica2.html",
			controller: "profesorPractica2Ctrl",
			resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				} 
			}	
			}
        })

        .state("profesorpracticainstrucciones", {
            url: "/home/profesor/practica2Instrucciones",
            templateUrl: "views/profesor/practicaT/instrucciones.html",
			controller: "profesorPractica2Ctrl",
			resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
			}
        })

        .state("profesorpracticainstruccionesC", {
            url: "/home/profesor/practica2InstruccionesC",
            templateUrl: "views/profesor/practicaT/instruccionesC.html",
			controller: "profesorPractica2Ctrl",
			resolve: {
			"check": function($location,$rootScope){
				if( !$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}else{
					if($rootScope.auth.isAlumnoAyudante()){
						$location.path('/home/profesor');
					}else if($rootScope.auth.isAdministrador()){
						$location.path('/home/administrador');
					}
				}
			}	
			}
        })
        //MODULO DE PRÁCTICA SIN BUGS
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
        .state("moduloP.inicio", {
            url: "/inicio",
            templateUrl: "views/moduloP/inicio.login1.html",
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

        //MODULO DE PRACTICA CON BUGS
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

        //ADMINISTRADOR GESTION DE USUARIOS
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