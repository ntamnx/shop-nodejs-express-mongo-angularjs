/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

/* global app, message_delete_success, message_delete_error, transformRequestToUrlEncoded, BASE_PATH_API_ADMIN, admin, removeKeySearchAndPageCurentInPageDiffent, BASE_PATH_API */

admin.curentPageNew = 1; // set deffaul curent page new =1 when page load success.
admin.keyWordSearchIndexNew;  // set deffaul keyword search is null when page load success.
app.controller('indexNewController', function ($scope, $http, $location, $filter, $window, Flash) {
    setDefaulKeySearchAndPageCurent(admin, ['curentPageNew', 'keyWordSearchIndexNew']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        console.log($window.sessionStorage.token);
        $http.get(BASE_PATH_API + 'member/list').then(function (data) {
            $scope.news = data.data;
            $scope.keyword = admin.keyWordSearchIndexNew;
            paginate($scope, $scope.news, admin.curentPageNew);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.keyWordSearchIndexNew = newValue;
                var newData = $filter('customSearch')(data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.curentPageNew = 1;
                };
                $scope.news = newData;
                paginate($scope, $scope.news, admin.curentPageNew);
            });
            $scope.pageChange = function (page) {
                admin.curentPageNew = page;
            };
        });
    }
    getData();
    $scope.deleteNew = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API + 'member/destroy/' + id
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
 * 
 */
app.controller('addNewController', function ($scope, $http, $location, Flash, $window) {
    setActiveMenuLast(5);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageNew', 'keyWordSearchIndexNew']);
    $scope.addNew = function () {
        if ($scope.frm_addNew.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'POST',
                url: BASE_PATH_API + 'auth/signup',
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.itemNew,
            }).then(function success(data) {
                $('#spinner_loading').addClass('hide');
                $location.path('/admin/new')
                Flash.create('success', data.data.msg);
            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
});
/**
 * 
 */
app.controller('editNewController', function ($scope, $location, $http, $routeParams, Flash) {
    setActiveMenuFirst(5);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API + 'member/show/' + $routeParams.id).then(function (data) {
        $scope.itemNew = data.data;
        $('#spinner_loading').addClass('hide');
    })
    $scope.editNew = function () {
        if ($scope.frm_editNew.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'PUT',
                url: BASE_PATH_API + 'member/update/' + $routeParams.id,
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.itemNew,
            }).then(function success(data) {
                Flash.create('success', data.data.message_ui);
                $location.path('/admin/new');
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });

        }
    }
});