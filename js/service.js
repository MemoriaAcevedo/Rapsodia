app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            console.log("Imagen guardada");
        })
        .error(function(){
            console.log("Error al guardar la imagen");
        });
    }
}]);

app.service('sesion',['$window',function($window) {

    this.user = JSON.parse($window.localStorage.getItem('sesion.user'));
    this.userToEdit  = JSON.parse($window.localStorage.getItem('sesion.userToEdit'));
    this.userAux  = JSON.parse($window.localStorage.getItem('sesion.userAux'));
    this.comunidad  = JSON.parse($window.localStorage.getItem('sesion.comunidad'));
    this.userTerminal  = JSON.parse($window.localStorage.getItem('sesion.userTerminal'));
    this.userTerminalD  = JSON.parse($window.localStorage.getItem('sesion.userTerminalD'));
    this.practicaT = JSON.parse($window.localStorage.getItem('sesion.practicaT'));
    this.practicaT1 = JSON.parse($window.localStorage.getItem('sesion.practicaT1'));
    this.practicaT2 = JSON.parse($window.localStorage.getItem('sesion.practicaT2'));
    this.iCP = JSON.parse($window.localStorage.getItem('sesion.iCP'));
    this.i = JSON.parse($window.localStorage.getItem('sesion.i'));
    this.cp = JSON.parse($window.localStorage.getItem('sesion.cp'));                        
    //GETS
    this.getUser = function(){
        return this.user;
    };

    this.getUserToEdit = function(){
        return this.userToEdit;
    };

    this.getUserAux = function(){
        return this.userAux;
    };

    this.getComunidad = function(){
        return this.comunidad;
    };

    this.getUserTerminal = function(){
        return this.userTerminal;
    };

    this.getUserTerminalD = function(){
        return this.userTerminalD;
    };

    this.getPracticaT = function(){
        return this.practicaT;
    };

    this.getPracticaT1 = function(){
        return this.practicaT1;
    };

    this.getPracticaT2 = function(){
        return this.practicaT2;
    };

    this.getICP = function(){
        return this.iCP;
    };

    this.getI = function(){
        return this.i;
    };

    this.getCP = function(){
        return this.cp;
    };


    //SETS
    this.setUser = function(user){
        this.user = user;
        $window.localStorage.setItem('sesion.user', JSON.stringify(user));
        return this;
    };

    this.setUserToEdit = function(user1){
        this.userToEdit = user1;
        $window.localStorage.setItem('sesion.userToEdit', JSON.stringify(user1));
        return this;
    };

    this.setUserAux = function(user2){
        this.userAux = user2;
        $window.localStorage.setItem('sesion.userAux', JSON.stringify(user2));
        return this;
    };

    this.setComunidad = function(comunidad){
        this.comunidad = comunidad;
        $window.localStorage.setItem('sesion.comunidad', JSON.stringify(comunidad));
        return this;
    };

    this.setUserTerminal = function(userT){
        this.userTerminal = userT;
        $window.localStorage.setItem('sesion.userTerminal', JSON.stringify(userT));
        return this;
    };

    this.setUserTerminalD = function(userTD){
        this.userTerminalD = userTD;
        $window.localStorage.setItem('sesion.userTerminalD', JSON.stringify(userTD));
        return this;
    };

    this.setPracticaT = function(practica){
        this.practicaT = practica;
        $window.localStorage.setItem('sesion.practicaT', JSON.stringify(practica));
        return this;
    };

    this.setPracticaT1 = function(practica1){
        this.practicaT1 = practica1;
        $window.localStorage.setItem('sesion.practicaT1', JSON.stringify(practica1));
        return this;
    };

    this.setPracticaT2 = function(practica2){
        this.practicaT2 = practica2;
        $window.localStorage.setItem('sesion.practicaT2', JSON.stringify(practica2));
        return this;
    };

    this.setICP= function(incidenciacp){
        this.iCP = incidenciacp;
        $window.localStorage.setItem('sesion.iCP', JSON.stringify(incidenciacp));
        return this;
    };

    this.setI= function(incidencia){
        this.i = incidencia;
        $window.localStorage.setItem('sesion.i', JSON.stringify(incidencia));
        return this;
    };

    this.setCP= function(cp){
        this.cp = cp;
        $window.localStorage.setItem('sesion.cp', JSON.stringify(cp));
        return this;
    };


    //DESTROY

    this.destroy = function destroy(){
        this.setUser(null);
    };

    this.destroyUserToEdit = function destroyUserToEdit(){
        this.setUserToEdit(null);
    };

    this.destroyUserAux = function destroyUserAux(){
        this.setUserAux(null);
    };

    this.destroyComunidad = function destroyComunidad(){
        this.setComunidad(null);
    };

    this.destroyUserTerminal = function destroyUserTerminal(){
        this.setUserTerminal(null);
    };

    this.destroyUserTerminalD = function destroyUserTerminalD(){
        this.setUserTerminalD(null);
    };

    this.destroyPracticaT = function destroyPracticaT(){
        this.setPracticaT(null);
    };

    this.destroyPracticaT1 = function destroyPracticaT1(){
        this.setPracticaT1(null);
    };

    this.destroyPracticaT2 = function destroyPracticaT2(){
        this.setPracticaT2(null);
    };

    this.destroyICP = function destroyICP(){
        this.setICP(null);
    };

    this.destroyI = function destroyI(){
        this.setI(null);
    };

    this.destroyCP = function destroyCP(){
        this.setCP(null);
    };
 }]);

app.service('auth',['$http', 'sesion', '$location', function($http, sesion, $location) {
    
    this.isLoggedIn = function isLoggedIn(){
      return sesion.getUser() !== null;
    };

    this.isProfesor = function isProfesor(){
        return sesion.getUser().tipoUsuarioidTipoUsuario.nombreTU == 'Profesor';
    };

    this.isAdmin = function isAdmin(){
        return sesion.getUser().rutU == '15129921-0';
    }

     this.isAdminE = function isAdminE(){
        return sesion.getUserToEdit().rutU == '15129921-0';
    }

    this.isAdministrador = function isAdministrador(){
        return sesion.getUser().tipoUsuarioidTipoUsuario.nombreTU == 'Administrador';
    }

    this.isAlumnoAyudante = function isAlumnoAyudante(){
        return  sesion.getUser().tipoUsuarioidTipoUsuario.nombreTU == 'Alumno' ||  sesion.getUser().tipoUsuarioidTipoUsuario.nombreTU == 'Ayudante';
    };

    this.isCerrada = function isCerrada(){
        return  sesion.getUser().estadoidEstado.nombreE == 'Cerrada';
    };

    this.isAbierta = function isAbierta(){
        return  sesion.getUser().estadoidEstado.nombreE == 'Abierta';
    };

    this.isUserToEdit = function isUserToEdit(){
         return sesion.getUserToEdit() !== null;
    }

    this.isUserAux = function isUserAux(){
         return sesion.getUserAux() !== null;
    }

     this.isComunidad= function isComunidad(){
         return sesion.getComunidad() !== null;
    }

    //Modulo de práctica
    this.isActive = function isActive(){
      return sesion.getUserTerminal().estadoC == 1;
    };

    this.isActiveD = function isActiveD(){
      return sesion.getUserTerminalD().estadoC == 1;
    };

    this.isLogged = function isLogged(){
      return sesion.getUserTerminal() !== null;
    };

    this.isLoggedD = function isLoggedD(){
      return sesion.getUserTerminalD() !== null;
    };
    //Modulo de práctica

 }]);