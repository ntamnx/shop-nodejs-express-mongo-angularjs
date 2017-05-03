/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

/* global app, message_delete_success, message_delete_error, transformRequestToUrlEncoded, BASE_PATH_API_ADMIN, admin, removeKeySearchAndPageCurentInPageDiffent, BASE_PATH_API, message */

admin.pageSuperlier = 1; // set deffaul curent page new =1 when page load success.
admin.keywordSuperlier;  // set deffaul keyword search is null when page load success.
app.controller('indexSuperlier', function ($scope, $http, $filter, $window, Flash) {
    setActiveMenuFirst(3);
    setDefaulKeySearchAndPageCurent(admin, ['pageSuperlier', 'keywordSuperlier']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        $http.get(BASE_PATH_API + 'superlier/index').then(function (data) {
            $scope.superliers = data.data;
            $scope.keyword = admin.keywordSuperlier;
            paginate($scope, $scope.superliers, admin.pageSuperlier);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.keywordSuperlier = newValue;
                var newData = $filter('customSearch')(data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.pageSuperlier = 1;
                };
                $scope.superliers = newData;
                paginate($scope, $scope.superliers, admin.pageSuperlier);
            });
            $scope.pageChange = function (page) {
                admin.pageSuperlier = page;
            };
        });
    }
    getData();
    $scope.destory = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API + 'superlier/destroy/' + id
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
app.controller('addSuperlier', function ($scope, $http, $location, Flash, $window) {
    setActiveMenuLast(3);
    setDefaulKeySearchAndPageCurent(admin, ['pageSuperlier', 'keywordSuperlier']);
    $scope.add = function () {
        if ($scope.frm_add.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'POST',
                url: BASE_PATH_API + 'superlier/store',
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.superlier,
            }).then(function success(data) {
                $('#spinner_loading').addClass('hide');
                $location.path('/admin/superlier')
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
app.controller('editSuperlier', function ($scope, $location, $http, $routeParams, Flash) {
    setActiveMenuFirst(3);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API + 'superlier/show/' + $routeParams.id).then(function (data) {
        $scope.superlier = data.data;
        $('#spinner_loading').addClass('hide');
    })
    $scope.edit = function () {
        if ($scope.frm_edit.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'PUT',
                url: BASE_PATH_API + 'superlier/update/' + $routeParams.id,
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.superlier,
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $location.path('/admin/superlier');
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });

        }
    }
});