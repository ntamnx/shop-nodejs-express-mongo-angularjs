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

admin.pageAdmin = 1;
admin.keywordAdmin = '';
app.controller('indexAdmin', function ($scope, $http, $filter, $window, Flash) {
    setActiveMenuFirst(1);
    var getData = function () {
        $('#spinner_loading').removeClass('hide');
        $http.get(BASE_PATH_API + 'member/index').then(function (data) {
            $scope.admins = data.data;
            $scope.keyword = admin.keywordAdmin;
            paginate($scope, $scope.admins, admin.pageAdmin);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.keywordAdmin = newValue;
                var newData = $filter('customSearch')(data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.pageAdmin = 1;
                };
                $scope.admins = newData;
                paginate($scope, $scope.admins, admin.pageAdmin);
            });
            $scope.pageChange = function (page) {
                admin.pageAdmin = page;
            };
        });
    };
    getData();
    $scope.delete = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            if (JSON.parse($window.sessionStorage.auth_user).id === id) {
                Flash.create('error', message.cannot_delete_myself);
            } else {
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
        }
    };
});
/**
 * 
 */
app.controller('addAdmin', function ($scope, $location, Flash, $http) {
    setActiveMenuLast(1);
    $scope.add = function () {
        if ($scope.frm_add.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "POST",
                url: BASE_PATH_API + "member/store",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.userAdmin
            }).then(function success(data) {
                Flash.create('success', data.data.message_ui);
                $location.path('admin/admin');
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
});
/**
 * 
 */
app.controller('editAdmin', function ($scope, $location, Flash, $http, $routeParams, $window) {
    setActiveMenuFirst(1);
    if (JSON.parse($window.sessionStorage.auth_user).id === $routeParams.id) {
        Flash.create('error', message.cannot_update_myself);
        $location.path('admin/admin');
    }
    $http.get(BASE_PATH_API + 'member/show/' + $routeParams.id).then(function (data) {
        $scope.userAdmin = data.data;
    });
    $scope.edit = function () {
        if ($scope.frm_edit.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API + "member/update/" + $routeParams.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.userAdmin
            }).then(function success(data) {
                Flash.create('success', data.data.msg);
                $location.path('admin/admin');
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.msg);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
});
