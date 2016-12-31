/*Inicio Alumno controllers*/
app.controller("homeCtrlAlum", function($rootScope, $scope, $location, $http){
	$scope.usuario = $rootScope.sesion.getUser();

    $scope.editP = function(){
		$location.path("/home/alumno/editar");
	}

	$scope.practicas = function(){
		$location.path("/home/alumno/practicas");
	}

	$scope.practicaT = function(){
		$location.path("/home/alumno/terminal");
	}

	$scope.back = function(){
		$location.path("/home/alumno");
	}
});
app.controller("editarAlumCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, Upload){
	$scope.usuario = $rootScope.sesion.getUser();
	$scope.pass = "";
	$scope.passC = "";
	$scope.fotoP = "";
	$scope.apodo = $scope.usuario.apodoU;

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

	$scope.editarP = function(){
		var file = $scope.file;
			if((($scope.pass == undefined && $scope.passC == undefined) || ($scope.pass == "" && $scope.passC == "")) && $scope.apodo == $scope.usuario.apodoU && file == undefined ){
				$scope.showAlert("No existen campos a modificar.");
				return "";
			}
			if(( $scope.pass != undefined && $scope.passC != undefined) && ($scope.pass != "" && $scope.passC != "")){
				if($scope.pass != $scope.passC){
					$scope.showAlert("Contraseñas ingresadas no coinciden.");
					return "";
					}
				if($scope.pass == $scope.usuario.contrasenaU){
					$scope.showAlert("Contraseña ingresada es igual a la actual.");
					return "";
				}
				if($scope.pass.length < 3 ||  $scope.passC.length < 3){
					$scope.showAlert("Contraseña ingresada debe poseer como mínimo 3 caracteres.");
					return "";
				}
			}

			var confirm = $mdDialog.confirm()
					          .title('Desea actualizar su perfil?')
					          .textContent('Su perfil será actualizado')
					          .ariaLabel('Lucky day')
					          .ok('Actualizar')
					          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    if(($scope.apodo != "" || $scope.apodo != undefined || $scope.apodo != null) && $scope.apodo != $scope.usuario.apodoU){
					$scope.usuario.apodoU = $scope.apodo;
				}	
				
				if($scope.pass != undefined && $scope.passC != undefined && $scope.pass != "" && $scope.passC != "" && $scope.pass != null && $scope.passC != null){
					$scope.usuario.contrasenaU = $scope.pass;
				}

					if(file != undefined){
					$scope.photoP = "img/"+file.name;
					test = Upload.upload({
				            url: 'server.php',
				            data: {file: file, 'username': $scope.usuario.rutU}
				        })
				        .then(function (resp) {
					            $scope.usuario.fotoPerfilU = $scope.photoP;
					           	restFactory.editarUsuario($scope.usuario)
									.success(function(response){
										if(response){
											var user = response;
											$rootScope.sesion.setUser(user);
											viewFactory.showSimpleToast("Edición efectuada, se le notificará por correo electrónico");
											 $location.path("/home/alumno/info");
										}else{
											$scope.showAlert("Error al realizar la edición intente más tarde.");
										}
								});
								
 				        },
						  function(error) {
						  	$scope.showAlert("Error al guardar su fotografía de perfil, intente más tarde.");
						  });

				}

				else{
					
					restFactory.editarUsuario($scope.usuario)
						.success(function(response){
							if(response){
								var user = response;
								$rootScope.sesion.setUser(user);
								viewFactory.showSimpleToast("Edición efectuada, se le notificará por correo electrónico");
								 $location.path("/home/alumno/info");
							}else{
								$scope.showAlert("Error al realizar la edición intente más tarde.");
							}
					});
				}
								
			    }, function() {
			    	return "";
			    });
	}

	$scope.cerrarC = function(){
		var motivo = $scope.motivoC;
			var confirm = $mdDialog.confirm()
	          .title('Desea cerrar su cuenta?')
	          .textContent('Su cuenta será cerrada')
	          .ariaLabel('Lucky day')
	          .ok('Cerrar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	restFactory.cerrar($scope.usuario.rutU, motivo)
							.success(function(response){
								if(response.message == "true"){
									$rootScope.sesion.destroy();
									viewFactory.showSimpleToast("Cerrando cuenta, se le enviará un correo electrónico");
									$location.path("/");				
								}else{
									$scope.showAlert("Error al realizar el cierre de la cuenta intente más tarde.");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });
	}

	$scope.activarC = function(){
			var confirm = $mdDialog.confirm()
	          .title('Desea activar su cuenta?')
	          .textContent('Su cuenta será activada')
	          .ariaLabel('Lucky day')
	          .ok('Activar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	restFactory.activar($scope.usuario.rutU)
							.success(function(response){
								if(response){
									$rootScope.sesion.setUser(response);
									viewFactory.showSimpleToast("Cuenta activa, se le enviará un correo electrónico");
									$location.path("/home/alumno");				
								}else{
									$scope.showAlert("Error al realizar la activación de la cuenta intente más tarde.");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });
	}

	$scope.cancelar = function(){
		$location.path("/home/alumno/info");
	}

	$scope.back = function(){
		$location.path("/home/alumno/info");
	}
});
app.controller("comunidadesCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.usuario = $rootScope.sesion.getUser();
	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
	
	restFactory.getCByAA($scope.usuario.idUsuario)
		  .success(function (response){
		  	$scope.gridOptions.data = response;	  	
		});

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


	$scope.sendSupervision = function(item){
		$rootScope.sesion.setComunidad(item);
		$location.path("/home/alumno/verAsociadosC");
	}
	
	$scope.back = function(){
		$location.path("/home/alumno");
	}
});
app.controller("asociadosCtrl", function($rootScope, $scope, $location, $http, restFactory){

	$scope.comunidad = $rootScope.sesion.getComunidad();
	$scope.profe = $scope.comunidad.profesorC.nombreU +" "+ $scope.comunidad.profesorC.apellidoU;

	$scope.gridOptions = {
        data: [],
        urlSync: false
    };

    $scope.gridOptions1 = {
        data: [],
        urlSync: false
    };

	restFactory.getAsociadosC($scope.comunidad.idComunidad)
		.success(function (response){
		$scope.gridOptions.data = response;
	});

	$scope.configurar = function(){
		$location.path("/home/ayudante/configurarPT");
	}

	$scope.sendToDes = function(item){
		$rootScope.sesion.setUserAux(item);
		$location.path("/home/alumno/verSelected");
	}

	$scope.back = function(){
		$rootScope.sesion.destroyComunidad();
		$location.path("/home/alumno/comunidades");
	}

	$scope.terminalB = function(){
		$location.path("/home/alumno/terminal");
	}

	$scope.verInfo = function(item){
		$rootScope.sesion.setUserAux(item);
		$location.path("/home/ayudante/verAsignados");
	}

	$scope.pruebaTeo = function(){
		$location.path("/home/alumno/preliminarpt");
	}

	restFactory.getAlumnosByCorrectorComunidad($rootScope.sesion.getUser().idUsuario, $rootScope.sesion.getComunidad().idComunidad)
		  .success(function (response){
		  $scope.gridOptions1.data = response;	  	
	});

 	$scope.accesoP = false;
	restFactory.accesoPractica($rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.getUser().idUsuario)
		  .success(function (response){
		  $scope.accesoP = response.message;
	});	  
});
app.controller("verSelectedCtrl", function($rootScope, $scope, $location, $http, restFactory){
	$scope.usuario = $rootScope.sesion.getUserAux();

	$scope.back = function(){
		$rootScope.sesion.destroyUserAux();
		$location.path("/home/alumno/verAsociadosC");
	}
});
app.controller("practicasAlumnoAsignadoAyudanteCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.usuario = $rootScope.sesion.getUserAux();

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
	
	$scope.verInfo = function(item){
		$rootScope.sesion.setPracticaT(item);
		restFactory.getPractica1ByIdentificadorP($rootScope.sesion.practicaT.identificadorPractica, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.userAux.rutU)
			.success(function (practica1){
				if(practica1){
					$rootScope.sesion.setPracticaT1(practica1);	
					restFactory.getPractica2ByIdentificadorP($rootScope.sesion.practicaT.identificadorPractica, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.userAux.rutU)
						.success(function (practica2){
							if(practica2){
								$rootScope.sesion.setPracticaT2(practica2);	
								
							}
							$location.path("/home/ayudante/practicaPreliminar");
					});
				}else{
					$scope.showAlert("Error al cargar la práctica, intente más tarde");
				}
		});
	}

	$scope.gridOptions = {
            data: [],
            urlSync: false
    };

	restFactory.getPracticasByAlumnoCorrectorComunidad($scope.usuario.idUsuario, $rootScope.sesion.getUser().idUsuario, $rootScope.sesion.getComunidad().idComunidad)
		  .success(function (response){
		  $scope.gridOptions.data = response;	  	
	});

	$scope.back = function(){
		$rootScope.sesion.destroyUserAux();
		$location.path("/home/alumno/verAsociadosC");
	}

	$scope.pruebaTeorica = {};
	$scope.areasReforzar = {};
	restFactory.getPracticaTeorica($scope.usuario.idUsuario, $rootScope.sesion.comunidad.idComunidad)
			.success(function (prueba){
				if(prueba){
					$scope.pruebaTeorica = prueba;
					restFactory.getAreasReforzar($scope.pruebaTeorica.idPT)
							.success(function (areas){
								if(areas){
									$scope.areasReforzar = areas;
								}
					});	

				}
	});	
});
/*Fin Alumno controllers*/
/*Inicio Terminal*/
app.controller("terminalHomeCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.usuario = $rootScope.sesion.getUser();
	$scope.back = function(){
		$location.path("/home/alumno/verAsociadosC");
	}
	
	$scope.crearP = function(){
		restFactory.crearP($scope.usuario.rutU, $rootScope.sesion.comunidad.idComunidad)
		  .success(function (response){
		  	if(response.message == "f"){
		  		$scope.showAlert("Error al crear la práctica, intente más tarde");
		  		
		  	}else if(response.message == "c"){
		  		$scope.showAlert("No hay correctores disponibles para la práctica");
		  	}else if(response.message == "n"){
		  		$scope.showAlert("No puede iniciar una nueva práctica mientras no haya finalizado la actual");
		  	}else{
		  		restFactory.getPracticaByIdentificadorComunidad(response.message, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.user.rutU)
				  .success(function (practica){
				  	if(practica){
				  		$rootScope.sesion.setPracticaT(practica);
				  		restFactory.getPractica1ByIdentificadorP(response.message, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.user.rutU)
						  .success(function (practica1){
						  	if(practica1){
						  		$rootScope.sesion.setPracticaT1(practica1);
						  		viewFactory.showSimpleToast("Práctica creada con éxito, se le enviará un correo electrónico");
				  				$location.path("/home/alumno/practicainfo");
						  	}else{
						  		$scope.showAlert("Error al crear la práctica, intente más tarde");
						  	}
						  	   	
						});
				  	}else{
				  		$scope.showAlert("Error al crear la práctica, intente más tarde");
				  	}
				  	   	
				});
			}   	
		});
	}

	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
	
	restFactory.getPracticasByAlumnoComunidad($scope.usuario.idUsuario, $rootScope.sesion.comunidad.idComunidad)
		  .success(function (response){
		  	$scope.gridOptions.data = response;	  	
	});

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


	$scope.verInfo = function(item){
		$rootScope.sesion.setPracticaT(item);
		restFactory.getPractica1ByIdentificadorP($rootScope.sesion.practicaT.identificadorPractica, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.user.rutU)
			.success(function (practica1){
				if(practica1){
					$rootScope.sesion.setPracticaT1(practica1);
					restFactory.getPractica2ByIdentificadorP($rootScope.sesion.practicaT.identificadorPractica, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.user.rutU)
						.success(function (practica2){
							if(practica2){
								$rootScope.sesion.setPracticaT2(practica2);	
							}
							$location.path("/home/alumno/practicainfo");
					});
				}else{
					$scope.showAlert("Error al cargar la práctica, intente más tarde");
				}
		});
		
	}	
});
app.controller("terminalInfoCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.usuario = $rootScope.sesion.getUser();
	$scope.practica = $rootScope.sesion.getPracticaT();
	$scope.correctorCompleto = $scope.practica.corrector.nombreU +" "+$scope.practica.corrector.apellidoU;
	$scope.back = function(){
		$rootScope.sesion.destroyPracticaT();
		$rootScope.sesion.destroyPracticaT1();
		$rootScope.sesion.destroyPracticaT2();
		$location.path("/home/alumno/terminal");
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

	$scope.reanudar = function(){
		$location.path("/home/alumno/practicahome");
	}

	$scope.verPauta = function(){
		$location.path("/home/alumno/pautaE");
	}

	$scope.practica2 = function(){
		restFactory.crearPractica2($rootScope.sesion.getPracticaT().identificadorPractica, $rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.user.rutU)
			.success(function(response){
				if(response.message == "t"){
					restFactory.getPracticaByIdentificadorComunidad($rootScope.sesion.getPracticaT().identificadorPractica, $rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.user.rutU)
						  .success(function (practica){
						  	if(practica){
						  		$rootScope.sesion.setPracticaT(practica);
						  		restFactory.getPractica2ByIdentificadorP($rootScope.sesion.getPracticaT().identificadorPractica, $rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.user.rutU)
								  .success(function (practica2){
								  	if(practica2){
								  		$rootScope.sesion.setPracticaT2(practica2);
								  		viewFactory.showSimpleToast("Práctica 2 creada con éxito, se le enviará un correo electrónico");
						  				$location.path("/home/alumno/practicahome");
								  	}else{
								  		$scope.showAlert("Error al crear la práctica, intente más tarde");
								  	}
								  	   	
								});
						  	}else{
						  		$scope.showAlert("Error al crear la práctica, intente más tarde");
						  	}
						  	   	
						});			
				}else{
					$scope.showAlert("Error al crear la práctica, intente más tarde");
				}
		});
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
									viewFactory.showSimpleToast("Eliminación realizada con éxito, se le enviará un correo electrónico");
									$rootScope.sesion.destroyPracticaT();
									$location.path("/home/alumno/terminal");				
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
app.controller("practicaHomeCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.usuario = $rootScope.sesion.getUser();
	$scope.nombreCorrector = $rootScope.sesion.practicaT.corrector.nombreU + " " + $rootScope.sesion.practicaT.corrector.apellidoU;
	$scope.back = function(){
		$location.path("/home/alumno/practicainfo");
	}
	
	$scope.verHU = function(){
		$location.path("/home/alumno/practicahu");
	}

	$scope.pauta = function(){
		$location.path("/home/alumno/pautaE");
	}

	$scope.verTerminal = function(){
		$location.path("/moduloD/inicio");
	}

	$scope.verCasos = function(){
		$location.path("/home/alumno/practicacasoprueba");
	}

	$scope.verIncidencias = function(){
		$location.path("/home/alumno/practicaincidencias");
	}

	$scope.verCanal = function(){
		$location.path("/home/alumno/practicacanal");
	}

	$scope.verReparacion = function(){
		$location.path("/home/alumno/practica2");
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

	$scope.enviarCoreccion = function(){
		var confirm = $mdDialog.confirm()
			          .title('Desea enviar la práctica a corrección?')
			          .textContent('La práctica será enviada a corrección')
			          .ariaLabel('Lucky day')
			          .ok('Enviar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.correccionP($rootScope.sesion.getPracticaT1().idPractica1)
			    		.success(function(response){

								if(response.message == "t"){							
									restFactory.getPracticaByIdentificadorComunidad($rootScope.sesion.getPracticaT().identificadorPractica, $rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.user.rutU)
							    		.success(function(response){
												if(response){	
													restFactory.getPractica1ByIdentificadorP($rootScope.sesion.getPracticaT().identificadorPractica, $rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.user.rutU)
													  .success(function (practica1){
													  	if(practica1){
													  		viewFactory.showSimpleToast("Práctica enviada a corrección, se le notificará al corrector por correo electrónico");
															$rootScope.sesion.setPracticaT(response);
													  		$rootScope.sesion.setPracticaT1(practica1);
															$location.path("/home/alumno/practicainfo");	
													  	}else{
													  		$scope.showAlert("Error al crear la práctica, intente más tarde");
													  	}
													  	   	
													});
																
												}else{
													$scope.showAlert("Error al cargar la práctica, intente más tarde");
												}
									});			
								}else{
									$scope.showAlert("Error al enviar a corrección, intente más tarde");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });	
	}

	$scope.enviarCoreccion2 = function(){
		var confirm = $mdDialog.confirm()
			          .title('Desea enviar la práctica a corrección?')
			          .textContent('La práctica será enviada a corrección')
			          .ariaLabel('Lucky day')
			          .ok('Enviar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.correccionP2($rootScope.sesion.getPracticaT2().idPractica2)
			    		.success(function(response){
								if(response.message == "t"){							
									restFactory.getPracticaByIdentificadorComunidad($rootScope.sesion.getPracticaT().identificadorPractica, $rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.user.rutU)
							    		.success(function(response){
												if(response){	
													restFactory.getPractica2ByIdentificadorP($rootScope.sesion.getPracticaT().identificadorPractica, $rootScope.sesion.getComunidad().idComunidad, $rootScope.sesion.user.rutU)
													  .success(function (practica2){
													  	if(practica2){
													  		viewFactory.showSimpleToast("Práctica enviada a corrección, se le notificará al corrector por correo electrónico");
															$rootScope.sesion.setPracticaT(response);
													  		$rootScope.sesion.setPracticaT2(practica2);
															$location.path("/home/alumno/practicainfo");	
													  	}else{
													  		$scope.showAlert("Error al crear la práctica, intente más tarde");
													  	}
													  	   	
													});
																
												}else{
													$scope.showAlert("Error al cargar la práctica, intente más tarde");
												}
									});			
								}else{
									$scope.showAlert("Error al enviar a corrección, intente más tarde");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });	
	}
});
app.controller("practicaCPCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
	$scope.newCasoPrueba = {};
	$scope.huS = {};
	$scope.hus = {};
	$scope.nombreC = "";
	$scope.descripcion = "";
	$scope.precondicion = "";
	$scope.pasos = "";
	$scope.rE = "";


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
    
    restFactory.getHU()
		  .success(function (response){
		  $scope.hus = response;
		  $scope.huS = $scope.hus[0];	  	
	});
	
	restFactory.getCPByPractica($rootScope.sesion.getPracticaT().idPractica)
		.success(function (response){
		 $scope.gridOptions.data = response;
		 $scope.gridOptions1.data = response;	  	
	});
	
	$scope.crearCP = function(){
		$scope.newCasoPrueba.practicaidPractica = new Object();
		$scope.newCasoPrueba.practicaidPractica.idPractica = $rootScope.sesion.getPracticaT().idPractica;
		$scope.newCasoPrueba.practicaidPractica.identificadorPractica = $rootScope.sesion.getPracticaT().identificadorPractica;
		$scope.newCasoPrueba.practicaidPractica.comunidadidComunidad = new Object();
		$scope.newCasoPrueba.practicaidPractica.comunidadidComunidad.idComunidad = $rootScope.sesion.getComunidad().idComunidad;
		$scope.newCasoPrueba.practicaidPractica.realizador = new Object();
		$scope.newCasoPrueba.practicaidPractica.realizador.rutU = $rootScope.sesion.user.rutU;
		$scope.newCasoPrueba.HUidHU = new Object();
		$scope.newCasoPrueba.HUidHU.idHU = $scope.huS.idHU;
		$scope.newCasoPrueba.HUidHU.identificadorHU = $scope.huS.identificadorHU;
		$scope.newCasoPrueba.HUidHU.nombre = $scope.huS.nombre;
		$scope.newCasoPrueba.HUidHU.descripcion = $scope.huS.descripcion;
		$scope.newCasoPrueba.nombre = $scope.nombreC;
		$scope.newCasoPrueba.descripcion = $scope.descripcion;
		$scope.newCasoPrueba.precondicion = $scope.precondicion;
		$scope.newCasoPrueba.pasos = $scope.pasos;
		$scope.newCasoPrueba.resultadosE = $scope.rE;
		$scope.newCasoPrueba.resultadosO = "";
		restFactory.crearCP($scope.newCasoPrueba)
			.success(function (response){
			if(response.message == "true"){
				restFactory.getCPByPractica($rootScope.sesion.getPracticaT().idPractica)
					.success(function (response){
					 $scope.gridOptions.data = response;
					 $scope.gridOptions1.data = response;
					 viewFactory.showSimpleToast("Caso de prueba creado con éxito");	  	
				});	
			}else{
				$scope.showAlert("Error al crear el caso de prueba, intente más tarde");
			}
		});
	}

	$scope.back = function(){
		$location.path("/home/alumno/practicahome");
	}

	$scope.sendCPInfo = function(item){
		$rootScope.sesion.setCP(item);
		$location.path("/home/alumno/practicaCPI");
	}
});
app.controller("practicaCPICtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
		$location.path("/home/alumno/practicacasoprueba");
	}

	$scope.editCP = function(){
		$location.path("/home/alumno/practicaCPE");
	}
});
app.controller("practicaCPECtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.cp = $rootScope.sesion.getCP();
	$scope.estadoS = {};
	$scope.estados = {};

	restFactory.getEstadoCP()
		.success(function (response){
		 $scope.estados = response;

		for (i = 0; i < $scope.estados.length; i++) {
			if($scope.estados[i].idEstadoC == $scope.cp.estadoCidEstadoC.idEstadoC){
				$scope.estadoS = $scope.estados[i];
				break;
			}
		}	  	
	});

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

	$scope.actualizarCP = function(){

		var confirm = $mdDialog.confirm()
			          .title('Desea actualizar el caso de prueba?')
			          .textContent('El caso de prueba será actualizado')
			          .ariaLabel('Lucky day')
			          .ok('Actualizar')
			          .cancel('Cancelar');


		$mdDialog.show(confirm).then(function() {
					if($scope.estadoS.idEstadoC != $scope.cp.estadoCidEstadoC.idEstadoC){
						$scope.cp.estadoCidEstadoC.idEstadoC = $scope.estadoS.idEstadoC;
						$scope.cp.estadoCidEstadoC.nombre = $scope.estadoS.nombre;
					}


					if($scope.cp.resultadosO == "" || $scope.cp.resultadosO == undefined){
						$scope.cp.resultadosO = "";
					}

						restFactory.editarCP($scope.cp)
						  .success(function (response){
						  	if(response.message == "true"){
						  		viewFactory.showSimpleToast("Edición realizada con éxito");
						  		restFactory.getCasoPrueba($scope.cp.idCp)
									.success(function (response){
									$rootScope.sesion.setCP(response);
									$location.path("/home/alumno/practicaCPI");	  	
								});
						  	}else if(response.message == "i"){
						  		$scope.showAlert("No existen campos a editar");
						  	}else if(response.message == "e"){
						  		$scope.showAlert("Existen incidencias sin corregir para el caso de prueba");
						  	}else if(response.message == "ro"){
						  		$scope.showAlert("Para cambiar a estado Pasa, debe ingresar los resultados obtenidos");
						  	}else{
						  		$scope.showAlert("Error al realizar la edición, intente más tarde");
						  	} 	
						});
			    	return "";
			    }, function() {
			    	return "";
			    });	
	}


	$scope.eliminarCP = function(){

		var confirm = $mdDialog.confirm()
			          .title('Desea eliminar el caso de prueba?')
			          .textContent('El caso de prueba será eliminado')
			          .ariaLabel('Lucky day')
			          .ok('Eliminar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.eliminarCP($scope.cp.idCp)
			    		.success(function(response){
								if(response.message == "t"){
									viewFactory.showSimpleToast("Caso de prueba eliminado con éxito");
									$rootScope.sesion.destroyCP();
									$location.path("/home/alumno/practicacasoprueba");				
								}else{
									$scope.showAlert("Error al realizar la eliminación del caso de prueba, intente más tarde");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });	
	}

	$scope.back = function(){
		$location.path("/home/alumno/practicaCPI");
	}
});
app.controller("practicaIncidenciasCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
	$scope.newIncidencia = {};
	$scope.newIncidenciacp = {};
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

    $scope.gridOptions2 = {
            data: [],
            urlSync: false
    };

    $scope.gridOptions3 = {
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
		  $scope.gridOptions2.data = response;	  	
	});

	restFactory.getIncidenciasCP($rootScope.sesion.getPracticaT().idPractica)
		  .success(function (response){
		  	$scope.gridOptions1.data = response;
		  	$scope.gridOptions3.data = response;		  	
	});
	
	$scope.crearI = function(){

		$scope.newIncidencia.practicaidPractica = new Object();
		$scope.newIncidencia.practicaidPractica.idPractica = $rootScope.sesion.getPracticaT().idPractica;
		$scope.newIncidencia.practicaidPractica.identificadorPractica = $rootScope.sesion.getPracticaT().identificadorPractica;
		$scope.newIncidencia.practicaidPractica.comunidadidComunidad = new Object();
		$scope.newIncidencia.practicaidPractica.comunidadidComunidad.idComunidad = $rootScope.sesion.getComunidad().idComunidad;
		$scope.newIncidencia.practicaidPractica.realizador = new Object();
		$scope.newIncidencia.practicaidPractica.realizador.rutU = $rootScope.sesion.user.rutU;
		if($scope.casoS.identificadorCaso == "Ninguno"){
			$scope.newIncidencia.nombreI = $scope.nombre;
			$scope.newIncidencia.descripcionI = $scope.descripcion;
			$scope.newIncidencia.pasosI = $scope.pasos;
			$scope.newIncidencia.resultadoEI = $scope.rE;
			$scope.newIncidencia.resultadoOI = $scope.rO;
			restFactory.crearIncidencia($scope.newIncidencia)
			  .success(function (response){
			  	if(response.message == "true"){
			  		restFactory.getIncidenciasP($rootScope.sesion.getPracticaT().idPractica)
					  .success(function (response){
					  	viewFactory.showSimpleToast("Incidencia creada con éxito");
					  	$scope.gridOptions.data = response;	
					  	$scope.gridOptions2.data = response;	  	  	
					});
				}else{
					$scope.showAlert("Error al crear la incidencia, intente más tarde");
				}
			});
		}else{
			$scope.newIncidenciacp.casoPruebaidCp = new Object();
			$scope.newIncidenciacp.casoPruebaidCp.idCp = $scope.casoS.idCp;
			$scope.newIncidenciacp.nombreICP = $scope.nombre;
			$scope.newIncidenciacp.descripcionICP = $scope.descripcion;
			$scope.newIncidenciacp.pasosICP = $scope.pasos;
			$scope.newIncidenciacp.resultadoEICP = $scope.rE;
			$scope.newIncidenciacp.resultadoOICP = $scope.rO;
			restFactory.crearIncidenciacp($scope.newIncidenciacp)
			  .success(function (response){
			  	if(response.message == "true"){
			  		restFactory.getIncidenciasCP($rootScope.sesion.getPracticaT().idPractica)
					  .success(function (response){
					  	viewFactory.showSimpleToast("Incidencia de caso de prueba creada con éxito");
					  	$scope.gridOptions1.data = response;
					  	$scope.gridOptions3.data = response;			  	
					});
				}else{
					$scope.showAlert("Error al crear la incidencia, intente más tarde");
				}
			});
		}

		
	}

	$scope.back = function(){
		$location.path("/home/alumno/practicahome");
	}

	$scope.sendIInfo = function(item){
		$rootScope.sesion.setI(item);
		$location.path("/home/alumno/practicaII");
	}

	$scope.sendICPInfo = function(item){
		$rootScope.sesion.setICP(item);
		$location.path("/home/alumno/practicaICP");
	}
});
app.controller("practicaIECtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
	$scope.estados = {};
	$scope.estadoS = {};

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

	restFactory.getEstadoi()
		  .success(function (response){
		  	$scope.estados = response;
		  	for (i = 0; i < $scope.estados.length; i++) {
				if($scope.estados[i].idEstadoI == $scope.incidencia.estadoIidEstadoI.idEstadoI){
					$scope.estadoS = $scope.estados[i];
					break;
				}
			}	  	
	});

	$scope.back = function(){
		$location.path("/home/alumno/practicaII");
	}

	$scope.back1 = function(){
		$rootScope.sesion.destroyI();
		$location.path("/home/alumno/practicaincidencias");
	}

	$scope.editI = function(){
		$location.path("/home/alumno/practicaIE");
	}

	$scope.actualizarI = function(){

		var confirm = $mdDialog.confirm()
			          .title('Desea actualizar la incidencia?')
			          .textContent('La incidencia será actualizada')
			          .ariaLabel('Lucky day')
			          .ok('Actualizar')
			          .cancel('Cancelar');

		$mdDialog.show(confirm).then(function() {
					if($scope.estadoS.nombre != undefined){
						$scope.incidencia.estadoIidEstadoI = $scope.estadoS
					}

					restFactory.editarIncidencia($scope.incidencia)
					  .success(function (response){
					  	if(response.message == "true"){
					  		viewFactory.showSimpleToast("Edición realizada con éxito");
					  		restFactory.getIncidencia($scope.incidencia.idIncidencia)
								.success(function (response){
								$rootScope.sesion.setI(response);
								$location.path("/home/alumno/practicaII");	  	
							});
					  		
					  	}else if(response.message == "i"){
					  		$scope.showAlert("No existen campos a editar");
					  	}else{
					  		$scope.showAlert("Error al realizar la edición, intente más tarde");
					  	} 	
					});
			    	return "";
			    }, function() {
			    	return "";
			    });	
	}

	$scope.eliminarI = function(){

		var confirm = $mdDialog.confirm()
			          .title('Desea eliminar la incidencia?')
			          .textContent('La incidencia será eliminada')
			          .ariaLabel('Lucky day')
			          .ok('Eliminar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.eliminarIncidencia($scope.incidencia.idIncidencia)
			    		.success(function(response){
								if(response.message == "t"){
									viewFactory.showSimpleToast("Incidencia eliminada con éxito");
									$rootScope.sesion.destroyI();
									$location.path("/home/alumno/practicaincidencias");				
								}else{
									$scope.showAlert("Error al realizar la eliminación de la incidencia intente más tarde.");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });	
	}
});
app.controller("practicaICPCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
	$scope.incidenciacp = $rootScope.sesion.getICP();

	$scope.back1 = function(){
		$rootScope.sesion.destroyICP();
		$location.path("/home/alumno/practicaincidencias");
	}

	$scope.back = function(){
		$location.path("/home/alumno/practicaICP");
	}

	$scope.editICP = function(){
		$location.path("/home/alumno/practicaICPE");
	}

	$scope.estados = {};
	$scope.estadoS = {};

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

	restFactory.getEstadoi()
		  .success(function (response){
		  	$scope.estados = response;
		  	for (i = 0; i < $scope.estados.length; i++) {
				if($scope.estados[i].idEstadoI == $scope.incidenciacp.estadoIidEstadoI.idEstadoI){
					$scope.estadoS = $scope.estados[i];
					break;
				}
			}	  	
	});


	$scope.actualizarICP = function(){

		var confirm = $mdDialog.confirm()
			          .title('Desea actualizar la incidencia?')
			          .textContent('La incidencia será actualizada')
			          .ariaLabel('Lucky day')
			          .ok('Actualizar')
			          .cancel('Cancelar');

		$mdDialog.show(confirm).then(function() {
					if($scope.estadoS.nombre != undefined){
						$scope.incidenciacp.estadoIidEstadoI = $scope.estadoS
					}

					restFactory.editarIncidenciacp($scope.incidenciacp)
					  .success(function (response){
					  	if(response.message == "true"){
					  		viewFactory.showSimpleToast("Edición realizada con éxito");
					  		restFactory.getIncidenciacp($scope.incidenciacp.idIncidenciacp)
								.success(function (response){
								$rootScope.sesion.setICP(response);
								$location.path("/home/alumno/practicaICP");	  	
							});
					  		
					  	}else if(response.message == "i"){
					  		$scope.showAlert("No existen campos a editar");
					  	}else{
					  		$scope.showAlert("Error al realizar la edición, intente más tarde");
					  	} 	
					});
			    	return "";
			    }, function() {
			    	return "";
			    });		
	}

	$scope.eliminarICP = function(){

		var confirm = $mdDialog.confirm()
			          .title('Desea eliminar la incidencia?')
			          .textContent('La incidencia será eliminada')
			          .ariaLabel('Lucky day')
			          .ok('Eliminar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.eliminarIncidenciacp($scope.incidenciacp.idIncidenciacp)
			    		.success(function(response){
								if(response.message == "t"){
									viewFactory.showSimpleToast("Incidencia eliminada con éxito");
									$rootScope.sesion.destroyICP();
									$location.path("/home/alumno/practicaincidencias");				
								}else{
									$scope.showAlert("Error al realizar la eliminación de la incidencia intente más tarde.");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });	
	}
});
app.controller("practicaCCCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.nombreCorrector = $rootScope.sesion.getPracticaT().corrector.nombreU + " " + $rootScope.sesion.getPracticaT().corrector.apellidoU;
	$scope.mensajes = {};
	$scope.back = function(){
		$location.path("/home/alumno/practicahome");
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

		if($scope.mensaje != undefined && $scope.mensaje != ""){
			if($scope.mensaje.length > 1000){
				$scope.showAlert("El mensaje no puede tener más de 1000 caracteres");
				return "";
			}

			$scope.mensaje1 = new Object();
			$scope.mensaje1.idP = $rootScope.sesion.practicaT.idPractica;
			$scope.mensaje1.mensaje = $scope.mensaje;
			$scope.mensaje1.tipo = "r";
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
app.controller("alumnoPautaECtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.back = function(){
		$location.path("/home/alumno/practicainfo");
	}

	$scope.back1 = function(){
		$location.path("/home/alumno/pautaE");
	}

	
	$scope.back2 = function(){
		$location.path("/home/alumno/practicahome");
	}

	$scope.verTerminal = function(){
		$location.path("/moduloP/inicio");
	}

	$scope.verPauta = function(){
		$location.path("/home/alumno/pautaIncidencias");
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
	
	$scope.iPA1 = [{idI: "I-1", descripcion: "No valida el formato del rut, y no indica el usuario el formato que debe utilizar"}, {idI: "I-2", descripcion: "No esconde la "+
	"contraseña al momento de ingresarla"}, {idI: "I-3", descripcion: "Si los datos ingresados son incorrectos, no notifica al usuario"}, {idI: "I-3", descripcion: "Nombre "+
	"del título inicio sesión mal escrito dice 'seción'"}];
	
	$scope.iPA12 = [{idI: "I-1", descripcion: "Icono de configuración toma la funcionalidad de cerrar sesión y de cerrar sesión toma la funcionalidad de configuración"}];
	
	$scope.iPA2 = [{idI: "I-1", descripcion: "Deja depositar un monto 0 y negativos"}, {idI: "I-2", descripcion: "No respeta el monto límite impuesto por el sistema: 1.000.000"},
	{idI: "I-3", descripcion: "Sobrepasa el valor máximo del campo monto soportado por la base de datos del sistema, impidiendo la realización de la operación"}, 
	{idI: "I-4", descripcion: "No notifica al usuario sobre el estado de la operación realizada"}, {idI: "I-5", descripcion: "Las migas de pan muestran que el usuario se encuentra en la página para hacer 'retiro', cuando se encuentra en la de 'depósito'"},
	{idI: "I-6", descripcion: "No posee el botón para ir atrás"}, {idI: "I-7", descripcion: "Al dirigirse a realizar la operación depósito, redirecciona a la de retiro."}];
	
	$scope.iPA3 = [{idI: "I-1", descripcion: "Deja retirar el monto 0 y negativos"}, {idI: "I-2", descripcion: "Deja retirar a pesar de no tener saldo"},
	{idI: "I-3", descripcion: "No respeta el monto límite impuesto por el sistema: 1.000.000"}, {idI: "I-4", descripcion: "No notifica al usuario sobre el estado de la operación realizada"}, 
	{idI: "I-5", descripcion: "Botón de atrás no funciona"}, {idI: "I-6", descripcion: "No muestra las migas de pan"}];

	$scope.iPA4 = [{idI: "I-1", descripcion: "No valida el formato del rut, y no indica el usuario el formato que debe utilizar"}, {idI: "I-2", descripcion: "Deja transferir el monto 0 y negativos, además de un monto mayor al saldo disponible"},
	{idI: "I-3", descripcion: "No notifica al usuario sobre el estado de la operación realizada"}, {idI: "I-4", descripcion: "Botón de atrás no funciona en la transferencia"}, 
	{idI: "I-5", descripcion: "En las migas de pan el botón de inicio direcciona a configuración en lugar del inicio"}, {idI: "I-6", descripcion: "Deja transferir y no descuenta "+
	"el monto del saldo del que realiza la transferencia"}, {idI: "I-7", descripcion: "Deja transferir aunque la cuenta del destinatario este cerrada"}, {idI: "I-8", descripcion: "Deja transferir a la misma cuenta del realizador"}, 
	{idI: "I-9", descripcion: "Deja transferir a la misma cuenta"}, {idI: "I-10", descripcion: "No se ven las transacciones realizadas en el historial"},
	{idI: "I-11", descripcion: "Sin el botón de atrás en el historial"}, {idI: "I-12", descripcion: "Sin migas de pan en el historial"}];

	$scope.iPA41 = [{idI: "I-1", descripcion: "No se puede seleccionar rango de transacciones"}];

	$scope.iPA42 = [{idI: "I-1", descripcion: "No ordena los campos"}];

	$scope.iPA5 = [{idI: "I-1", descripcion: "Función de cierre de cuenta no cambia el estado del usuario, estando siempre activo"}, {idI: "I-2", descripcion: "No notifica al usuario sobre el estado de las operaciones realizadas"},
	{idI: "I-3", descripcion: "Ventana emergente se encuentra mal escrita, además tiene las funcionalidad de botones cambiadas. El botón “cancelar” sirve para cerrar la cuenta y “activar” para cancelar el cierre."}];

	$scope.iPA6 = [{idI: "I-1", descripcion: "No permite activar la cuenta del usuario"}];
});
app.controller("practicaHUCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/alumno/practicahome");
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
/*Fin Terminal*/
/*Práctica 2 terminal inicio*/
app.controller("alumnoPractica2Ctrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.practica2 = $rootScope.sesion.practicaT2;
	$scope.githubURL = $rootScope.sesion.practicaT2.urlGithub;
	$scope.codenvyURL = $rootScope.sesion.practicaT2.urlCodenvy;
	$scope.github = $scope.practica2.urlGithub;
	$scope.codenvy = $scope.practica2.urlCodenvy;
	$scope.back = function(){
		$location.path("/home/alumno/practicahome");
	}

	$scope.back1 = function(){
		$location.path("/home/alumno/practica2");
	}

	$scope.instrucciones = function(){
		$location.path("/home/alumno/practica2Instrucciones");
	}

	$scope.repositorio = function(){
		$location.path("/home/alumno/practica2Repositorio");
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

	$scope.codenvyF = function(){
		window.open($rootScope.sesion.practicaT2.urlCodenvy);
	}

	$scope.githubF = function(){
		window.open($rootScope.sesion.practicaT2.urlGithub);
	}

	$scope.guardar = function(){
		$scope.practica2.urlGithub = $scope.github;
		$scope.practica2.urlCodenvy = $scope.codenvy;
		restFactory.guardarAR($scope.practica2)
			.success(function(response){
				if(response.message == "e"){
					$scope.showAlert("No hay URLs para guardar");
				}else if(response.message == "i"){
					$scope.showAlert("Formato URLs incorrecto, Ej: https://www.google.cl");
					$rootScope.sesion.practicaT2.urlGithub = $scope.githubURL;
					$rootScope.sesion.practicaT2.urlCodenvy = $scope.codenvyURL;
				}else{
					restFactory.getPractica2ByIdentificadorP($rootScope.sesion.practicaT.identificadorPractica, $rootScope.sesion.comunidad.idComunidad, $rootScope.sesion.user.rutU)
								  .success(function (practica2){
								  	if(practica2){
								  		$rootScope.sesion.setPracticaT2(practica2);
								  		viewFactory.showSimpleToast("URLs guardadas, se le enviará un correo electrónico al corrector");
						  				$location.path("/home/alumno/practica2Repositorio");
								  	}   	
					});
					
				}
		});
	}
});
/*Práctica 2 terminal fin*/


/*Sprint 3.5*/
app.controller("alumnoPreliminarPTCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/alumno/verAsociadosC");
	}

	$scope.pruebaTeorica = {};
	$scope.areasReforzar = {};
	restFactory.getPracticaTeorica($rootScope.sesion.user.idUsuario, $rootScope.sesion.comunidad.idComunidad)
			.success(function (prueba){
				if(prueba){
					$scope.pruebaTeorica = prueba;
					restFactory.getAreasReforzar($scope.pruebaTeorica.idPT)
							.success(function (areas){
								if(areas){
									$scope.areasReforzar = areas;
								}
					});	

				}
	});	


	$scope.comenzarPT = function(){
		$location.path("/home/alumno/prueba");
	}
});

app.controller("alumnoPruebaCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/alumno/preliminarpt");
	}

	$scope.preguntasPT = {};
	$scope.respuestas = {};

	restFactory.getPreguntas()
			.success(function (preguntas){
				if(preguntas){
					for(var i = 0 ; i < preguntas.length ; i++){
						preguntas[i].respuesta = "";
					}
					$scope.preguntasPT = preguntas;
				}
	});		

	$scope.test = new Object();

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

	$scope.corregir = function(){

		var confirm = $mdDialog.confirm()
	          .title('Desea enviar a corrección?')
	          .textContent('Su prueba será corregida')
	          .ariaLabel('Lucky day')
	          .ok('Corregir')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
	          		$scope.test.respuestas = $scope.preguntasPT;
						$scope.test.idComunidad = $rootScope.sesion.comunidad.idComunidad;
						$scope.test.idAlumno = $rootScope.sesion.user.idUsuario;
						restFactory.corregirPT($scope.test)
							.success(function (response){
								if(response.message == "t"){
									$location.path("/home/alumno/pruebaR");
									viewFactory.showSimpleToast("Prueba corregida con éxito");
								}else{
									$scope.showAlert("Error al corregir la prueba, intente más tarde");
								}
						});	
			    	return "";
			    }, function() {
			    	return "";
			    });



		
	}
});

app.controller("alumnoPruebaResultadoCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/alumno/preliminarpt");
	}

	$scope.pruebaTeorica = {};
	$scope.areasReforzar = {};
	restFactory.getPracticaTeorica($rootScope.sesion.user.idUsuario, $rootScope.sesion.comunidad.idComunidad)
			.success(function (prueba){
				if(prueba){
					$scope.pruebaTeorica = prueba;
					restFactory.getAreasReforzar($scope.pruebaTeorica.idPT)
							.success(function (areas){
								if(areas){
									$scope.areasReforzar = areas;
								}
					});	

				}
	});	
});
/*Sprint 3.5*/

/*Sprint 4*/
app.controller("materialTeoricoCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.back = function(){
		$location.path("/home/alumno");
	}

	$scope.back1 = function(){
		$location.path("/home/alumno/materialTeorico");
	}

	$scope.menu = [{
      title: "Conceptos de las pruebas de software",
      url: "/home/alumno/conceptos"
    }, {
      title: "Proceso para el control de calidad del software usando pruebas",
      url: "/home/alumno/proceso"
    }];

    $scope.sendTo = function(url){
    	$location.path(url);
    }
});
/*Sprint 4*/