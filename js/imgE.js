app.controller('imgCtrl', function ($scope, Lightbox) {

  $scope.conceptos = [
    'img/bpm/cuadrante.png',
    'img/bpm/f1.png',
    'img/bpm/f2.png',
    'img/bpm/t1.png',
    'img/bpm/t2.png',
    'img/bpm/t3.png',
    'img/bpm/t4.png'
  ];

  $scope.programador = [
    'img/bpm/programador.png',
    'img/bpm/cicloBDD.png',
    'img/programador/archivoPasos.png',
    'img/programador/cicloATDD.png',
    'img/programador/fitnesse1.png',
    'img/programador/fitnesse2.png',
    'img/programador/fitnesse3.png',
    'img/programador/cicloTDD.png',
    'img/programador/tdd1.png',
    'img/programador/tdd2.png',
    'img/programador/tdd3.png',
    'img/programador/tdd4.png',
    'img/programador/tdd5.png',
    'img/programador/tdd6.png',
    'img/programador/tdd7.png',
    'img/programador/tdd8.png',
    'img/programador/tdd9.png',
    'img/programador/tdd10.png'
  ];

  $scope.qa = [
    'img/qa/qa1.png',
    'img/qa/qa2.png',
    'img/qa/qa3.png'
  ];

  $scope.encargado = [
    'img/encargado/e1.png'
  ];

  $scope.qausuario = [
    'img/qau/qau1.png'
  ];

  $scope.instruccionesA = [
    'img/codenvy/cc1.png',
    'img/codenvy/cc2.png',
    'img/codenvy/cc3.png',
    'img/codenvy/cc2.1.png',
    'img/codenvy/cc4.png',
    'img/codenvy/cc5.png',
    'img/codenvy/cc6.png',
    'img/codenvy/a1.png',
    'img/codenvy/a2.png',
    'img/codenvy/a3.png',
    'img/codenvy/a4.png',
    'img/codenvy/a5.png',
    'img/codenvy/a6.png',
    'img/codenvy/a7.png',
    'img/codenvy/a8.png',
    'img/codenvy/a9.png',
    'img/codenvy/a10.png',
    'img/codenvy/a11.png',
    'img/codenvy/a12.png',
    'img/codenvy/a13.png',
    'img/codenvy/a14.png',
    'img/codenvy/a15.png',
    'img/codenvy/a16.png',
    'img/codenvy/a20.1.png',
    'img/codenvy/a21.png',
    'img/codenvy/a17.png',
    'img/codenvy/a18.png',
    'img/codenvy/a19.png',
    'img/codenvy/a22.png',
    'img/codenvy/a23.png',
    'img/codenvy/a24.png',
    'img/codenvy/a25.png',
    'img/codenvy/a26.png',
    'img/codenvy/a27.png',
    'img/codenvy/a28.png',
    'img/codenvy/a29.png',
    'img/codenvy/a30.png',
    'img/codenvy/a31.png'
  ];

  $scope.instruccionesC = [
    'img/codenvy/pa1.png',
    'img/codenvy/pa2.png',
    'img/codenvy/pa3.png',
    'img/codenvy/pa5.png',
    'img/codenvy/pa4.png'
  ];

  $scope.showImages = function (images, index) {
    Lightbox.openModal(images, index);
  };
});