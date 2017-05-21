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

	$scope.configurar = function(){
		$location.path("/home/profesor/configurarPT");
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
							$location.path("/home/profesor/practicaPreliminar");
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
									$rootScope.sesion.destroyPracticaT1();
									$rootScope.sesion.destroyPracticaT2();
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
			$scope.mensaje1 = new Object();
			$scope.mensaje1.idP = $rootScope.sesion.practicaT.idPractica;
			$scope.mensaje1.mensaje = $scope.mensaje;
			$scope.mensaje1.tipo = "c";
			restFactory.crearMensaje($scope.mensaje1)
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

	$scope.reparacion = function(){
		$location.path("/home/profesor/practica2");
	}
});
app.controller("profesorPracticaHUCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.back = function(){
		$location.path("/home/profesor/practicahome");
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
app.controller("profesorPracticaICPCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory, $timeout, $mdSidenav){
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

	$scope.evaluarP1 = function(){

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
										$location.path("/home/profesor/practicaPreliminar");
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
	          .title('Desea evaluar la práctica')
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
										$location.path("/home/profesor/practicaPreliminar");
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
/*SPRINT 3.3*/

/*PRÁCTICA 2*/
app.controller("profesorPractica2Ctrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.back = function(){
		$location.path("/home/profesor/practicahome");
	}

	$scope.back1 = function(){
		$location.path("/home/profesor/practica2");
	}

	$scope.instrucciones = function(){
		$location.path("/home/profesor/practica2Instrucciones");
	}

	$scope.instruccionesC = function(){
		$location.path("/home/profesor/practica2InstruccionesC");
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
app.controller("configurarProfeCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.comunidad = $rootScope.sesion.getComunidad();
	$scope.profe = $scope.comunidad.profesorC.nombreU +" "+ $scope.comunidad.profesorC.apellidoU;

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

	$scope.configurar = function(){

		var confirm = $mdDialog.confirm()
	          .title('Desea configurar la nota mínima?')
	          .textContent('La nota mínima será configurada')
	          .ariaLabel('Lucky day')
	          .ok('Configurar')
	          .cancel('Cancelar');
			    $mdDialog.show(confirm).then(function() {
			    	if($scope.notaM >= 2147483647 || $scope.notaM <= -2147483647){
			$scope.showAlert("Valores no soportados por el sistema");
			return "";
		}else if(Math.ceil($scope.notaM) != $scope.notaM){
			$scope.showAlert("Formato de nota incorrecto, Ej: 55");
			return "";
		}else{

			restFactory.configurar($scope.comunidad.idComunidad, $scope.notaM)
				.success(function (response){
				if(response.message == "true"){
					restFactory.getComunidad($scope.comunidad.idComunidad)
						.success(function(response1){
							viewFactory.showSimpleToast("Nota configurada con éxito, se enviará un correo electrónico a los ayudantes");
							$rootScope.sesion.setComunidad(response1);	
							$location.path("/home/profesor/configurarPT");							
						});
					
				}else if(response.message == "e"){
					$scope.showAlert("La nota no puede ser superior a 70");	
				}else if(response.message == "i"){
					$scope.showAlert("La nota no puede ser inferior a 10");	
				}else if(response.message == "eq"){
					$scope.showAlert("La nota es igual a la actual");	
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

	$scope.back = function(){
		$location.path("/home/profesor/verAsociadosC");
	}
});
/*SPRINT 3.5*/