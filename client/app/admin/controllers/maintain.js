/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

var keyWordSearchIndexSupervisor;
app.controller('maintainIndexController', function ($scope, $http, $location, $filter, $window, Flash) {
    /**
     * index function
     */
    var getData = function () {
        $http.get('http://localhost:3000/todo').then(function (data) {
            $scope.supervisors = data.data;
            $scope.keyword = keyWordSearchIndexSupervisor;
            paginate($scope, $scope.supervisors, curentPageSupervisor);
            $scope.$watch('keyword', function (newValue, oldValue) {
                keyWordSearchIndexSupervisor = newValue;
                var newData = $filter('filter')(data.data, newValue);
                $scope.pageChangeSearch = function (page) {
                    curentPageSupervisor = 1;
                };
                $scope.supervisors = newData;
                paginate($scope, $scope.supervisors, curentPageSupervisor);
            });
            $scope.pageChange = function (page) {
                curentPageSupervisor = page;
            };
        });
    }
    getData();
    $scope.deleteSupervisor = function (id) {
        if ($window.confirm("Bạn có muốn xóa không?")) {
            $http({
                method: "DELETE",
                url: 'http://localhost:3000/todo/delete/' + id
            }).then(function successCallback(response) {
                getData();
                Flash.create('success', data.data.message_ui);
            }, function errorCallback(response) {
                Flash.create('danger', data.data.message_ui);
            });
        }
    };
    $scope.back = function () {
        $location.path("/");
    };
});