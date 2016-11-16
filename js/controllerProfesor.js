/*Inicio Profesor controllers*/
app.controller("homeCtrlProfe", function($rootScope, $scope, $location, $http){
	$scope.usuario = $rootScope.sesion.getUser();
	$scope.editP = function(){
		$location.path("/home/profesor/editarP");
	}

	$scope.back = function(){
		$location.path("/home/profesor");
	}
});
app.controller("editarProfeCtrl", function($rootScope, $scope, $location, $http, fileUpload, restFactory, $mdDialog, $mdMedia, viewFactory, Upload, $window){

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

	$scope.back = function(){
		 $location.path("/home/profesor/perfil");
	}

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
											viewFactory.showSimpleToast("Edición efectuada, se le enviará un correo electrónico");
											$location.path("/home/profesor/perfil");
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
								viewFactory.showSimpleToast("Edición efectuada, se le enviará un correo electrónico");
								$location.path("/home/profesor/perfil");
							}else{
								$scope.showAlert("Error al realizar la edición intente más tarde.");
							}	
						
					});
				}
					return "";
			    }, function() {
			    	return "";
			    });			
	}

	$scope.cerrarC = function(){
		var motivo = $scope.motivoC;
	    		var confirm = $mdDialog.confirm()
			          .title('Desea cerrar su cuenta?')
			          .textContent('La cuenta será cerrada')
			          .ariaLabel('Lucky day')
			          .ok('Cerrar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.cerrar($scope.usuario.rutU, motivo)
			    		.success(function(response){
								if(response.message == "true"){
									viewFactory.showSimpleToast("Cerrando cuenta, se le enviará un correo electrónico");
									$rootScope.sesion.destroy();
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
									$location.path("/home/profesor");					
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
		$location.path("/home/profesor/perfil");
	}
});
app.controller("comunidadesCtrlProfe", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.profesor = $rootScope.sesion.getUser();
	$scope.profe = $scope.profesor.nombreU +" "+ $scope.profesor.apellidoU;
	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
	
	restFactory.getCByProfesor($scope.profesor.idUsuario)
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

	$scope.nombreCC = "";
	$scope.descripcionCC = "";

	$scope.crearC = function(){
		restFactory.crearComunidad($scope.nombreCC, $scope.descripcionCC, $scope.profesor.emailU)
		  .success(function (response){
		  	if(response.message == "t"){
		  		viewFactory.showSimpleToast("Comunidad creada, se le enviará un correo electrónico al Profesor");
		  		restFactory.getCByProfesor($scope.profesor.idUsuario)
				  .success(function (response){
				  	$scope.gridOptions.data = response;	  	
				});

		  	}else if(response.message == "e"){
		  		$scope.showAlert("Nombre ingresado existente.");
		  	}else if(response.message == "p"){
		  		$scope.showAlert("Profesor seleccionado ya no existe en el sistema.");
		  	}else{
		  		$scope.showAlert("Error al crear la comunidad. Intente más tarde.");
		  	}
		});
	}
	
	$scope.sendEdicion = function(item){
		$rootScope.sesion.setComunidad(item);
		$location.path("/home/profesor/editarC");
	}

	$scope.sendSupervision = function(item){
		$rootScope.sesion.setComunidad(item);
		$location.path("/home/profesor/verAsociadosC");
	}
	
	$scope.back = function(){
		$location.path("/home/profesor");
	}
});
app.controller("editarCCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.comunidad = $rootScope.sesion.getComunidad();
	$scope.profe = $scope.comunidad.profesorC.nombreU +" "+ $scope.comunidad.profesorC.apellidoU;
	$scope.nombreC = $scope.comunidad.nombreC;
	$scope.descripcionC = $scope.comunidad.descripcionC;	
	
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
	
	$scope.actualizarC = function(){
		if($scope.nombreC == $scope.comunidad.nombreC && $scope.descripcionC == $scope.comunidad.descripcionC){
			$scope.showAlert("No existen nuevos valores para actualizar");
			return "";
		}

		var confirm = $mdDialog.confirm()
	          .title('Desea actualizar la comunidad?')
	          .textContent('La comunidad será actualizada')
	          .ariaLabel('Lucky day')
	          .ok('Actualizar')
	          .cancel('Cancelar');
			    $mdDialog.show(confirm).then(function() {
			    	$scope.comunidad.nombreC = $scope.nombreC;
			    	$scope.comunidad.descripcionC = $scope.descripcionC;
				    restFactory.editarComunidad($scope.comunidad).success(function(response){
				    	if(response.message == "true"){	
				    		viewFactory.showSimpleToast("Comunidad actualizada, se le enviará un correo electrónico");
				    		$location.path("/home/profesor/comunidades");
				    	}else if(response.message == "e"){
				    		$scope.showAlert("Nombre ingresado existente.");
				    	}else{
				    		$scope.showAlert("Error al actualizar la comunidad. Intente más tarde.");
				    	}
					});	
			      	return "";
			    }, function() {	
			    	return "";
			     
			    });
	}

	$scope.eliminarC = function(){

		var confirm = $mdDialog.confirm()
	          .title('Desea eliminar la comunidad?')
	          .textContent('La comunidad será eliminada')
	          .ariaLabel('Lucky day')
	          .ok('Eliminar')
	          .cancel('Cancelar');
			    $mdDialog.show(confirm).then(function() {
				    restFactory.eliminarComunidad($scope.comunidad).success(function(response){
				    	if(response.message == "true"){	
				    		viewFactory.showSimpleToast("Comunidad eliminada, se le enviará un correo electrónico");
				    		$location.path("/home/profesor/comunidades");
				    	}else{
				    		$scope.showAlert("Error al eliminar la comunidad. Intente más tarde.");
				    	}
					});	
			      	return "";
			    }, function() {	
			    	return "";
			     
			    });
	}

	$scope.back = function(){
		$rootScope.sesion.destroyComunidad();
		$location.path("/home/profesor/comunidades");
	}
});
app.controller("asociadosCCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.opciones = {};
	$scope.opcionSelected = {};
	$scope.tiposUsuario = {};
	$scope.tipoSelected = {};
	$scope.alumnos = {};
	$scope.ayudantes = {};
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

    restFactory.getAlumnosByCorrectorComunidad($rootScope.sesion.getUser().idUsuario, $rootScope.sesion.getComunidad().idComunidad)
		  .success(function (response){
		  $scope.gridOptions1.data = response;	  	
	});

	restFactory.getAsociadosC($scope.comunidad.idComunidad)
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
	restFactory.getTUCustom()
		.success(function (response){
	     $scope.tiposUsuario = response;
		 $scope.tipoSelected = $scope.tiposUsuario[0];
		 //Obtener alumnos
		restFactory.getAllE("Alumno")
			.success(function (response){
		     $scope.alumnos = response;

			restFactory.getAllE("Ayudante")
				.success(function (response){
			     $scope.ayudantes = response;

			     if($scope.tiposUsuario[0].nombreTU == "Alumno"){
					$scope.opciones = $scope.alumnos;
				}else{
					$scope.opciones = $scope.ayudantes;
				}
			});
		});
	});
		
	$scope.change = function(){
		if($scope.tipoSelected.nombreTU == "Alumno"){
			$scope.opciones = $scope.alumnos;
			$scope.opcionSelected = {};
		}else if($scope.tipoSelected.nombreTU == "Ayudante"){
			$scope.opciones = $scope.ayudantes;
			$scope.opcionSelected = {};
		}
	}

	$scope.asociarC = function(){
		restFactory.asociar($scope.comunidad.nombreC, $scope.opcionSelected.rutU).success(function(response){
				if(response.message == "e"){
					$scope.showAlert("Usuario ya se encuentra asociado.");
				}else if(response.message == "true"){
					viewFactory.showSimpleToast("Usuario asociado, se le enviará un correo electrónico");
					restFactory.getAsociadosC($scope.comunidad.idComunidad)
						.success(function (response){
						$scope.gridOptions.data = response;
					});

				}else{
					$scope.showAlert("Error al asociar el usuario a la comunidad. Intente más tarde.");
				}
		});
	}

	$scope.sendToDes = function(item){
		$rootScope.sesion.setUserAux(item);
		$location.path("/home/profesor/verDesligar");
	}

	$scope.verInfo = function(item){
		$rootScope.sesion.setUserAux(item);
		$location.path("/home/profesor/verAsignados");
	}

	$scope.back = function(){
		$rootScope.sesion.destroyComunidad();
		$location.path("/home/profesor/comunidades");
	}
});
app.controller("infoCtrlProfe", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.usuario = $rootScope.sesion.getUserToEdit();

	$scope.back = function(){
		$rootScope.sesion.destroyUserToEdit();
		$location.path("/home/profesor/ver");
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

	$scope.desligarC = function(){

		var confirm = $mdDialog.confirm()
	          .title('Desea desligar el usuario?')
	          .textContent('El usuario será desligado del profesor')
	          .ariaLabel('Lucky day')
	          .ok('Desligar')
	          .cancel('Cancelar');
			    $mdDialog.show(confirm).then(function() {
				    restFactory.desligar($rootScope.sesion.getUser().rutU, $scope.usuario.rutU).success(function(response){
						if(response.message == "true"){
							viewFactory.showSimpleToast("Usuario desligado, se le enviará un correo electrónico");
							$rootScope.sesion.destroyUserToEdit();
							$location.path("/home/profesor/ver");
						}else{
							$scope.showAlert("Error al desligar el usuario del profesor. Intente más tarde.");
						}
					});		
			      	return "";
			    }, function() {	
			    	return "";
			     
			    });

	}
});
app.controller("desligarCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
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

	$scope.desligarC = function(){

		var confirm = $mdDialog.confirm()
	          .title('Desea desligar el usuario?')
	          .textContent('El usuario será desligado de la comunidad')
	          .ariaLabel('Lucky day')
	          .ok('Desligar')
	          .cancel('Cancelar');
			    $mdDialog.show(confirm).then(function() {
				    restFactory.desligar($rootScope.sesion.getComunidad().idComunidad, $scope.usuario.idUsuario).success(function(response){
						if(response.message == "true"){
							viewFactory.showSimpleToast("Usuario desligado, se le enviará un correo electrónico");
							$rootScope.sesion.destroyUserAux();
							$location.path("/home/profesor/verAsociadosC");
						}else{
							$scope.showAlert("Error al desligar el usuario de la comunidad. Intente más tarde.");
						}
					});	
			      	return "";
			    }, function() {	
			    	return "";
			     
			    });

	}
	$scope.back = function(){
		$rootScope.sesion.destroyUserAux();
		$location.path("/home/profesor/verAsociadosC");
	}
});
app.controller("practicasAlumnoAsignadoCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
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
		$location.path("/home/profesor/practicaPreliminar");
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
		$location.path("/home/profesor/verAsociadosC");
	}
});
/*Inicio Profesor controllers*/

