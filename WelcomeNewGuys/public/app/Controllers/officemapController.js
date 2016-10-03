
'use strict';

app.controller("deskAreaPopOverController",
    function ($scope, $stateParams, dataService, $rootScope, $state, $q) {
    var desk = $scope.currentDesk;
    $scope.popOverText = 'The room is: ' + desk.Name;
 
     var lab = $scope.currentLab;               //  znika nappis nad popover  (desk nic nie daje jest Object object)
     $scope.popOverText = 'The lab is: ' + lab.Name;
});


//app.controller("officemapController",
//    function ($scope, $stateParams, dataService, $rootScope, $state, $q) {
       
//    //var xx = ['A', 'AA', 'AB', 'ZZ'].map(foo);
    
//    $scope.isLoaded = false;
    
//    var promises = [];
    
//    promises.push(dataService.crudGetRecords('Desks').then(
//        function (response) {
//            $scope.desks = response.data;
//        }
//    ));
    
//    $q.all(promises).then(function () {
//        $scope.isLoaded = true;
//    });
    
//    $scope.getCoordinate = function (desk) {
//        var col = Excel.fromExcelColToNumber(desk.Column);
//        var row = desk.Row;
//        var size = 20;
//        var left = (col - 1) * size;
//        var top = (row - 1) * size;
//        return left + ',' + top + ',' + (left + size) + ',' + (top + size);
//    };
    
//    $scope.clickDesk = function (desk) {

//    };
    
//    $scope.enterArea = function (desk) {
//        $scope.currentDesk = desk;
//    };

//    $scope.setTab = function (tabNo) {
//        $scope.tabNo = tabNo;
//    }
    
//    $scope.getTab = function () {
//        return $scope.tabNo;
//    }

//});
