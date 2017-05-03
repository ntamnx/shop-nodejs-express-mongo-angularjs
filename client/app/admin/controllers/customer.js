/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */



/* global admin, app, BASE_PATH_API, message, BASE_PATH_API_ADMIN, transformRequestToUrlEncoded */

admin.pageCustomer = 1; //set page deffaul for list operator is 1.
admin.searchCustomer; // set keyword page defaul for list operator is null;
app.controller('indexCustomer', function ($scope, $http, $filter, $window, Flash) {
    setActiveMenuFirst(4);
    setDefaulKeySearchAndPageCurent(admin, ['pageCustomer', 'searchCustomer']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        $http.get(BASE_PATH_API + 'customer/index').then(function (data) {
            $scope.customers = data.data;
            $scope.keyword = admin.searchCustomer;
            paginate($scope, $scope.customers, admin.pageCustomer);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.searchCustomer = newValue;
                var newData = $filter('customSearch')(data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.pageCustomer = 1;
                };
                $scope.operators = newData;
                paginate($scope, $scope.operators, admin.pageCustomer);
            });
            $scope.pageChange = function (page) {
                admin.pageCustomer = page;
            };
        });
    };
    getData();
    $scope.destroy = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API + 'customer/destroy/' + id
            }).then(function success(data) {
                getData();
                Flash.create('success', data.data.msg);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
});
/**
 * @function customer controller
 */
app.controller('addCustomer', function ($scope, $location, $http, Flash) {
    setActiveMenuLast(4);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageOperator', 'keyWordSearchIndexOperator']);
    $scope.add = function () {
        if ($scope.frm_add.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "POST",
                url: BASE_PATH_API + "customer/store",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.customer
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $location.path('admin/customer');
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
});
/**
 * 
 */
app.controller('editCustomer', function ($scope, $location, $http, $routeParams, $window, Flash) {
    setActiveMenuFirst(4);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API + 'customer/show/' + $routeParams.id).then(function (data) {
        $scope.customer = data.data;
        $('#spinner_loading').addClass('hide');
    });
    $scope.edit = function () {
        if ($scope.frm_edit.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API + "customer/update/" + $routeParams.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.customer,
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $('#spinner_loading').addClass('hide');
                $location.path('/admin/customer')
            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
});