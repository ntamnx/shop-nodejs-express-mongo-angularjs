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

admin.pageCategory = 1; //set page deffaul for list operator is 1.
admin.searchCategory; // set keyword page defaul for list operator is null;
app.controller('indexCategory', function ($scope, $http, $filter, $window, Flash) {
    setActiveMenuFirst(2);
    setDefaulKeySearchAndPageCurent(admin, ['pageCategory', 'searchCategory']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        $http.get(BASE_PATH_API + 'category/index').then(function (data) {
            $scope.categories = data.data;
            $scope.keyword = admin.searchCategory;
            paginate($scope, $scope.categories, admin.pageCategory);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.searchCategory = newValue;
                var newData = $filter('customSearch')(data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.pageCategory = 1;
                };
                $scope.operators = newData;
                paginate($scope, $scope.operators, admin.pageCategory);
            });
            $scope.pageChange = function (page) {
                admin.pageCategory = page;
            };
        });
    };
    getData();
    $scope.deleteCategory = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API + 'category/destroy/' + id
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
 * @function category controller
 */
app.controller('addCategory', function ($scope, $location, $http, Flash) {
    setActiveMenuLast(2);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageOperator', 'keyWordSearchIndexOperator']);
    $scope.addCategory = function () {
        if ($scope.frm_add_category.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "POST",
                url: BASE_PATH_API + "category/add",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.category
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $location.path('admin/category');
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
app.controller('editCategory', function ($scope, $location, $http, $routeParams, $window, Flash) {
    setActiveMenuFirst(2);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API + 'category/show/' + $routeParams.id).then(function (data) {
        console.log(data.data);
        $scope.category = data.data;
        $('#spinner_loading').addClass('hide');
    });
    $scope.edit = function () {
        if ($scope.frm_edit.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API + "category/update/" + $routeParams.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.category,
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $('#spinner_loading').addClass('hide');

            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
});