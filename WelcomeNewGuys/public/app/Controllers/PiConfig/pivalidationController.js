'use strict';

app.controller("pivalidationController",
    function ($scope, $stateParams, dataService, $rootScope, $state, $q) {
    
    
    $scope.isLoaded = false;
    $scope.selectOfficeMode = false;
    $scope.showEndPage = false;
    
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

    promises.push(dataService.crudGetRecords('Laboratoires').then(
        function (response) {
            $scope.laboratoires = response.data;
        }
    ));
	
    promises.push(dataService.crudGetRecords('Desks4').then(
        function (response) {
            $scope.desks4 = response.data;
        }
    ));

    promises.push(dataService.crudGetRecords('Laboratoires4').then(
        function (response) {
            $scope.laboratoires4 = response.data;
        }
    ));

    $q.all(promises)
        .then(function () {
            if ($scope.answersByPi && $scope.answersByPi.selectedDesk) {
                $scope.selectedDesk = $scope.desks.filter(function (d) { return d._id === $scope.answersByPi.selectedDesk })[0].Name;
            }
            $scope.isLoaded = true;
        });

    $q.all(promises)		//important Lab
        .then(function () {
            if ($scope.answersByPi && $scope.answersByPi.selectedLab) {
                $scope.selectedLab = $scope.laboratoires.filter(function (d) { return d._id === $scope.answersByPi.selectedLab })[0].Name;
            }
            $scope.isLoaded = true;
        });
    
    $q.all(promises)
        .then(function () {
            if ($scope.answersByPi && $scope.answersByPi.selectedDesk4) {
                $scope.selectedDesk4 = $scope.desks4.filter(function (d) { return d._id === $scope.answersByPi.selectedDesk4 })[0].Name;
            }
            $scope.isLoaded = true;
        });

    $q.all(promises)
        .then(function () {
            if ($scope.answersByPi && $scope.answersByPi.selectedLab4) {
                $scope.selectedLab4 = $scope.laboratoires4.filter(function (d) { return d._id === $scope.answersByPi.selectedLab4 })[0].Name;
            }
            $scope.isLoaded = true;
        });
    
    $scope.gotoEnd = function () {
        $scope.answersByPi.dateUpdate = new Date();
        dataService.callWebService('UpdatePiAnswer', { 'userId': $stateParams.userId, 'piId': $stateParams.piId, 'piAnswer' : $scope.answersByPi });
        $scope.showEndPage = true;
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

    $scope.clickLab = function (lab) {                      
        $scope.answersByPi.selectedLab = lab._id;
        $scope.selectedLab = lab.Name;
    };

    $scope.enterAreaLab = function (lab) {
        $scope.currentLab = lab;
    };

    $scope.clickDesk4 = function (desk4) {
        $scope.answersByPi.selectedDesk4 = desk4._id;
        $scope.selectedDesk4 = desk4.Name;
    };
    
    $scope.enterAreaDesk4 = function (desk4) {
        $scope.currentDesk4 = desk4;
    };
	
    $scope.clickLab4 = function (lab4) {                      
        $scope.answersByPi.selectedLab4 = lab4._id;
        $scope.selectedLab4 = lab4.Name;
    };

    $scope.enterAreaLab4 = function (lab4) {
        $scope.currentLab4 = lab4;
    };

// desk.Name must be last for popOverText... 
    $scope.clickDesk = function (desk) {
        $scope.answersByPi.selectedDesk = desk._id;
        $scope.selectedDesk = desk.Name;
    };
    
    $scope.enterAreaDesk = function (desk) {
        $scope.currentDesk = desk;
    };

    $scope.setTab = function (tabNo) {
        $scope.tabNo = tabNo;
    }
    
    $scope.getTab = function () {
        return $scope.tabNo;
    }
    
    $scope.hideSubmit = function() {
        return $scope.showEndPage || $scope.selectOfficeMode;
    }

    $scope.setSelectOfficeMode = function(flag) {
        $scope.selectOfficeMode = flag;
    }
});
