/*Inicio Administrador controllers*/
app.controller("homeCtrlAdmin", function($rootScope, $scope, $location, $http){
	$scope.usuario = $rootScope.sesion.getUser();
	$scope.editP = function(){
		$location.path("/home/administrador/editarA");
	}

	$scope.back = function(){
		$location.path("/home/administrador");
	}
});
app.controller("editarAdminCtrl", function($rootScope, $scope, $location, $http, fileUpload, restFactory, $mdDialog, $mdMedia, viewFactory, Upload){

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
		$location.path("/home/administrador/perfil");
	}

	$scope.editarP = function(){
		var file = $scope.file;
			if((($scope.pass == undefined && $scope.passC == undefined) || ($scope.pass == "" && $scope.passC == "")) && $scope.apodo == $scope.usuario.apodoU && file == undefined ){
				$scope.showAlert("No existen campos a modificar.");
				return "";
			}
			if(($scope.pass != undefined && $scope.passC != undefined) && ($scope.pass != "" && $scope.passC != "")){
				if($scope.pass != $scope.passC){
					$scope.showAlert("Contraseñas ingresadas no coinciden.");
					return "";
					}
				if($scope.pass == $scope.usuario.contrasenaU){
					$scope.showAlert("Contraseña ingresada es igual a la actual.");
					return "";
				}

				if($scope.pass.length < 3 || $scope.usuario.contrasenaU.length < 3){
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
					 Upload.upload({
				            url: 'server.php',
				            data: {file: file, 'username': $scope.usuario.rutU}
				        })
				        .then(function (resp) {
					            $scope.usuario.fotoPerfilU = $scope.photoP;
					           
								restFactory.editarUsuario($scope.usuario)
									.success(function(response){
										if(response){
											$rootScope.sesion.setUser(response);
											viewFactory.showSimpleToast("Edición efectuada, se le enviará un correo electrónico");
											$location.path("/home/administrador/perfil");
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
								$rootScope.sesion.setUser(response);
								viewFactory.showSimpleToast("Edición efectuada, se le enviará un correo electrónico");
								$location.path("/home/administrador/perfil");
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
	$scope.eliminarC = function(){
			var confirm = $mdDialog.confirm()
			          .title('Desea eliminar su cuenta?')
			          .textContent('La cuenta será eliminada')
			          .ariaLabel('Lucky day')
			          .ok('Eliminar')
			          .cancel('Cancelar');

			    $mdDialog.show(confirm).then(function() {
			    	restFactory.eliminar($scope.usuario.rutU)
			    		.success(function(response){
								if(response.message == "true"){
									viewFactory.showSimpleToast("Eliminando cuenta, se le enviará un correo electrónico");
									$rootScope.sesion.destroy();
									$location.path("/");				
								}else{
									$scope.showAlert("Error al realizar la eliminación de la cuenta intente más tarde.");
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
									$location.path("/home/administrador");		
													
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
		$location.path("/home/administrador/perfil");
	}
});
app.controller("crearAdminCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.newUsuario = {};
	$scope.passC = "";
	$scope.tiposUsuario = {};
	$scope.tipoSelected = {};
	$scope.newUsuario.estadoidEstado = new Object();
	$scope.newUsuario.tipoUsuarioidTipoUsuario = new Object();
	//Obteniendo tipos de usuarios
	restFactory.tipoUsuarios()
		.success(function (response){
	     $scope.tiposUsuario = response;
		 $scope.tipoSelected = $scope.tiposUsuario[0];
	});

	$scope.nombreTU = "";

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

	$scope.crearU = function(){

		if($scope.newUsuario.contrasenaU != $scope.passC){
			$scope.showAlert("Contraseñas ingresadas no coinciden.");
			return "";
		}else if($scope.newUsuario.contrasenaU.length < 3){
			$scope.showAlert("La contraseña debe poseer como mínimo 3 caracteres.");
			return "";
		}else{
			$scope.newUsuario.fotoPerfilU = "img/estandar.jpg";
			$scope.newUsuario.estadoidEstado.idEstado = 1;
			$scope.newUsuario.estadoidEstado.nombreE = "Abierta";
			$scope.newUsuario.tipoUsuarioidTipoUsuario.idTipoUsuario = $scope.tipoSelected.idTipoUsuario;
			$scope.newUsuario.tipoUsuarioidTipoUsuario.nombreTU = $scope.tipoSelected.nombreTU;
			restFactory.crearUsuario($scope.newUsuario)
						.success(function(response){
							if(response.message == "t"){
								viewFactory.showSimpleToast("Usuario creado, se le notificará por correo electrónico esta situación");
								restFactory.getUserByEmail($scope.newUsuario.emailU)
									.success(function (response){
										$rootScope.sesion.setUserToEdit(response);
										$location.path("/home/administrador/info");
								});
							}else if(response.message == "f"){
								$scope.showAlert("Error al crear el usuario intente más tarde.");
								return "";
							}else if(response.message == "r"){
								$scope.showAlert("El rut ingresado se encuentra registrado.");
								return "";

							}else if(response.message == "e"){
								$scope.showAlert("El e-mail ingresado se encuentra registrado.");
								return "";
							}else if(response.message == "false"){
								$scope.showAlert("Rut y e-mail ingresados se encuentran registrados.");
								return "";
							}else{
								$scope.showAlert("Se produjo un error en la creación");
								return "";
							}
					});
		}
	}
	
	$scope.back = function(){
		$location.path("/home/administrador");
	}
});
app.controller("cuentasCtrlAdmin", function($rootScope, $scope, $location, $http, restFactory){
	$scope.gridOptions = {
            data: [],
            urlSync: false
    };

	restFactory.getAllUsers()
		.success(function (response){
		$scope.gridOptions.data = response;
	});

	$scope.usuario = $rootScope.sesion.getUser();	

	$scope.sendEdicion = function(item){
		$rootScope.sesion.setUserToEdit(item);
		$location.path("/home/administrador/info");
	}

	$scope.back = function(){
		$location.path("/home/administrador");
	}
});
app.controller("infoCtrlAdmin", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.userSelected = $rootScope.sesion.getUserToEdit();

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
		$rootScope.sesion.destroyUserToEdit();
		$location.path("/home/administrador/ver");
	}

	$scope.editP = function(){
		$location.path("/home/administrador/editar");
	}

	$scope.activarC = function(){
			var confirm = $mdDialog.confirm()
	          .title('Desea activar la cuenta?')
	          .textContent('La cuenta del usuario será activada')
	          .ariaLabel('Lucky day')
	          .ok('Activar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	restFactory.activar($scope.userSelected.rutU)
							.success(function(response){
								if(response){
									$rootScope.sesion.setUserToEdit(response);
									viewFactory.showSimpleToast("Cuenta activada, se le enviará un correo electrónico");
									$scope.userSelected = $rootScope.sesion.getUserToEdit();	
									$location.path("/home/administrador/info");					
								}else{
									$scope.showAlert("Error al realizar la activación de la cuenta intente más tarde.");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });
	}
});
app.controller("editarSelectedAdmin", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.userSelected = $rootScope.sesion.getUserToEdit();
	$scope.pass = "";
	$scope.passC = "";
	$scope.fotoP = "";
	$scope.apodo = $scope.userSelected.apodoU;

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

	$scope.editar = function(){
			if((($scope.pass == undefined && $scope.passC == undefined) || ($scope.pass == "" && $scope.passC == "")) && $scope.apodo == $scope.userSelected.apodoU){
				$scope.showAlert("No existen campos a modificar.");
				return "";
			}
			if(( $scope.pass != undefined && $scope.passC != undefined) && ($scope.pass != "" && $scope.passC != "")){
				if($scope.pass != $scope.passC){
					$scope.showAlert("Contraseñas ingresadas no coinciden.");
					return "";
					}
				if($scope.pass == $scope.userSelected.contrasenaU){
					$scope.showAlert("Contraseña ingresada es igual a la actual.");
					return "";
				}
				if($scope.pass.length < 3 || $scope.userSelected.contrasenaU < 3){
					$scope.showAlert("Contraseña ingresada debe poseer mínimo 3 caracteres.");
					return "";
				}
			}

			var confirm = $mdDialog.confirm()
	          .title('Desea actualizar el perfil?')
	          .textContent('El perfil del usuario será actualizado')
	          .ariaLabel('Lucky day')
	          .ok('Actualizar')
	          .cancel('Cancelar');
			    $mdDialog.show(confirm).then(function() {
			    if(($scope.apodo != "" || $scope.apodo != undefined || $scope.apodo != null) && $scope.apodo != $scope.userSelected.apodoU){
					$scope.userSelected.apodoU = $scope.apodo;
				}
				
				if($scope.pass != undefined && $scope.passC != undefined && $scope.pass != "" && $scope.passC != "" && $scope.pass != null && $scope.passC != null){
					$scope.userSelected.contrasenaU = $scope.pass;
				}
				restFactory.editarUsuario($scope.userSelected)
						.success(function(response){
							if(response){
								if($scope.userSelected.idUsuario == $rootScope.sesion.getUser().idUsuario){;
									viewFactory.showSimpleToast("Edición efectuada, se le enviará un correo electrónico");
									$rootScope.sesion.setUserToEdit(response);
									$rootScope.sesion.setUser(response);
									$location.path("/home/administrador/info");
								}else{
									viewFactory.showSimpleToast("Edición efectuada, se le enviará un correo electrónico");
									$rootScope.sesion.setUserToEdit(response);
									$location.path("/home/administrador/info");
								}				
							
							}else{
								$scope.showAlert("Error al realizar la edición intente más tarde.");
							}
							
					});
					
			      return "";
			    }, function() {
			    	return "";
			     
			    });
	}

	$scope.cerrarC = function(){
		var motivo = $scope.motivoC;
			var confirm = $mdDialog.confirm()
	          .title('Desea cerrar la cuenta?')
	          .textContent('La cuenta del usuario será cerrada')
	          .ariaLabel('Lucky day')
	          .ok('Cerrar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	restFactory.cerrar($scope.userSelected.rutU, motivo)
							.success(function(response){
								if(response.message == "true"){
									if($scope.userSelected.idUsuario == $rootScope.sesion.getUser().idUsuario){
										$rootScope.sesion.destroyUserToEdit();
										$rootScope.sesion.destroy();
										viewFactory.showSimpleToast("Cerrando cuenta, se le enviará un correo electrónico");
										$location.path("/");
									}else{
										$rootScope.sesion.destroyUserToEdit();
										viewFactory.showSimpleToast("Cerrando cuenta, se le enviará un correo electrónico");
										$location.path("/home/administrador/ver");
									}				
								}else{
									$scope.showAlert("Error al realizar el cierre de la cuenta intente más tarde.");
								}
						});
			    	return "";
			    }, function() {
			    	return "";
			    });
	}

	$scope.eliminarC = function(){
		var confirm1 = $mdDialog.confirm()
          .title('Desea eliminar la cuenta?')
          .textContent('La cuenta del usuario será eliminada')
          .ariaLabel('Lucky day')
          .ok('Eliminar')
          .cancel('Cancelar');
		    $mdDialog.show(confirm1).then(function() {
		    
		      restFactory.eliminar($scope.userSelected.rutU)
							.success(function(response){
								if(response.message == "t"){

									if($scope.userSelected.idUsuario == $rootScope.sesion.getUser().idUsuario){
										$rootScope.sesion.destroyUserToEdit();
										$rootScope.sesion.destroy();
										viewFactory.showSimpleToast("Eliminando cuenta, se le enviará un correo electrónico");
										$location.path("/");
									}else{
										$rootScope.sesion.destroyUserToEdit();
										viewFactory.showSimpleToast("Eliminando cuenta, se le enviará un correo electrónico");
										$location.path("/home/administrador/ver");	
									}							
								}else{
									$scope.showAlert("Error al realizar la eliminación de la cuenta intente más tarde.");
								}
						});
					
		      return "";
		    }, function() {
		      return "";
		    });
	}


	$scope.back = function(){
		$location.path("/home/administrador/info");
	}

	$scope.cancelar = function(){
		$rootScope.sesion.destroyUserToEdit();
		$location.path("/home/administrador/ver");
	}
});
app.controller("comunidadesAdminCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	
	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
	
	restFactory.getAllComunidad()
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

	$scope.usuario = $rootScope.sesion.getUser();
	$scope.nombreCC = "";
	$scope.descripcionCC = "";
	$scope.profesores = {};
	$scope.profesorSelected = {};
	restFactory.getAllE("Profesor")
		.success(function (response){
		$scope.profesores = response;
	});

	$scope.crearC = function(){
		restFactory.crearComunidad($scope.nombreCC, $scope.descripcionCC, $scope.profesorSelected.emailU)
		  .success(function (response){
		  	if(response.message == "t"){
		  		viewFactory.showSimpleToast("Comunidad creada, se le enviará un correo electrónico al Profesor");
		  		restFactory.getAllComunidad()
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
		$location.path("/home/administrador/editarC");
	}

	$scope.sendSupervision = function(item){
		$rootScope.sesion.setComunidad(item);
		$location.path("/home/administrador/verAsociadosC");
	}
	

	$scope.back = function(){
		$location.path("/home/administrador");
	}
});
app.controller("asociadosCAdminCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
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
		$location.path("/home/administrador/verDesligar");
	}

	$scope.back = function(){
		$rootScope.sesion.destroyComunidad();
		$location.path("/home/administrador/comunidades");
	}
});
app.controller("desligarAdminCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
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
							$location.path("/home/administrador/verAsociadosC");
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
		$location.path("/home/administrador/verAsociadosC");
	}
});
app.controller("editarCAdminCtrl", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
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
				    		$location.path("/home/administrador/comunidades");
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
				    		$location.path("/home/administrador/comunidades");
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
		$location.path("/home/administrador/comunidades");
	}
});
/*Fin Administrador controllers*/