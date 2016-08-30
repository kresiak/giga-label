'use strict';

app.controller("pageChoosePiController", function ($scope, dataService, transitionService, $rootScope) {
    
    var firstname = $rootScope.firstname;
    var lastname = $rootScope.lastname;
    
    $scope.FullName = firstname + ' ' + lastname;
    
    //$scope.userAnswer = 'no';
    
    dataService.crudGetRecords('PIs').then(
        function (response) {
            $scope.pis = response.data;
        }
    );
    
    
    transitionService.setOnNavigateCallback(function (isContinue) {
        if (isContinue) {
            if ($scope.ChosenPiId) {
                $rootScope.Pi = $scope.pis.filter(function (u) { return u._id === $scope.ChosenPiId })[0];
               
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    })
    ;

    $scope.piSelected = null;
    
    $scope.setPiSelected = function (pi) {
        $scope.piSelected = pi;
        $scope.ChosenPiId = pi._id;
    }
    
    $scope.isPiTheActiveOne = function (pi) {
        return $scope.piSelected === pi;
    }

});
