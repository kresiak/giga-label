'use strict';

app.controller("pivalidationController",
    function ($scope, $stateParams, dataService, $rootScope, $state, $q) {
    
    
    $scope.isLoaded = false;
    $scope.selectOfficeMode = false;
    
    var promises = [];
    
    promises.push(dataService.crudGetRecordById('PIs', $stateParams.piId).then(
        function (response) {
            $scope.pi = response.data;
            $scope.piFullname = $scope.pi.Prenom + ' ' + $scope.pi.Nom;
        }
    ));
    
    promises.push(dataService.crudGetRecordById('Employees', $stateParams.userId).then(
        function (response) {
            $scope.user = response.data;
            $scope.user.piAnswers = $scope.user.piAnswers || {};
            $scope.answersByPi = $scope.user.piAnswers[$stateParams.piId] || {};
            $scope.answersByPi.allowedPlatforms = $scope.answersByPi.allowedPlatforms || {};
            $scope.answersByPi.allowedFacilities = $scope.answersByPi.allowedFacilities || {};
            
            $scope.userFullname = $scope.user.Prenom + ' ' + $scope.user.Nom;
        }
    ));
    
    promises.push(dataService.crudGetRecords('Platforms').then(
        function (response) {
            $scope.platforms = response.data;
        }
    ));
    
    promises.push(dataService.crudGetRecords('Facilities').then(
        function (response) {
            $scope.facilities = response.data;
        }
    ));
    
    promises.push(dataService.crudGetRecords('Desks').then(
        function (response) {
            $scope.desks = response.data;
        }
    ));
   
    $q.all(promises)
            .then(function () {
        $scope.isLoaded = true;
    });
    
    $scope.gotoEnd = function () {
        $scope.answersByPi.dateUpdate = new Date();
        dataService.callWebService('UpdatePiAnswer', { 'userId': $stateParams.userId, 'piId': $stateParams.piId, 'piAnswer' : $scope.answersByPi });
        //$state.go('examen');
    }
   
    $scope.getCoordinate = function (desk) {
        var col = Excel.fromExcelColToNumber(desk.Column);
        var row = desk.Row;
        var size = 20;
        var left = (col - 1) * size;
        var top = (row - 1) * size;
        return left + ',' + top + ',' + (left + size) + ',' + (top + size);
    };
    
    $scope.clickDesk = function (desk) {
        $scope.answersByPi.selectedDesk = desk._id;
        $scope.selectedDesk = desk.Name;
    };
    
    $scope.enterArea = function (desk) {
        $scope.currentDesk = desk;
    };
    
    $scope.setTab = function (tabNo) {
        $scope.tabNo = tabNo;
    }
    
    $scope.getTab = function () {
        return $scope.tabNo;
    }
    
     
});
