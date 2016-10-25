app.factory("restFactory", ["$http", function($http){

	var restFactory = {};

	restFactory.login = function(email, pass){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/login/"+email+"/"+pass);
	};

	restFactory.getUserByEmail = function(email){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getUserByEmail/"+email);
	};

	restFactory.sendEmail = function(email, op){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/recuperar/"+email+"/"+op);
	};

	restFactory.editarUsuario = function(usuario){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/editarUsuario", usuario);
	};

	restFactory.activar = function(rutU){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/activarC/"+rutU);
	};

	restFactory.cerrar = function(rutU, motivo){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/cerrarC/"+rutU+"/"+motivo);
	};

	restFactory.eliminar = function(rutU){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/eliminarC/"+rutU);
	};

	restFactory.tipoUsuarios = function(){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/tipoUsuarios");
	};

	restFactory.crearUsuario = function(usuario){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/crearUsuario", usuario);
	};

	restFactory.getAllUsers = function(){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getAllUsers");
	};
	
	restFactory.getPAA = function(idP){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getPAlum/"+idP);
	};

	restFactory.getAllE = function(tipo){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getAllE/"+tipo);
	};

	restFactory.getTUCustom = function(){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getTUCustom");
	};

	restFactory.desligar = function(rutP, rutA){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/desligar/"+rutP+"/"+rutA);
	};

	restFactory.getPByAA = function(idAA){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getPByAlum/"+idAA);
	};

	//SPRINT 1.3
	restFactory.crearComunidad = function(nombreC, descripcionC, emailP){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/crearComunidad/"+nombreC+"/"+descripcionC+"/"+emailP);
	};

	restFactory.getAllComunidad = function(){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getAllComunidad");
	};

	restFactory.asociar = function(nombreC, rutA){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/asociar/"+nombreC+"/"+rutA);
	};

	restFactory.getAsociadosC = function(idC){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getAsociadosC/"+idC);
	};

	restFactory.editarComunidad = function(comunidad){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/editarC", comunidad);
	};

	restFactory.eliminarComunidad = function(comunidad){
		return $http.post("http://localhost:8080/RAPSO-web/webresources/usuario/eliminarComunidad", comunidad);
	};

	restFactory.getCByProfesor = function(idP){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getComunidadesByProfesor/"+ idP);
	};

	restFactory.getCByAA = function(idA){
		return $http.get("http://localhost:8080/RAPSO-web/webresources/usuario/getComunidadesByAA/"+ idA);
	};

	/*Módulo de práctica Sprint 3.1*/
	restFactory.loginM = function(rut, pass){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/modulo/login/"+rut+"/"+pass);
	};

	restFactory.getUserByRut = function(rut){ 
		return $http.get("http://localhost:8080/RAPSO-web/webresources/modulo/getUserByRut/"+rut);
	};

	restFactory.depositar = function(rut, monto){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/modulo/depositar/"+rut+"/"+monto);
	};

	restFactory.retirar = function(rut, monto){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/modulo/retirar/"+rut+"/"+monto);
	};

	restFactory.transferir = function(rutR, rutRE, monto){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/modulo/transferir/"+rutR+"/"+rutRE+"/"+monto);
	};

	restFactory.getOp = function(rutR){ 
		return $http.get("http://localhost:8080/RAPSO-web/webresources/modulo/getOperacion/"+rutR);
	};

	restFactory.updateC = function(rutR, tipo){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/modulo/updateEC/"+rutR+"/"+tipo);
	};
	/*Módulo de práctica*/

	/*Módulo de práctica dañado Sprint 3.2*/

	restFactory.loginD = function(rut, pass){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/moduloD/loginD/"+rut+"/"+pass);
	};

	restFactory.getUserByRutD = function(rut){ 
		return $http.get("http://localhost:8080/RAPSO-web/webresources/moduloD/getUserByRutD/"+rut);
	};

	restFactory.depositarD = function(rut, monto){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/moduloD/depositarD/"+rut+"/"+monto);
	};

	restFactory.retirarD = function(rut, monto){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/moduloD/retirarD/"+rut+"/"+monto);
	};

	restFactory.transferirD = function(rutR, rutRE, monto){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/moduloD/transferirD/"+rutR+"/"+rutRE+"/"+monto);
	};

	restFactory.getOpD = function(rutR){ 
		return $http.get("http://localhost:8080/RAPSO-web/webresources/moduloD/getOperacionD/"+rutR);
	};

	restFactory.cerrarD = function(rutR){ 
		return $http.post("http://localhost:8080/RAPSO-web/webresources/moduloD/cerrarC/"+rutR);
	};
	/*Módulo de práctica dañado*/
 
	return restFactory;
}]);