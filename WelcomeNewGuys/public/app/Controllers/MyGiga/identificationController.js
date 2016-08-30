
'use strict';

app.controller("identificationController",
    function (askLoginService, $scope, $stateParams, dataService, $rootScope, $state) {
        
    $scope.gotoLogin = function () {
        askLoginService.transmitLoginInfo($scope.userId, $scope.password);
    }
    
});
