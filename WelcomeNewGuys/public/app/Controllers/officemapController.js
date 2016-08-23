
'use strict';

app.controller("deskAreaPopOverController",
    function ($scope, $stateParams, dataService, $rootScope, $state, $q) {
    var desk = $scope.currentDesk;
        $scope.popOverText = 'The desk is: ' + desk.Name;
    });


app.controller("officemapController",
    function ($scope, $stateParams, dataService, $rootScope, $state, $q) {
    
    var fromExcelColToNumber = function (val) {
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
        
        for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
            result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
        }
        
        return result;
    };
    
    //var xx = ['A', 'AA', 'AB', 'ZZ'].map(foo);
    
    $scope.isLoaded = false;
    
    var promises = [];
    
    promises.push(dataService.crudGetRecords('Desks').then(
        function (response) {
            $scope.desks = response.data;
        }
    ));
    
    $q.all(promises).then(function () {
        $scope.isLoaded = true;
    });
    
    $scope.getCoordinate = function (desk) {
        var col = fromExcelColToNumber(desk.Column);
        var row = desk.Row;
        var size = 20;
        var left = (col - 1) * size;
        var top = (row - 1) * size;
        return left + ',' + top + ',' + (left + size) + ',' + (top + size);
    };
    
    $scope.clickDesk = function (desk) {

    };
    
    $scope.enterArea = function (desk) {
        $scope.currentDesk = desk;
    };
});
