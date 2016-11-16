app.controller("preliminarPracticaCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.realizador = $rootScope.sesion.getUserAux();
	$scope.practica = $rootScope.sesion.getPracticaT();
	$scope.realizadorCompleto = $scope.realizador.nombreU + " " + $scope.realizador.apellidoU;
	$scope.back = function(){
		$rootScope.sesion.destroyPracticaT();
		$location.path("/home/ayudante/verAsignados");
	}

	$scope.verP = function(){
		$location.path("/home/ayudante/practicahome");
	}

	$scope.verCanal = function(){
		$location.path("/home/ayudante/practicaCanal");
	}

	$scope.evaluar = function(){
		$location.path("/home/ayudante/evaluar");
	}

	$scope.eliminarP = function(){
	    		var confirm = $mdDialog.confirm()
			          .title('Desea eliminar la práctica?')
			          .textContent('La práctica será eliminada')
			          .ariaLabel('Lucky day')
			          .ok('Eliminar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.eliminarP($scope.practica.idPractica)
			    		.success(function(response){
								if(response.message == "t"){
									viewFactory.showSimpleToast("Práctica eliminada con éxito, se le enviará un correo electrónico");
									$rootScope.sesion.destroyPracticaT();
									$location.path("/home/ayudante/verAsignados");				
								}else{
									$scope.showAlert("Error al realizar la eliminación de la práctica, intente más tarde.");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });				
	}
});
app.controller("ayudanteCCCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.nombreRealizador = $rootScope.sesion.getPracticaT().realizador.nombreU + " " + $rootScope.sesion.getPracticaT().realizador.apellidoU;
	$scope.mensajes = {};
	$scope.back = function(){
		$location.path("/home/ayudante/practicaPreliminar");
	}

	$scope.showAlert = function(contenido) {

		$mdDialog.show(
		      $mdDialog.alert()
		        .clickOutsideToClose(true)
		        .title('Información')
		        .textContent(contenido)
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Entendido!')
		    );
	};

	restFactory.getMensajesP($rootScope.sesion.getPracticaT().idPractica)
			.success(function(response){
				$scope.mensajes = response;
	});

	$scope.crearMensaje = function(){

		if($scope.mensaje != undefined && $scope.mensaje != "" ){
			if($scope.mensaje.length > 1000){
				$scope.showAlert("El mensaje no puede tener más de 1000 caracteres");
				return "";
			}
			restFactory.crearMensaje($rootScope.sesion.getPracticaT().idPractica, $scope.mensaje, "c")
				.success(function(response){
				if(response.message == "true"){
					viewFactory.showSimpleToast("Mensaje enviado con éxito");
					restFactory.getMensajesP($rootScope.sesion.getPracticaT().idPractica)
						.success(function(response){
							$scope.mensajes = response;
					});
				}else{
					$scope.showAlert("Error al enviar mensaje, intente más tarde.");
				}
			});
		}
	}
});
app.controller("ayudantePHomeCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.usuario = $rootScope.sesion.getUserAux();
	$scope.nombreRealizador = $scope.usuario.nombreU + " " + $scope.usuario.apellidoU;
	$scope.back = function(){
		$location.path("/home/ayudante/practicaPreliminar");
	}
	
	$scope.verHU = function(){
		$location.path("/home/ayudante/practicahu");
	}

	$scope.verTerminal = function(){
		$location.path("/moduloD/inicio");
	}

	$scope.verCasos = function(){
		$location.path("/home/ayudante/practicacasoprueba");
	}

	$scope.verIncidencias = function(){
		$location.path("/home/ayudante/practicaincidencias");
	}

	$scope.verPauta = function(){
		$location.path("/home/ayudante/pautaE");
	}
});
app.controller("ayudantePracticaIncidenciasCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
	$scope.closeSide = function(sideId) {
      $mdSidenav(sideId).close()
        .then(function () {
        });
    }

	$scope.toggleLeft = buildDelayedToggler('right');
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
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }
    }
	$scope.casoS = {};
	$scope.casos = {};

	$scope.showAlert = function(contenido) {

		$mdDialog.show(
		      $mdDialog.alert()
		        .clickOutsideToClose(true)
		        .title('Información')
		        .textContent(contenido)
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Entendido!')
		    );
	};

	$scope.gridOptions = {
            data: [],
            urlSync: false
    };

    $scope.gridOptions1 = {
            data: [],
            urlSync: false
    };
    restFactory.getCasosP($rootScope.sesion.getPracticaT().idPractica)
		  .success(function (response){
		  	$scope.ninguno = new Object();
		  	$scope.ninguno.identificadorCaso = "Ninguno";
		  	$scope.ninguno.nombre = "";

		  	if(response){
		  		$scope.casos = response;
		  		$scope.casos.push($scope.ninguno); 	 	
		  	}else{
		  		$scope.casos[0] = $scope.ninguno;
		  	}
		  	
	});
	
	restFactory.getIncidenciasP($rootScope.sesion.getPracticaT().idPractica)
		  .success(function (response){
		  $scope.gridOptions.data = response;	  	
	});

	restFactory.getIncidenciasCP($rootScope.sesion.getPracticaT().idPractica)
		  .success(function (response){
		  	$scope.gridOptions1.data = response;	  	
	});
	

	$scope.back = function(){
		$location.path("/home/ayudante/practicahome");
	}

	$scope.sendIInfo = function(item){
		$rootScope.sesion.setI(item);
		$location.path("/home/ayudante/practicaII");
	}

	$scope.sendICPInfo = function(item){
		$rootScope.sesion.setICP(item);
		$location.path("/home/ayudante/practicaICP");
	}
});
app.controller("ayudantepracticaIECtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
	$scope.closeSide = function(sideId) {
      $mdSidenav(sideId).close()
        .then(function () {
        });
    }

	$scope.toggleLeft = buildDelayedToggler('right');
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
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }
    }
	$scope.incidencia = $rootScope.sesion.getI();

	$scope.back = function(){
		$rootScope.sesion.destroyI();
		$location.path("/home/ayudante/practicaincidencias");
	}
});
app.controller("ayudantePracticaICPCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
	$scope.incidenciacp = $rootScope.sesion.getICP();

	$scope.back = function(){
		$rootScope.sesion.destroyICP();
		$location.path("/home/ayudante/practicaincidencias");
	}
});
app.controller("ayudantePracticaCPCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
	$scope.closeSide = function(sideId) {
      $mdSidenav(sideId).close()
        .then(function () {
        });
    }

	$scope.toggleLeft = buildDelayedToggler('right');
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
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }
    }
	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
    
	restFactory.getCPByPractica($rootScope.sesion.getPracticaT().idPractica)
		.success(function (response){
		 $scope.gridOptions.data = response;	  	
	});
	
	$scope.back = function(){
		$location.path("/home/ayudante/practicahome");
	}

	$scope.sendCPInfo = function(item){
		$rootScope.sesion.setCP(item);
		$location.path("/home/ayudante/practicaCPI");
	}
});
app.controller("ayudantePracticaCPICtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
	$scope.closeSide = function(sideId) {
      $mdSidenav(sideId).close()
        .then(function () {
        });
    }

	$scope.toggleLeft = buildDelayedToggler('right');
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
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }
    }
	$scope.cp = $rootScope.sesion.getCP();

	$scope.gridOptions = {
            data: [],
            urlSync: false
    };

	restFactory.getIByCP($scope.cp.idCp)
		.success(function (response){
		 $scope.gridOptions.data = response;	  	
	});
	$scope.back = function(){
		$rootScope.sesion.destroyCP();
		$location.path("/home/ayudante/practicacasoprueba");
	}
});
app.controller("pautaECtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.back = function(){
		$location.path("/home/ayudante/practicahome");
	}

	$scope.back1 = function(){
		$location.path("/home/ayudante/pautaE");
	}

	$scope.verTerminal = function(){
		$location.path("/moduloP/inicio");
	}

	$scope.verPauta = function(){
		$location.path("/home/ayudante/pautaIncidencias");
	}

	$scope.hu = {};
	$scope.pas = {};
	restFactory.getHU()
			.success(function(response){
				$scope.hu = response;
	});

	restFactory.getPAS()
			.success(function(response){
				$scope.pas = response;
	});		
	
	$scope.iPA1 = [{idI: "I-1", descripcion: "No indica el formato del rut que se debe utilizar"}, {idI: "I-2", descripcion: "No esconde la "+
	"contraseña"}, {idI: "I-3", descripcion: "No notifica al usuario sobre respuestas que entregue el sistema"}, {idI: "I-3", descripcion: "Nombre "+
	"del título inicio sesión mal 'escrito'"}];
	
	$scope.iPA12 = [{idI: "I-1", descripcion: "Icono de configuración toma la funcionalidad de cerrar sesión y de cerrar sesión la de configuración"}];
	
	$scope.iPA2 = [{idI: "I-1", descripcion: "Deja depositar valor 0 y números negativos"}, {idI: "I-2", descripcion: "No respeta el valor límite impuesto por el sistema: 1.000.000"},
	{idI: "I-3", descripcion: "Sobrepasar capacidad de los campos a guardar en la base de datos, impidiendo la realización de la operación"}, 
	{idI: "I-4", descripcion: "No avisar al cliente sobre la realización de una operación"}, {idI: "I-5", descripcion: "Migas de pan muestran la ubicación equivocada del usuario"},
	{idI: "I-6", descripcion: "Sin botón de atrás"}, {idI: "I-7", descripcion: "Botones cambiados Retiro usa la funcionalidad de depósito"}];
	
	$scope.iPA3 = [{idI: "I-1", descripcion: "Retirar valor 0 y números negativos"}, {idI: "I-2", descripcion: "Retirar a pesar de no tener saldo"},
	{idI: "I-3", descripcion: "No respeta el valor límite impuesto por el sistema: 1.000.000"}, {idI: "I-4", descripcion: "No avisar al cliente sobre la realización de una operación"}, 
	{idI: "I-5", descripcion: "Botón de atrás no funciona"}, {idI: "I-6", descripcion: "No mostrar las migas de pan"}];

	$scope.iPA4 = [{idI: "I-1", descripcion: "No verificar el rut"}, {idI: "I-2", descripcion: "Transferir 0 y numero negativos, además de un monto mayor al saldo disponible"},
	{idI: "I-3", descripcion: "No avisar al cliente sobre la realización de una operación"}, {idI: "I-4", descripcion: "Botón de atrás no funciona"}, 
	{idI: "I-5", descripcion: "Migas de pan, botón de inicio direcciona a configuración en lugar del inicio"}, {idI: "I-6", descripcion: "Transferir y no descontar "+
	"saldo del que realiza la transferencia, en el caso que el rut del destinatario sea distinto al del realizador"}, {idI: "I-7", descripcion: "Transferir aunque la otra cuenta este cerrada"}, 
	{idI: "I-8", descripcion: "Transferir a la misma cuenta"}, {idI: "I-9", descripcion: "Retorna el historial de otro usuario"},  {idI: "I-10", descripcion: "Valores de las columnas no relacionados con las filas"},
	{idI: "I-11", descripcion: "Sin botón de atrás"}, {idI: "I-12", descripcion: "Sin migas de pan"}];

	$scope.iPA41 = [{idI: "I-1", descripcion: "No se puede seleccionar rango de transacciones"}];

	$scope.iPA42 = [{idI: "I-1", descripcion: "No ordena los campos"}];

	$scope.iPA5 = [{idI: "I-1", descripcion: "Función de cierre de cuenta no cambia el estado del usuario, estando siempre activo"}, {idI: "I-2", descripcion: "No notificar al usuario sobre la realización de operaciones"},
	{idI: "I-3", descripcion: "Ventana emergente se encuentra mal escrito, además tiene las funcionalidad de botones cambiadas. El botón “cancelar” sirve para cerrar la cuenta y “activar” para cancelar el cierre."}];
});
app.controller("evaluarCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.realizador = $rootScope.sesion.getUserAux();
	$scope.practica = $rootScope.sesion.getPracticaT();
	$scope.realizadorCompleto = $scope.realizador.nombreU + " " + $scope.realizador.apellidoU;
	$scope.back = function(){
		$location.path("/home/ayudante/practicaPreliminar");
	}

	$scope.showAlert = function(contenido) {

		$mdDialog.show(
		      $mdDialog.alert()
		        .clickOutsideToClose(true)
		        .title('Información')
		        .textContent(contenido)
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Entendido!')
		    );
	};

	$scope.evaluarP = function(){

		if($scope.nota >= 2147483647 || $scope.nota <= -2147483647){
			$scope.showAlert("Valores no soportados por el sistema");
		}else if(Math.ceil($scope.nota) != $scope.nota){
			$scope.showAlert("Formato de nota incorrecto, Ej: 55");
		}else{

			restFactory.evaluarP($scope.practica.idPractica, $scope.nota, $scope.observaciones)
				.success(function (response){
				if(response.message == "t"){
					restFactory.getPById($scope.practica.idPractica)
						.success(function (response1){
						$rootScope.sesion.setPracticaT(response1);
							viewFactory.showSimpleToast("Evaluación realizada con éxito, le enviará un correo electrónico");
							$location.path("/home/ayudante/practicaPreliminar");	  	
					});
				}else if(response.message == "e"){
					$scope.showAlert("La nota no puede ser superior a 70");	
				}else if(response.message == "i"){
					$scope.showAlert("La nota no puede ser inferior a 10");	
				}else{
					$scope.showAlert("Error al evaluar la práctica, intente más tarde");	
				}	  	
		
		});
	}
	}
});
app.controller("ayudantePracticaHUCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/ayudante/practicahome");
	}
	$scope.hu = {};
	$scope.gridOptions = {
            data: [],
            urlSync: false
    };

	restFactory.getHU()
			.success(function(response){
				$scope.gridOptions.data = response;
	});

	$scope.verPA = function(item){
		$rootScope.sesion.setHU(item);
		$location.path("/home/ayudante/practicapa");
	}
});
app.controller("ayudantePracticaPACtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/ayudante/practicahu");
	}
	$scope.pas = {};
	$scope.gridOptions = {
            data: [],
            urlSync: false
    };

	restFactory.getPA($rootScope.sesion.hu.idHU)
			.success(function(response){
				$scope.pas = response;
	});
});
