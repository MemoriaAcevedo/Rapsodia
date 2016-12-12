

/*Inicio módulo práctico controllers*/
app.controller("loginCtrlM", function($rootScope, $scope, $location, $http, restFactory, viewFactory){
	$scope.back = function(){
		$location.path("/home/alumno/pautaE");
	}

	$scope.back1 = function(){
		$location.path("/home/ayudante/pautaE");
	}

	$scope.back2 = function(){
		$location.path("/home/profesor/pautaE");
	}


	$scope.loginM = function(){

		restFactory.test($scope.rut, $scope.pass)
	        .success(function (response) {
	            var resultado = response.message;
	            if(resultado != "false" &&  resultado != "i"){
	               restFactory.getUserByRut($scope.rut)	                    	
					    .success(function (response) {
					    	$rootScope.sesion.setUserTerminal(response);
					        $location.path(resultado);
					});
	            }else{
	                if(resultado == 'i'){
	                   viewFactory.showSimpleToast("Rut o contraseña incorrecta");
	                }else{
	                	viewFactory.showSimpleToast("Cuenta inexistente");
	                }
	             }
	        });
	}

		/*restFactory.loginM($scope.rut, $scope.pass)
	        .success(function (response) {
	            var resultado = response.message;
	            if(resultado != "false" &&  resultado != "i"){
	               restFactory.getUserByRut($scope.rut)	                    	
					    .success(function (response) {
					    	$rootScope.sesion.setUserTerminal(response);
					        $location.path(resultado);
					});
	            }else{
	                if(resultado == 'i'){
	                   viewFactory.showSimpleToast("Rut o contraseña incorrecta");
	                }else{
	                	viewFactory.showSimpleToast("Cuenta inexistente");
	                }
	             }
	        });
	}*/
});

app.controller("homeCtrlM", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.nombreM = $rootScope.sesion.getUserTerminal().idU.nombreU+" "+$rootScope.sesion.getUserTerminal().idU.apellidoU;

	$scope.depositarM = function(){
		$location.path("/moduloP/deposito");
	}

	$scope.retirarM = function(){
		$location.path("/moduloP/retiro");
	}

	$scope.transferirM = function(){
		$location.path("/moduloP/transferir");
	}

	$scope.historialM = function(){
		$location.path("/moduloP/historial");
	}

	$scope.back = function(){
		$location.path("/moduloP/home")
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

	$scope.depositar = function(){
		if($scope.montoD >= 2147483647 || $scope.montoD <= -2147483647){
			$scope.showAlert("Montos no soportados por el sistema");
			return "";
		}else if(Math.ceil($scope.montoD) != $scope.montoD){
			$scope.showAlert("Formato de monto incorrecto, Ej: 5000");
			return "";
		}

		restFactory.depositar($rootScope.sesion.getUserTerminal().idU.rutU, $scope.montoD)
	        .success(function (response) {
	        	if(response.message == "true"){
	        		restFactory.getUserByRut($rootScope.sesion.getUserTerminal().idU.rutU)	                    	
					    .success(function (response) {
					        $rootScope.sesion.setUserTerminal(response);
					        viewFactory.showSimpleToast("Depósito realizado con éxito");
					});
	        		
	        	}else if(response.message == "e"){
	        		$scope.showAlert("No se puede depositar ya que el valor máximo soportado es de $1000000, hable con su ejecutivo de cuentas");
	        	}else if(response.message == "ex"){
	        		$scope.showAlert("El monto no puede exceder los $1000000, hable con su ejecutivo de cuentas");
	        	}else if(response.message == "n"){
	        		$scope.showAlert("El monto no puede ser menor o igual a $0");
	        	}else{
	        		$scope.showAlert("Error al realizar el deposito");
	        	}	
	        });
	}

	$scope.retirar = function(){
		if($scope.montoD >= 2147483647 || $scope.montoD <= -2147483647){
			$scope.showAlert("Montos no soportados por el sistema");
			return "";
		}else if(Math.ceil($scope.montoD) != $scope.montoD){
			$scope.showAlert("Formato de monto incorrecto, Ej: 5000");
			return "";
		}
		restFactory.retirar($rootScope.sesion.getUserTerminal().idU.rutU, $scope.montoD)
	        .success(function (response) {
	        	if(response.message == "true"){
	        		restFactory.getUserByRut($rootScope.sesion.getUserTerminal().idU.rutU)	                    	
					    .success(function (response) {
					        $rootScope.sesion.setUserTerminal(response);
					        viewFactory.showSimpleToast("Retiro realizado con éxito");
					});
	        		
	        	}else if(response.message == "e"){
	        		$scope.showAlert("El monto ingresado es mayor al saldo disponible. Para realizar la operación hable con su ejecutivo de cuentas");
	        	}else if(response.message == "ex"){
	        		$scope.showAlert("El monto no puede exceder los $1000000, hable con su ejecutivo de cuentas");
	        	}else if(response.message == "n"){
	        		$scope.showAlert("El monto no puede ser menor o igual a $0");
	        	}else{
	        		$scope.showAlert("Error al realizar el deposito");
	        	}	
	        });
	}

	$scope.transferir1 = function(){
		if($scope.montoD >= 2147483647 || $scope.montoD <= -2147483647){
			$scope.showAlert("Montos no soportados por el sistema");
			return "";
		}else if(Math.ceil($scope.montoD) != $scope.montoD){
			$scope.showAlert("Formato de monto incorrecto, Ej: 5000");
			return "";
		}
		restFactory.transferir($rootScope.sesion.getUserTerminal().idU.rutU, $scope.rutT, $scope.montoD)
	        .success(function (response) {
	        	if(response.message == "true"){
	        		restFactory.getUserByRut($rootScope.sesion.getUserTerminal().idU.rutU)	                    	
					    .success(function (response) {
					        $rootScope.sesion.setUserTerminal(response);
					        viewFactory.showSimpleToast("Transferencia realizada con éxito");
					});
	        		
	        	}else if(response.message == "e"){
	        		$scope.showAlert("El monto a transferir es mayor al saldo disponible");
	        	}else if(response.message == "c"){
	        		$scope.showAlert("La cuenta del usuario a transferir no se encuentra activa");
	        	}else if(response.message == "r"){
	        		$scope.showAlert("Rut ingresado debe ser distinto al de su cuenta");
	        	}else if(response.message == "i"){
	        		$scope.showAlert("No se puede transferir ya que el valor máximo soportado es de $1000000, hable con su ejecutivo de cuentas");
	        	}else if(response.message == "ex"){
	        		$scope.showAlert("El monto no puede exceder los $1000000, hable con su ejecutivo de cuentas");
	        	}else if(response.message == "n"){
	        		$scope.showAlert("El monto no puede ser menor o igual a $0");
	        	}else if(response.message == "f"){
	        		$scope.showAlert("La cuenta del usuario a transferir no existe");
	        	}else{
	        		$scope.showAlert("Error al realizar el deposito");
	        	}	
	        });
	}
});

