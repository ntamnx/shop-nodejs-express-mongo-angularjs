/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 13, 2017, 3:13:12 PM
 Author     : nguyen.xuan.tam
 */

/* global ROOT_PATH, USER_ROLE_ADMIN, ja, vi, lb_vi, lb_ja */

var app = angular.module('admin', ['ngRoute', 'ui.bootstrap', 'ngFlash', 'ngFileUpload', 'ngMessages']);
var message = {};
var admin = {};
app.config(function ($routeProvider) {
    $routeProvider
            // home
            .when('/', {
                templateUrl: 'views/home/index.html',
            })
            // category
            .when('/admin/category', {
                templateUrl: 'views/category/index.html',
            })
            .when('/admin/category/add', {
                templateUrl: 'views/category/add.html',
            })
            .when('/admin/category/edit/:id', {
                templateUrl: 'views/category/edit.html',
            })
            //admin
            .when('/admin/admin', {
                templateUrl: 'views/admin/index.html',
            })
            .when('/admin/admin/add', {
                templateUrl: 'views/admin/add.html',
            })
            .when('/admin/admin/edit/:id', {
                templateUrl: 'views/admin/edit.html',
            })
            //            



            .when('/admin/operator/add/user/:id', {
                templateUrl: 'views/operator/add_user.html',
            })
            .when('/admin/operator/edit/user/:id', {
                templateUrl: 'views/operator/edit_user.html',
            })
            .when('/admin/operator/edit/:id', {
                templateUrl: 'views/operator/edit.html',
            })
            .when('/admin/operator/:id', {
                templateUrl: 'views/operator/show.html',
            })
            ///Manager supervisor
            .when('/admin/supervisor', {
                templateUrl: 'views/supervisor/index.html',
            })
            .when('/admin/supervisor/:id', {
                templateUrl: 'views/supervisor/show.html',
            })
            ///Manager resource
            .when('/admin/resource', {
                templateUrl: 'views/resource/index.html',
            })
            .when('/admin/resource/add', {
                templateUrl: 'views/resource/add.html',
            })
            .when('/admin/resource/edit/:id', {
                templateUrl: 'views/resource/edit.html',
            })
            .when('/admin/resource/:id', {
                templateUrl: 'views/resource/show.html',
            })
            ///Manager new
            .when('/admin/new', {
                templateUrl: 'views/new/index.html',
            })
            .when('/admin/new/add', {
                templateUrl: 'views/new/add.html',
            })
            .when('/admin/new/edit/:id', {
                templateUrl: 'views/new/edit.html',
            })
            .when('/admin/new/:id', {
                templateUrl: 'views/new/show.html',
            })
            /// matain
            .when('/admin/maintain', {
                templateUrl: 'views/maintain/index.html',
            })
            //*** profile
//            .when('/admin/profile', {
//                templateUrl: 'views/profile/show.html',
//            })
//            .when('/admin/profile/edit', {
//                templateUrl: 'views/profile/edit.html',
//            })
            .when('/admin/profile/change-password', {
                templateUrl: 'views/profile/password.html',
            })
            .when('/admin/system/payment', {
                templateUrl: 'views/system/payment/home.html',
            })
            .when('/admin/system/payment/term', {
                templateUrl: 'views/system/payment/term.html',
            })
            .when('/admin/system/payment/term_create_code', {
                templateUrl: 'views/system/payment/term_create_code.html',
            })
            .when('/admin/system/payment/discount', {
                templateUrl: 'views/system/payment/discount.html',
            })
            .when('/admin/system/payment/time_expired', {
                templateUrl: 'views/system/payment/time_expired.html',
            })
            .when('/admin/system/payment/create_code', {
                templateUrl: 'views/system/payment/add_code.html',
            })
            .when('/admin/system/payment/print_code', {
                templateUrl: 'views/system/payment/print_code.html',
            })
            .when('/admin/system/payment/subjects', {
                templateUrl: 'views/system/payment/subjects.html',
            })
            ////////////
            .when('/admin/system/cv', {
                templateUrl: 'views/system/cv/index.html',
            })
            .when('/admin/system/cv/edit/:id', {
                templateUrl: 'views/system/cv/edit.html',
            })
            .when('/admin/system/exercise', {
                templateUrl: 'views/system/exercise/home.html',
            })
            .when('/admin/system/exercise/exercise', {
                templateUrl: 'views/system/exercise/exercise.html',
            })
            .when('/admin/system/exercise/test', {
                templateUrl: 'views/system/exercise/test.html',
            })
            .when('/admin/system/exercise', {
                templateUrl: 'views/system/exercise/home.html',
            })
            // upgrade
            .when('/admin/upgrade', {
                templateUrl: 'views/upgrade/index.html',
            })
            .when('/admin/upgrade/not_active', {
                templateUrl: 'views/upgrade/list_code.html',
            })
            .when('/admin/upgrade/not_active/:id', {
                templateUrl: 'views/upgrade/print.html',
            })
}).run(function ($window) {
    if (!$window.sessionStorage.auth_user) {
        $window.location.href = ROOT_PATH + 'login.html';
    } else if (JSON.parse($window.sessionStorage.auth_user).type_user != USER_ROLE_ADMIN) {
        $window.location.href = ROOT_PATH + 'resources/pages/errors/page_403.html';
    }
});
app.controller('adminController', function ($scope, $http, $window) {
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
            jQuery.datetimepicker.setLocale(message.lang);
        } else {
            message = vi;
            $scope.lable = lb_vi;
            jQuery.datetimepicker.setLocale(message.lang);
        }
    };
    $scope.auth_user = JSON.parse($window.sessionStorage.auth_user);
    $scope.logout = function () {
        delete $window.sessionStorage.auth_user;
        delete $window.sessionStorage.token;
        $window.location.href = ROOT_PATH + 'login.html';
    };
    /**
     * list student
     */
});
