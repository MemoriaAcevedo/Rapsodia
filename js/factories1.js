app.factory("restFactory", ["$http", function($http){

	var restFactory = {};

	restFactory.login = function(email, pass){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/login/"+email+"/"+pass);
	};

	restFactory.getUserByEmail = function(email){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getUserByEmail/"+email);
	};

	restFactory.sendEmail = function(email, op){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/recuperar/"+email+"/"+op);
	};

	restFactory.editarUsuario = function(usuario){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/editarUsuario", usuario);
	};

	restFactory.activar = function(rutU){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/activarC/"+rutU);
	};

	restFactory.cerrar = function(rutU, motivo){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/cerrarC/"+rutU+"/"+motivo);
	};

	restFactory.eliminar = function(rutU){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/eliminarC/"+rutU);
	};

	restFactory.tipoUsuarios = function(){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/tipoUsuarios");
	};

	restFactory.crearUsuario = function(usuario){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/crearUsuario", usuario);
	};

	restFactory.getAllUsers = function(){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getAllUsers");
	};
	
	restFactory.getPAA = function(idP){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getPAlum/"+idP);
	};

	restFactory.getAllE = function(tipo){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getAllE/"+tipo);
	};

	restFactory.getTUCustom = function(){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getTUCustom");
	};

	restFactory.desligar = function(rutP, rutA){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/desligar/"+rutP+"/"+rutA);
	};

	restFactory.getPByAA = function(idAA){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getPByAlum/"+idAA);
	};

	//SPRINT 1.3
	restFactory.crearComunidad = function(nombreC, descripcionC, emailP){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/crearComunidad/"+nombreC+"/"+descripcionC+"/"+emailP);
	};

	restFactory.getAllComunidad = function(){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getAllComunidad");
	};

	restFactory.asociar = function(nombreC, rutA){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/asociar/"+nombreC+"/"+rutA);
	};

	restFactory.getAsociadosC = function(idC){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getAsociadosC/"+idC);
	};

	restFactory.editarComunidad = function(comunidad){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/editarC", comunidad);
	};

	restFactory.eliminarComunidad = function(comunidad){
		return $http.post("http://localhost:8080/MockRapso-war/webresources/usuario/eliminarComunidad", comunidad);
	};

	restFactory.getCByProfesor = function(idP){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getComunidadesByProfesor/"+ idP);
	};

	restFactory.getCByAA = function(idA){
		return $http.get("http://localhost:8080/MockRapso-war/webresources/usuario/getComunidadesByAA/"+ idA);
	};

	/*Módulo de práctica Sprint 3.1*/
	restFactory.loginM = function(rut, pass){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/modulo/login/"+rut+"/"+pass);
	};

	restFactory.getUserByRut = function(rut){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/modulo/getUserByRut/"+rut);
	};

	restFactory.depositar = function(rut, monto){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/modulo/depositar/"+rut+"/"+monto);
	};

	restFactory.retirar = function(rut, monto){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/modulo/retirar/"+rut+"/"+monto);
	};

	restFactory.transferir = function(rutR, rutRE, monto){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/modulo/transferir/"+rutR+"/"+rutRE+"/"+monto);
	};

	restFactory.getOp = function(rutR){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/modulo/getOperacion/"+rutR);
	};

	restFactory.updateC = function(rutR, tipo){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/modulo/updateEC/"+rutR+"/"+tipo);
	};
	/*Módulo de práctica*/

	/*Módulo de práctica dañado Sprint 3.2*/

	restFactory.loginD = function(rut, pass){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/moduloD/loginD/"+rut+"/"+pass);
	};

	restFactory.getUserByRutD = function(rut){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/moduloD/getUserByRutD/"+rut);
	};

	restFactory.depositarD = function(rut, monto){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/moduloD/depositarD/"+rut+"/"+monto);
	};

	restFactory.retirarD = function(rut, monto){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/moduloD/retirarD/"+rut+"/"+monto);
	};

	restFactory.transferirD = function(rutR, rutRE, monto){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/moduloD/transferirD/"+rutR+"/"+rutRE+"/"+monto);
	};

	restFactory.getOpD = function(rutR){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/moduloD/getOperacionD/"+rutR);
	};

	restFactory.cerrarD = function(rutR){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/moduloD/cerrarC/"+rutR);
	};
	/*Módulo de práctica dañado*/

	//Sprint 3.3
	restFactory.crearP = function(rutR, idC){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/crearP/"+rutR+"/"+idC);
	};

	restFactory.getPracticasByAlumnoComunidad = function(idU, idC){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getPracticasByAlumnoComunidad/"+idU+"/"+idC);
	};

	restFactory.getPById = function(idP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getP/"+idP);
	};

	restFactory.getPracticaByIdentificadorComunidad = function(idP, idC){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getPracticaByIdentificadorComunidad/"+idP+"/"+idC);
	};

	restFactory.getPracticasByAlumnoCorrectorComunidad = function(idA, idCorrector, idC){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getPracticasByAlumnoCorrectorComunidad/"+idA+"/"+idCorrector+"/"+idC);
	};

	restFactory.eliminarP = function(idP){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/eliminarP/"+idP);
	};

	restFactory.crearIncidencia = function(incidencia){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/crearIncidencia", incidencia);
	};

	restFactory.crearIncidenciacp = function(incidenciacp){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/crearIncidenciacp", incidenciacp);
	};

	restFactory.getIncidenciasP = function(idP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getIncidenciasP/"+idP);
	};

	restFactory.getIncidenciasCP = function(idP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getIncidenciasCP/"+idP);
	};

	restFactory.getCasosP = function(idP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getCasosP/"+idP);
	};

	restFactory.getEstadoi = function(){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getEstadoI");
	};

	restFactory.editarIncidencia = function(incidencia){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/editarIncidencia", incidencia);
	};

	restFactory.eliminarIncidencia = function(idI){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/eliminarIncidencia/"+ idI);
	};

	restFactory.editarIncidenciacp = function(incidenciacp){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/editarIncidenciacp", incidenciacp);
	};

	restFactory.eliminarIncidenciacp = function(idI){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/eliminarIncidenciacp/"+ idI);
	};

	restFactory.getHU = function(){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getHU");
	};

	restFactory.getEstadoCP = function(){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getEstadoCP");
	};

	restFactory.crearCP = function(cp){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/crearCP", cp);
	};

	restFactory.getCPByPractica = function(idP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getCPByPractica/"+idP);
	};

	restFactory.getIByCP = function(idC){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getIByCP/"+idC);
	};

	restFactory.editarCP = function(cp){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/editarCP", cp);
	};

	restFactory.eliminarCP = function(idC){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/eliminarCP/"+idC);
	};

	restFactory.correccionP = function(idP){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/correccionP/"+idP);
	};

	restFactory.getMensajesP = function(idP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getMensajesP/"+idP);
	};

	restFactory.crearMensaje = function(idP, mensaje, tipo){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/crearMensaje/"+idP+"/"+mensaje+"/"+tipo);
	};

	restFactory.getAlumnosByCorrectorComunidad = function(idC, idComunidad){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getAlumnosByCorrectorComunidad/"+idC+"/"+idComunidad);
	};

	restFactory.evaluarP = function(idP, nota, obs){ 
		return $http.post("http://localhost:8080/MockRapso-war/webresources/practicaT/evaluarP/"+idP+"/"+nota+"/"+obs);
	};

	restFactory.getPA = function(idHU){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getPA/"+idHU);
	};

	restFactory.getPAS = function(){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getPAS");
	};

	restFactory.getCasoPrueba = function(idCP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getCasoPrueba/"+idCP);
	};

	restFactory.getIncidencia = function(idI){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getIncidencia/"+idI);
	};

	restFactory.getIncidenciacp = function(idICP){ 
		return $http.get("http://localhost:8080/MockRapso-war/webresources/practicaT/getIncidenciacp/"+idICP);
	};

	//Sprint 3.3
 
	return restFactory;
}]);