app.controller("historialCtrlM", function($rootScope, $scope, $location, $http, restFactory, viewFactory){

	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
	
	restFactory.getOp($rootScope.sesion.getUserTerminal().idU.rutU)
		  .success(function (response){
		  	$scope.gridOptions.data = response;	  	
		});


	$scope.back = function(){
		$location.path("/moduloP/home")
	}	
});

app.controller("configCtrlM", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.estado = "";
	if($rootScope.sesion.getUserTerminal().estadoC == true){
		$scope.estado = "Activa";
	}else{
		$scope.estado = "Cerrada";
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

	$scope.back = function(){
		$location.path("/moduloP/home")
	}

	$scope.cerrarM = function(){
		var confirm = $mdDialog.confirm()
	          .title('Desea cerrar su cuenta?')
	          .textContent('Su cuenta será cerrada')
	          .ariaLabel('Lucky day')
	          .ok('Cerrar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	
					restFactory.updateC($rootScope.sesion.getUserTerminal().idU.rutU, "c")
					  .success(function (response){
					  	if(response.message == "true"){
							$rootScope.sesion.destroyUserTerminal();
							$location.path("/moduloP/inicio");
							viewFactory.showSimpleToast("Cierre realizado con éxito");
				        		
				        }else{
				        	$scope.showAlert("Error al realizar el cierre, intente más tarde");
				        }		  	
					});
			    	return "";
			    }, function() {
			    	return "";
			    });
	}

	$scope.activarM = function(){
		var confirm = $mdDialog.confirm()
	          .title('Desea activar su cuenta?')
	          .textContent('Su cuenta será activada')
	          .ariaLabel('Lucky day')
	          .ok('Activar')
	          .cancel('Cancelar');

	          $mdDialog.show(confirm).then(function() {
			    	
					restFactory.updateC($rootScope.sesion.getUserTerminal().idU.rutU, "a")
					  .success(function (response){
					  	if(response.message == "true"){
					  		restFactory.getUserByRut($rootScope.sesion.getUserTerminal().idU.rutU)	                    	
							    .success(function (res) {
							        $rootScope.sesion.setUserTerminal(res);
							        $location.path("/moduloP/home");
							        viewFactory.showSimpleToast("Activación realizada con éxito");
							});
				        }else{
				        	$scope.showAlert("Error al realizar la activación, intente más tarde");
				        }		  	
					});
			    	return "";
			    }, function() {
			    	return "";
			    });
	}
});
/*Fin módulo práctico controllers*/

