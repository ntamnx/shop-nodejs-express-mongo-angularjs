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

admin.pageProduct = 1; //set page deffaul for list operator is 1.
admin.searchProduct; // set keyword page defaul for list operator is null;
app.controller('indexProduct', function ($scope, $http, $filter, $window, Flash) {
    setActiveMenuFirst(5);
    setDefaulKeySearchAndPageCurent(admin, ['pageProduct', 'searchProduct']);
    var getData = function () {
        $http.get(BASE_PATH_API + 'product/index').then(function (data) {
            $scope.products = data.data;
            $scope.keyword = admin.searchProduct;
            paginate($scope, $scope.products, admin.pageProduct);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.searchProduct = newValue;
                var newData = $filter('customSearch')(data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.pageProduct = 1;
                };
                $scope.operators = newData;
                paginate($scope, $scope.operators, admin.pageProduct);
            });
            $scope.pageChange = function (page) {
                admin.pageProduct = page;
            };
        });
    };
    getData();
    $scope.destroy = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API + 'product/destroy/' + id
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
 * @function product controller
 */
app.controller('addProduct', function ($scope, $location, $http, Flash) {
    setActiveMenuLast(5);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageOperator', 'keyWordSearchIndexOperator']);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API + 'category/index').then(function (data) {
        $scope.categories = data.data;
        $('#spinner_loading').addClass('hide');
    });
    $scope.add = function () {
        if ($scope.frm_add.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "POST",
                url: BASE_PATH_API + "product/store",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.product
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $location.path('admin/product');
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
app.controller('editProduct', function ($scope, $location, $http, $routeParams, $window, Flash) {
    setActiveMenuFirst(5);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API + 'product/show/' + $routeParams.id).then(function (data) {
        $scope.product = data.data;
        $('#spinner_loading').addClass('hide');
    });
    $scope.edit = function () {
        if ($scope.frm_edit.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API + "product/update/" + $routeParams.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.product,
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $('#spinner_loading').addClass('hide');
                $location.path('/admin/product')
            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
});