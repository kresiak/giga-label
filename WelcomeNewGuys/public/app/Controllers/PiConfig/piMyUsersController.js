'use strict';

app.controller("piMyUsersController",
    function (askLoginService, $scope, $stateParams, dataService, $rootScope, $state, $q) {

    $scope.isLoaded = false;
    
    if (!$rootScope.pi) {
        askLoginService.setOnGotInfoCallback(function (user, pwd) {
            dataService.crudGetRecordById('PIs', user).then(
                function (response) {
                    if (response.data) {
                        $rootScope.pi = response.data;
                        $state.go('piMyUsers');
                    }
                
                }
            );
        });
        $state.go('identification');
    }
    
    var firstname = $rootScope.pi.Prenom;
    var lastname = $rootScope.pi.Nom;
    
    $scope.FullName = firstname + ' ' + lastname;

    dataService.crudGetRecords('Employees').then(function (response) {
        $scope.myUsers = response.data.filter(function(e) {
             return e.pi === $rootScope.pi._id
        });
        $scope.isLoaded = true;
    });
    
    $scope.userSelected = function(user) {
        $state.go('pivalidation', {'piId': $rootScope.pi._id, 'userId': user._id});
    }
});