/*Inicio módulo práctico dañado controllers*/
app.controller("loginCtrlD", function($rootScope, $scope, $location, $http, restFactory, viewFactory){

	$scope.loginD = function(){
		restFactory.loginD($scope.rut, $scope.pass)
	        .success(function (response) {
	            var resultado = response.message;
	            if(resultado != "false"){
	               restFactory.getUserByRutD($scope.rut)	                    	
					    .success(function (response) {
					        $rootScope.sesion.setUserTerminalD(response);
					        $location.path(resultado);
					});
	            }
	        });
	}

	$scope.back = function(){
		$location.path("/home/alumno/practicahome");
	}

	$scope.back1 = function(){
		$location.path("/home/ayudante/practicahome");
	}

	$scope.back2 = function(){
		$location.path("/home/profesor/practicahome");
	}
});
app.controller("homeCtrlD", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){

	$scope.nombreD = $rootScope.sesion.getUserTerminalD().idU.nombreU+" "+$rootScope.sesion.getUserTerminalD().idU.apellidoU;

	$scope.depositarDD = function(){
		$location.path("/moduloD/deposito");
	}

	$scope.retirarDD = function(){
		$location.path("/moduloD/retiro");
	}

	$scope.transferirDD = function(){
		$location.path("/moduloD/transferir");
	}

	$scope.historialDD = function(){
		$location.path("/moduloD/historial");
	}

	$scope.back = function(){
		$location.path("/moduloD/home")
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

	$scope.depositarD = function(){

		restFactory.depositarD($rootScope.sesion.getUserTerminalD().idU.rutU, $scope.montoD)
	        .success(function (response) {
	        	if(response.message == "true"){
	        		restFactory.getUserByRutD($rootScope.sesion.getUserTerminalD().idU.rutU)	                    	
					    .success(function (response) {
					        $rootScope.sesion.setUserTerminalD(response);
					});
	        	}
	        });
	}

	$scope.retirarD = function(){
		restFactory.retirarD($rootScope.sesion.getUserTerminalD().idU.rutU, $scope.montoD)
	        .success(function (response) {
	        	if(response.message == "true"){
	        		restFactory.getUserByRutD($rootScope.sesion.getUserTerminalD().idU.rutU)	                    	
					    .success(function (response) {
					        $rootScope.sesion.setUserTerminalD(response);
					});
	        	}
	        });
	}

	$scope.transferirD = function(){
		restFactory.transferirD($rootScope.sesion.getUserTerminalD().idU.rutU, $scope.rutT, $scope.montoD)
	        .success(function (response) {
	        	if(response.message == "true"){
	        		restFactory.getUserByRutD($rootScope.sesion.getUserTerminalD().idU.rutU)	                    	
					    .success(function (response) {
					        $rootScope.sesion.setUserTerminalD(response);
					});
	        	}
	        });
	}
});
app.controller("historialCtrlD", function($rootScope, $scope, $location, $http, restFactory, viewFactory){

	$scope.gridOptions = {
            data: [],
            urlSync: false
    };
	
	restFactory.getOpD($rootScope.sesion.getUserTerminalD().idU.rutU)
		  .success(function (response){
		  	$scope.gridOptions.data = response;	  	
		});
});
app.controller("configCtrlD", function($rootScope, $scope, $location, $http, restFactory, $mdDialog, viewFactory){
	$scope.estado = "";
	if($rootScope.sesion.getUserTerminalD().estadoC == true){
		$scope.estado = "Activa";
	}else{
		$scope.estado = "Cerrada";
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

	$scope.back = function(){
		$location.path("/moduloD/home")
	}

	$scope.cerrarD = function(){
		var confirm = $mdDialog.confirm()
	          .title('Desea cerrar su cuenta?')
	          .textContent('Su cuenta será activada')
	          .ariaLabel('Lucky day')
	          .ok('Cancelar')
	          .cancel('Activar');

	          $mdDialog.show(confirm).then(function() {
			    	
					restFactory.cerrarD($rootScope.sesion.getUserTerminalD().idU.rutU)
					  .success(function (response){
					  	if(response.message == "true"){
							$rootScope.sesion.destroyUserTerminalD();
							$location.path("/moduloD/inicio");				        		
				        }	  	
					});
			    	return "";
			    }, function() {
			    	return "";
			    });
	}
});
/*Fin módulo práctico dañado controllers*/