/*SPRINT 3.3*/
app.controller("preliminarPracticaProfeCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.realizador = $rootScope.sesion.getUserAux();
	$scope.practica = $rootScope.sesion.getPracticaT();
	$scope.realizadorCompleto = $scope.realizador.nombreU + " " + $scope.realizador.apellidoU;
	$scope.back = function(){
		$rootScope.sesion.destroyPracticaT();
		$location.path("/home/profesor/verAsignados");
	}

	$scope.verP = function(){
		$location.path("/home/profesor/practicahome");
	}

	$scope.verCanal = function(){
		$location.path("/home/profesor/practicaCanal");
	}

	$scope.evaluar = function(){
		$location.path("/home/profesor/evaluar");
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
									$location.path("/home/profesor/verAsignados");				
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
app.controller("profesorCCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.nombreRealizador = $rootScope.sesion.getPracticaT().realizador.nombreU + " " + $rootScope.sesion.getPracticaT().realizador.apellidoU;
	$scope.mensajes = {};
	$scope.back = function(){
		$location.path("/home/profesor/practicaPreliminar");
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
app.controller("profesorPHomeCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.usuario = $rootScope.sesion.getUserAux();
	$scope.nombreRealizador = $scope.usuario.nombreU + " " + $scope.usuario.apellidoU;
	$scope.back = function(){
		$location.path("/home/profesor/practicaPreliminar");
	}
	
	$scope.verHU = function(){
		$location.path("/home/profesor/practicahu");
	}

	$scope.verTerminal = function(){
		$location.path("/moduloD/inicio");
	}

	$scope.verCasos = function(){
		$location.path("/home/profesor/practicacasoprueba");
	}

	$scope.verIncidencias = function(){
		$location.path("/home/profesor/practicaincidencias");
	}

	$scope.verPauta = function(){
		$location.path("/home/profesor/pautaE");
	}
});
app.controller("profesorPracticaHUCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/profesor/practicahome");
	}

	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
	$scope.hu = {};
	restFactory.getHU()
			.success(function(response){
				$scope.gridOptions.data = response;
	});

	$scope.verPA = function(item){
		$rootScope.sesion.setHU(item);
		$location.path("/home/profesor/practicapa");
	}	
});
app.controller("profesorPracticaPACtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/profesor/practicahu");
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
app.controller("profesorPracticaCPCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
		$location.path("/home/profesor/practicahome");
	}

	$scope.sendCPInfo = function(item){
		$rootScope.sesion.setCP(item);
		$location.path("/home/profesor/practicaCPI");
	}
});
app.controller("profesorPracticaCPICtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
		$location.path("/home/profesor/practicacasoprueba");
	}
});
app.controller("profesorPracticaIncidenciasCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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

    $scope.gridOptions1 = {
            data: [],
            urlSync: false
    };
	
	restFactory.getIncidenciasP($rootScope.sesion.getPracticaT().idPractica)
		  .success(function (response){
		  $scope.gridOptions.data = response;	  	
	});

	restFactory.getIncidenciasCP($rootScope.sesion.getPracticaT().idPractica)
		  .success(function (response){
		  	$scope.gridOptions1.data = response;	  	
	});
	

	$scope.back = function(){
		$location.path("/home/profesor/practicahome");
	}

	$scope.sendIInfo = function(item){
		$rootScope.sesion.setI(item);
		$location.path("/home/profesor/practicaII");
	}

	$scope.sendICPInfo = function(item){
		$rootScope.sesion.setICP(item);
		$location.path("/home/profesor/practicaICP");
	}
});
app.controller("profesorPracticaIECtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
		$location.path("/home/profesor/practicaincidencias");
	}
});
app.controller("profesorPracticaICPCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.incidenciacp = $rootScope.sesion.getICP();

	$scope.back = function(){
		$rootScope.sesion.destroyICP();
		$location.path("/home/profesor/practicaincidencias");
	}
});
app.controller("pautaEProfesorCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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
		$location.path("/home/profesor/practicahome");
	}

	$scope.back1 = function(){
		$location.path("/home/profesor/pautaE");
	}

	$scope.verTerminal = function(){
		$location.path("/moduloP/inicio");
	}

	$scope.verPauta = function(){
		$location.path("/home/profesor/pautaIncidencias");
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
app.controller("evaluarProfesorCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.realizador = $rootScope.sesion.getUserAux();
	$scope.practica = $rootScope.sesion.getPracticaT();
	$scope.realizadorCompleto = $scope.realizador.nombreU + " " + $scope.realizador.apellidoU;
	$scope.back = function(){
		$location.path("/home/profesor/practicaPreliminar");
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
							viewFactory.showSimpleToast("Evaluación realizada con éxito, se le enviará un correo electrónico");
							$location.path("/home/profesor/practicaPreliminar");	  	
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
/**/