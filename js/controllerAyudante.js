app.controller("preliminarPracticaCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.realizador = $rootScope.sesion.getUserAux();
	$scope.practica = $rootScope.sesion.getPracticaT();
	$scope.realizadorCompleto = $scope.realizador.nombreU + " " + $scope.realizador.apellidoU;
	$scope.back = function(){
		$rootScope.sesion.destroyPracticaT();
		$rootScope.sesion.destroyPracticaT1();
		$rootScope.sesion.destroyPracticaT2();
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
									$rootScope.sesion.destroyPracticaT1();
									$rootScope.sesion.destroyPracticaT2();
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
			$scope.mensaje1 = new Object();
			$scope.mensaje1.idP = $rootScope.sesion.practicaT.idPractica;
			$scope.mensaje1.mensaje = $scope.mensaje;
			$scope.mensaje1.tipo = "c";
			restFactory.crearMensaje($scope.mensaje1)
				.success(function(response){
				if(response.message == "true"){
					viewFactory.showSimpleToast("Mensaje enviado con éxito");
					restFactory.getMensajesP($rootScope.sesion.practicaT.idPractica)
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

	$scope.reparacion = function(){
		$location.path("/home/ayudante/practica2");
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
	
	$scope.iPA1 = [{idI: "I-1", descripcion: "No valida el formato del rut, siendo el formato correcto 9214907-2"}, {idI: "I-2", descripcion: "No indica al usuario el formato correcto del rut"}
	, {idI: "I-3", descripcion: "No esconde la contraseña del usuario"}, {idI: "I-4", descripcion: "No notifica al usuario cuando las credenciales ingresadas son incorrectas o el rut no se encuenta registrado"}, {idI: "I-5", descripcion: "Nombre "+
	"del título inicio sesión mal escrito dice 'seción'"}];
	
	$scope.iPA12 = [{idI: "I-1", descripcion: "Icono de configuración toma la funcionalidad de cerrar sesión"}, {idI: "I-2", descripcion: "Icono de cerrar sesión toma la funcionalidad de configuración de la cuenta"}];
	
	$scope.iPA2 = [{idI: "I-1", descripcion: "Permite depositar montos menores o iguales a 0"}, {idI: "I-2", descripcion: "Excede el límite de almacenamiento de dinero del sistema (1000000)"},
	{idI: "I-3", descripcion: "No maneja el valor máximo que puede soportar el campo monto (2147483647 y -2147483647)"}, 
	{idI: "I-4", descripcion: "No notifica al usuario sobre el formato del monto a depositar (Formato correcto: 10000)"}, {idI: "I-5", descripcion: "No notifica al usuario sobre el estado de su depósito"}, {idI: "I-6", descripcion: "No notifica al usuario sobre las restricciones del sistema"}, 
	{idI: "I-7", descripcion: "Las migas de pan indican que el usuario está en la página para hacer 'retiro', cuando se encuentra en la de 'depósito'"},
	{idI: "I-8", descripcion: "No posee el botón para ir atrás"}, {idI: "I-9", descripcion: "La opción que direcciona a la sección para realizar un depósito, direccionada a la sección para efectuar un retiro."}];
	
	$scope.iPA3 = [{idI: "I-1", descripcion: "Permite retirar montos menores o iguales a 0"}, {idI: "I-2", descripcion: "Permite retirar montos superiores al saldo disponible"}, {idI: "I-3", descripcion: "Excede el límite de almacenamiento de dinero del sistema (1000000)"},
	{idI: "I-4", descripcion: "No maneja el valor máximo que puede soportar el campo monto (2147483647 y -2147483647)"}, {idI: "I-5", descripcion: "No notifica al usuario sobre el formato del monto a retirar (Formato correcto: 10000)"}, 
	{idI: "I-6", descripcion: "No notifica al usuario sobre el estado de su retiro"}, {idI: "I-7", descripcion: "No notifica al usuario sobre las restricciones del sistema"}, 
	{idI: "I-8", descripcion: "Botón de atrás no funciona"}, {idI: "I-9", descripcion: "No muestra las migas de pan"}];

	$scope.iPA4 = [{idI: "I-1", descripcion: "No valida el formato del rut, siendo el formato correcto 9214907-2"}, {idI: "I-2", descripcion: "No indica al usuario el formato correcto del rut"}, {idI: "I-3", descripcion: "Permite transferir montos menores o iguales a 0"},
	{idI: "I-4", descripcion: "Permite transferir montos mayores al saldo disponible"}, {idI: "I-5", descripcion: "Permite transferir dinero a la misma cuenta del realizador"},
    {idI: "I-6", descripcion: "Permite transferir dinero a la cuenta del destinatio aunque esta se encuentre cerrada"}, {idI: "I-7", descripcion: "Transfiere y no descuenta el monto del saldo del que realiza la transferencia"},
    {idI: "I-8", descripcion: "No maneja el valor máximo que puede soportar el campo monto (2147483647 y -2147483647)"},
	{idI: "I-9", descripcion: "No notifica al usuario sobre el formato del monto a transferir (Formato correcto: 10000)"}, {idI: "I-10", descripcion: "No notifica al usuario sobre las restricciones del sistema"}, {idI: "I-11", descripcion: "Botón de atrás no funciona"}, 
	{idI: "I-12", descripcion: "En las migas de pan el botón de inicio direcciona a configuración en lugar del inicio"}, {idI: "I-13", descripcion: "No puede visualizar las transacciones realizadas en el historial"},
	{idI: "I-14", descripcion: "No existe el botón de atrás en el historial"}, {idI: "I-15", descripcion: "No existen las migas de pan en el historial"}];

	$scope.iPA41 = [{idI: "I-1", descripcion: "No permite seleccionar el rango de transacciones"}];

	$scope.iPA42 = [{idI: "I-1", descripcion: "No permite ordenar las transacciones por los campos"}];

	$scope.iPA5 = [{idI: "I-1", descripcion: "Función de cierre de cuenta no cambia el estado del usuario, estando siempre activo"}, {idI: "I-2", descripcion: "No notifica al usuario sobre el estado de las operaciones realizadas"},
	{idI: "I-3", descripcion: "Ventana de confirmación se encuentra mal escrita"}, 
	{idI: "I-4", descripcion: "En el ventana de confirmación el botón “cancelar” sirve para cerrar la cuenta y “activar” para cancelar el cierre."}];

	$scope.iPA6 = [{idI: "I-1", descripcion: "No permite activar la cuenta del usuario"}];
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

	$scope.evaluarP1 = function(){

			var confirm = $mdDialog.confirm()
	          .title('Desea evaluar la práctica?')
	          .textContent('La práctica del alumno sera evaluada')
	          .ariaLabel('Lucky day')
	          .ok('Evaluar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	if($scope.nota >= 2147483647 || $scope.nota <= -2147483647){
			$scope.showAlert("Valores no soportados por el sistema");
			return "";
		}else if(Math.ceil($scope.nota) != $scope.nota){
			$scope.showAlert("Formato de nota incorrecto, Ej: 55");
			return "";
		}else{

			restFactory.evaluarP($rootScope.sesion.practicaT1.idPractica1, $scope.nota, $scope.observaciones)
				.success(function (response){
				if(response.message == "t"){
					restFactory.getPById($scope.practica.idPractica)
						.success(function (response1){
							restFactory.getPractica1ByIdentificadorP($rootScope.sesion.practicaT.identificadorPractica, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.userAux.rutU)
								.success(function (practica1){
									if(practica1){
										$rootScope.sesion.setPracticaT(response1);
										viewFactory.showSimpleToast("Evaluación realizada con éxito, le enviará un correo electrónico");
										$location.path("/home/ayudante/practicaPreliminar");
										$rootScope.sesion.setPracticaT1(practica1);	
									}else{
										$scope.showAlert("Error al crear la práctica, intente más tarde");
									}
							});
							  	
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
			    	return "";
			    }, function() {
			    	return "";
			    });

	}

	$scope.evaluarP2 = function(){

			var confirm = $mdDialog.confirm()
	          .title('Desea evaluar la práctica?')
	          .textContent('La práctica del alumno será evaluada')
	          .ariaLabel('Lucky day')
	          .ok('Evaluar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	if($scope.nota >= 2147483647 || $scope.nota <= -2147483647){
							$scope.showAlert("Valores no soportados por el sistema");
						}else if(Math.ceil($scope.nota) != $scope.nota){
							$scope.showAlert("Formato de nota incorrecto, Ej: 55");
						}else{
							
							restFactory.evaluarP2($rootScope.sesion.practicaT2.idPractica2, $scope.nota, $scope.observaciones)
								.success(function (response){
								if(response.message == "t"){
									restFactory.getPById($scope.practica.idPractica)
										.success(function (response1){
											restFactory.getPractica2ByIdentificadorP($rootScope.sesion.practicaT.identificadorPractica, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.userAux.rutU)
												.success(function (practica2){
													if(practica2){
														$rootScope.sesion.setPracticaT(response1);
														viewFactory.showSimpleToast("Evaluación realizada con éxito, le enviará un correo electrónico");
														$location.path("/home/ayudante/practicaPreliminar");
														$rootScope.sesion.setPracticaT2(practica2);
													}else{
														$scope.showAlert("Error al crear la práctica, intente más tarde");
													}
											});
											  	
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
			    	return "";
			    }, function() {
			    	return "";
			    });
	}
});
app.controller("ayudantePracticaHUCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/ayudante/practicahome");
	}

	$scope.hu = {};
	restFactory.getHU()
			.success(function(response){
				$scope.hu = response;
	});

	$scope.pas = {};
	restFactory.getPAS()
			.success(function(response){
				$scope.pas = response;
	});
});

/*PRÁCTICA 2*/
app.controller("ayudantePractica2Ctrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.back = function(){
		$location.path("/home/ayudante/practicahome");
	}

	$scope.back1 = function(){
		$location.path("/home/ayudante/practica2");
	}

	$scope.instrucciones = function(){
		$location.path("/home/ayudante/practica2Instrucciones");
	}

	$scope.instruccionesC = function(){
		$location.path("/home/ayudante/practica2InstruccionesC");
	}

	$scope.codenvyF = function(){
		window.open($rootScope.sesion.practicaT2.urlCodenvy);
	}

	$scope.githubF = function(){
		window.open($rootScope.sesion.practicaT2.urlGithub);
	}
});
/*PRÁCTICA 2*/

/*SPRINT 3.5*/

/*SPRINT 3.5*/