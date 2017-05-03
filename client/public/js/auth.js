/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 13, 2017, 8:14:09 AM
 Author     : nguyen.xuan.tam
 */
/* global ja, lb_ja, vi, lb_vi, USER_ROLE_ADMIN, USER_ROLE_OPERATOR, USER_ROLE_SUPERVISOR, transformRequestToUrlEncoded, BASE_PATH_API_ADMIN, USER_ROLE_SUPER, BASE_PATH_API_USER, data */

var message = {};
var app = angular.module('login', ['ngMessages', 'ngRoute', 'ngFlash']);
app.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'resources/pages/login.html'
            })
            .when('/reset-password', {
                templateUrl: 'resources/pages/password-resset.html'
            })
            .when('/reset-password-confirm', {
                templateUrl: 'resources/pages/confirm-password-resset.html'
            })
            .when('/change-reset-password/:token', {
                templateUrl: 'resources/pages/change-password-resset.html'
            })
            .when('/confim-change-password-success', {
                templateUrl: 'resources/pages/confirm-password-resset-success.html'
            })
});
app.controller('loginController', function ($scope, $http, $window, Flash, $timeout) {
    $timeout(function () {
        document.getElementById("animation_login").classList.add('hide');
        document.getElementById("div-login").classList.remove('hide');
    }, 4000);
    if ($window.sessionStorage.auth_user) {
        if (JSON.parse($window.sessionStorage.auth_user).type_user === USER_ROLE_SUPERVISOR) {
            $window.location.href = 'app/supervisor/supervisor.html'
        } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_OPERATOR) {
            $window.location.href = 'app/operator/operator.html'
        } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_ADMIN) {
            $window.location.href = 'app/admin/admin.html'
        } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_SUPER) {
            $window.location.href = 'app/super/super.html'
        }
    }
    if (!$window.sessionStorage.lang) {
        $window.sessionStorage.lang = "vi";
    }

    if ($window.sessionStorage.lang == 'ja') {
        message = ja;
        $scope.lable = lb_ja;
    } else {
        message = vi;
        $scope.lable = lb_vi;
    }
    $scope.setLanguage = function (language) {
        $window.sessionStorage.lang = language
        if ($window.sessionStorage.lang == 'ja') {
            message = ja;
            $scope.lable = lb_ja;
        } else {
            message = vi;
            $scope.lable = lb_vi;
        }
    };
    $scope.loginForm = function () {
        var user = {};
        user.email = $scope.email;
        user.password = $scope.password;
        if ($scope.login.$valid) {
            $http({
                method: "POST",
                url: BASE_PATH_API + 'auth/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'lang': $window.sessionStorage.lang,
                },
                transformRequest: transformRequestToUrlEncoded,
                data: user,
            }).then(function success(data) {
                $window.sessionStorage.token = data.data.token;
                $window.sessionStorage.auth_user = JSON.stringify({
                    'id': data.data.user._id,
                    'email': data.data.user.email,
                    'type_user': 'admin'
                });
                if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_ADMIN) {
                    $window.location.href = 'app/admin/admin.html';
                } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_OPERATOR) {
                    $window.location.href = 'app/operator/operator.html';
                } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_SUPERVISOR) {
                    $window.location.href = 'app/supervisor/supervisor.html';
                } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_SUPER) {
                    $window.location.href = 'app/super/super.html';
                }

            }, function error(data) {
                Flash.create('error', data.data.message_ui);
            });
        }
    };
});
/**
 * 
 */
app.controller('passwordRessetController', function ($scope, $http, $window, $location, Flash) {
    if ($window.sessionStorage.lang == 'ja') {
        message = ja;
        $scope.lable = lb_ja;
    } else {
        message = vi;
        $scope.lable = lb_vi;
    }
    $scope.setLanguage = function (language) {
        $window.sessionStorage.lang = language
        if ($window.sessionStorage.lang == 'ja') {
            message = ja;
            $scope.lable = lb_ja;
        } else {
            message = vi;
            $scope.lable = lb_vi;
        }
    };
    $scope.resetPassword = function () {
        if ($scope.resset.$valid) {
            $http({
                method: "POST",
                url: BASE_PATH_API_USER + 'forgot_password',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'lang': $window.sessionStorage.lang,
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.user,
            }).then(function success(data) {
                $location.path('/reset-password-confirm');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
            });
        }
    }
});
/**
 * 
 */
app.controller('changePasswordResset', function ($scope, $http, $window, Flash, $location, $routeParams) {
    if ($window.sessionStorage.lang == 'ja') {
        message = ja;
        $scope.lable = lb_ja;
    } else {
        message = vi;
        $scope.lable = lb_vi;
    }
    $scope.setLanguage = function (language) {
        $window.sessionStorage.lang = language
        if ($window.sessionStorage.lang == 'ja') {
            message = ja;
            $scope.lable = lb_ja;
        } else {
            message = vi;
            $scope.lable = lb_vi;
        }
    };
    $scope.passwordResset = function () {
        if ($scope.frm_password.$valid) {
            $http({
                method: "POST",
                url: BASE_PATH_API_USER + 'reset_password/' + $routeParams.token,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'lang': $window.sessionStorage.lang,
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.user,
            }).then(function success(data) {
                $location.path('/confim-change-password-success');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
            });

        }
    }
});
/**
 * 
 */
app.controller('confirmChangePasswordRessetSuccess', function ($scope, $http, $window, $location) {
    if ($window.sessionStorage.lang == 'ja') {
        message = ja;
        $scope.lable = lb_ja;
    } else {
        message = vi;
        $scope.lable = lb_vi;
    }
    $scope.setLanguage = function (language) {
        $window.sessionStorage.lang = language
        if ($window.sessionStorage.lang == 'ja') {
            message = ja;
            $scope.lable = lb_ja;
        } else {
            message = vi;
            $scope.lable = lb_vi;
        }
    };
});
/**
 * 
 */
app.controller('confirmChangePassword', function ($scope, $http, $window, $location) {
    if ($window.sessionStorage.lang == 'ja') {
        message = ja;
        $scope.lable = lb_ja;
    } else {
        message = vi;
        $scope.lable = lb_vi;
    }
    $scope.setLanguage = function (language) {
        $window.sessionStorage.lang = language
        if ($window.sessionStorage.lang == 'ja') {
            message = ja;
            $scope.lable = lb_ja;
        } else {
            message = vi;
            $scope.lable = lb_vi;
        }
    };
});