

'use strict';

app.controller("userinfoController",
    function (askLoginService, $scope, $stateParams, dataService, $rootScope, $state) {
    
    $scope.isLoaded = false;
    
    if (!$rootScope.user) {
        askLoginService.setOnGotInfoCallback(function(user, pwd) {            
            dataService.crudGetRecordById('Employees', user).then(
                function (response) {
                    if (response.data) {
                        $rootScope.user = response.data;
                        $state.go('userinfo');
                    }
                
                }
            );
        });
        $state.go('identification');
    }
    
    var firstname = $rootScope.user.Prenom;
    var lastname = $rootScope.user.Nom;
    
    $scope.FullName = firstname + ' ' + lastname;
    
    
    dataService.crudGetRecordById('PIs', $rootScope.user.pi).then(function (response) {
        $scope.pi = response.data;
        
        dataService.crudGetRecords('Presentations').then(
            function (response) {
                $rootScope.presentations = response.data;
                $scope.isLoaded = true;
            }
        );
    });
    
   
    $scope.getPresentationText = function (presentation) {
        if ($rootScope.user.passedExams && $rootScope.user.passedExams[presentation._id]) {
            var result = $rootScope.user.passedExams[presentation._id];
            return presentation.title + ' (' + (result.passed ? 'passed' : 'failed') + ' with a score of ' + result.score + ')';
        } else {
            return presentation.title;
        }

    };

});
