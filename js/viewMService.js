app.factory("viewFactory", ["$mdDialog", "$mdToast", function($mdDialog, $mdToast){

    var viewFactory = {};

    var toastPosition = { 
        bottom: true,
        top: false,
        left: false,
        right: true,
        center: true
    };

    viewFactory.getToastPosition = function() {
        return Object.keys(toastPosition)
            .filter(function(pos) { return toastPosition[pos]; })
            .join(' ');
    };

    viewFactory.showSimpleToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .action("ok")
                .highlightAction(true)
                .highlightClass("md-accent")
                .position(viewFactory.getToastPosition())
                .hideDelay(3000)
        );
    };

    return viewFactory;

 }]);