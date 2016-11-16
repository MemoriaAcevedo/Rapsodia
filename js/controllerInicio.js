app.controller("snCtrl", function($rootScope, $scope, $location, $mdToast, $timeout, $mdSidenav){
	//Funciones alumno / ayudante
	$scope.perfilAA = function(){
		$location.path("/home/alumno/info");
	}

	$scope.verC = function(){
		$location.path("/home/alumno/comunidades");
	}


	//Funciones administrador
	$scope.perfilPA = function(){
		$location.path("/home/administrador/perfil");
	}

	$scope.crearA = function(){
		$location.path("/home/administrador/crear");
	}

	$scope.verA = function(){
		$location.path("/home/administrador/ver");
	}

	$scope.verComunidades = function(){
		$location.path("/home/administrador/comunidades");
	}

	$scope.closeSide = function(sideId) {
      $mdSidenav(sideId).close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    }

	//Funciones profesor
	$scope.perfilP = function(){
		$location.path("/home/profesor/perfil");
	}

	$scope.ver = function(){
		$location.path("/home/profesor/comunidades");
	}

	$scope.closeSide = function(sideId) {
      $mdSidenav(sideId).close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    }

	$scope.toggleLeft = buildDelayedToggler('left');
	function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
});
app.controller("tbCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdToast, $mdSidenav, $log, $timeout){

	//Funciones usuario
	$scope.close = function(){
		$rootScope.sesion.destroy();
		$rootScope.sesion.destroyUserToEdit();
		$rootScope.sesion.destroyUserAux();
		$rootScope.sesion.destroyUserTerminal();
		$rootScope.sesion.destroyUserTerminalD();
		$location.path("/");
	}

	$scope.closeM = function(){
		$rootScope.sesion.destroyUserTerminal();
		$location.path("/moduloP/inicio");
	}

	$scope.settingsM = function(){
		$location.path("/moduloP/configurar");
	}

	$scope.closeD = function(){
		$location.path("/moduloD/configurar");
	}

	$scope.settingsD = function(){
		$rootScope.sesion.destroyUserTerminalD();
		$location.path("/moduloD/inicio");
	}

	$scope.editP = function(){
		$location.path("/home/alumno/editar");
	}

	//Funciones profesor
	$scope.editProfe = function(){
		$location.path("/home/profesor/editarP");
	}

	//Funciones administrador
	$scope.editAdmin = function(){
		$location.path("/home/administrador/editarA");
	}

	//Funciones sideNav
	$scope.toggleLeft = buildDelayedToggler('left');

	function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
});
/*Inicio Login controllers*/
app.controller("loginCtrl", function($rootScope, $scope, $location, $http, restFactory, viewFactory){
	$scope.username = "";
	$scope.password = "";

	$scope.loginF = function(){
		if($scope.username != "" && $scope.password != ""){
			restFactory.login($scope.username, $scope.password)
	                .success(function (response) {
	                    var resultado = response.message;
	                    if(resultado != "false" &&  resultado != "i"){
	                    	restFactory.getUserByEmail($scope.username)	                    	
					               .success(function (response) {
					                $rootScope.sesion.setUser(response);
					             	$location.path(resultado);
					             });
	                    }else{
	                    	if(resultado == 'i'){
	                    		viewFactory.showSimpleToast("E-mail o contraseña incorrecta");
	                    	}else{
	                    		viewFactory.showSimpleToast("Cuenta inexistente");
	                    	}
	                    }
	               	});
		}
	}

	$scope.forgetPass = function(){
		$location.path("/login/olvidoC");
	}
});
app.controller("olvidoCtrl", function($rootScope, $scope, $routeParams, $location, $http, restFactory, viewFactory){
	$scope.email = "";
	$scope.respuesta = "";
	$scope.usuario = {};
	$scope.sh = true;

	$scope.back = function(){
			$location.path("/");
	}

	$scope.next = function(){
		restFactory.getUserByEmail($scope.email)
			.success(function (response) {
				if(response){
					if(response.estadoidEstado.nombreE == "Cerrada"){
						viewFactory.showSimpleToast("Cuenta Cerrada");
					}else{
						$scope.usuario = response;
						$scope.sh = false;
					}
				}else{
					viewFactory.showSimpleToast("Cuenta inexistente");
				}	
			});
	}

	$scope.send = function(){
		if($scope.usuario.respuestaU == $scope.respuesta){
			restFactory.sendEmail($scope.usuario.emailU, "r");
					viewFactory.showSimpleToast("Realizando recuperación, se le enviará un correo electrónico");
					$location.path("/");
		}
		else{
			viewFactory.showSimpleToast("Respuesta incorrecta");
		}
	}
});
/*Fin Login controllers*/