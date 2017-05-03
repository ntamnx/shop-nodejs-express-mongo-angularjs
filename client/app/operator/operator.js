/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 13, 2017, 3:13:12 PM
 Author     : nguyen.xuan.tam
 */

/* global ja, lb_ja, ROOT_PATH, vi, lb_vi, USER_ROLE_OPERATOR, Stripe */
Stripe.setPublishableKey('pk_test_w12LXGYRNUXJi4Cga4aByvcu');
var app = angular.module('operator', ['ngRoute', 'ui.bootstrap', 'ngFlash', 'ngMessages','angularPayments']);
var message = {};
var operator = {};

app.config(function ($routeProvider) {
    $routeProvider
            //manager supervisor
            .when('/', {
                templateUrl: 'views/home/index.html',
            })
            .when('/operator/supervisor', {
                templateUrl: 'views/supervisors/index.html',
            })
            .when('/operator/supervisor/add', {
                templateUrl: 'views/supervisors/add.html',
            })
            .when('/operator/supervisor/:id', {
                templateUrl: 'views/supervisors/show.html',
            })
            ///Manager group
            .when('/operator/group', {
                templateUrl: 'views/group/index.html',
            })
            .when('/operator/group/add', {
                templateUrl: 'views/group/add.html',
            })
            .when('/operator/group/edit/:id', {
                templateUrl: 'views/group/edit.html',
            })
            .when('/operator/group/:id', {
                templateUrl: 'views/group/show.html',
            })
            ///Manager student
            .when('/operator/student', {
                templateUrl: 'views/students/index.html',
            })
            .when('/operator/student/add', {
                templateUrl: 'views/students/add.html',
            })
            .when('/operator/student/print', {
                templateUrl: 'views/students/print.html',
            })
            .when('/operator/student/print-data', {
                templateUrl: 'views/students/print_data.html',
            })
            .when('/operator/student/:id', {
                templateUrl: 'views/students/show.html',
            })
            .when('/operator/student/profile/:id', {
                templateUrl: 'views/students/profile.html',
            })
            .when('/operator/profile', {
                templateUrl: 'views/profile/show.html',
            })
            .when('/operator/profile/edit', {
                templateUrl: 'views/profile/edit.html',
            })
            .when('/operator/profile/change-password', {
                templateUrl: 'views/profile/password.html',
            })
            .when('/operator/new', {
                templateUrl: 'views/news/index.html',
            })
            .when('/operator/new/add', {
                templateUrl: 'views/news/add.html',
            })
            .when('/operator/new/sending', {
                templateUrl: 'views/news/sending.html',
            })
            .when('/operator/new/sending/edit/:id', {
                templateUrl: 'views/news/edit.html',
            })
            .when('/operator/new/:id', {
                templateUrl: 'views/news/show.html',
            })
            .when('/operator/notification', {
                templateUrl: 'views/notifications/index.html',
            })
            .when('/operator/notification/:id', {
                templateUrl: 'views/notifications/show.html',
            })
            //payment
            .when('/operator/payment', {
                templateUrl: 'views/payment/index.html',
            })
            .when('/operator/payment/add', {
                templateUrl: 'views/payment/add.html',
            })
            .when('/operator/payment/print', {
                templateUrl: 'views/payment/print.html',
            })
            .when('/operator/payment/list/print/:id', {
                templateUrl: 'views/payment/print_list.html',
            })
            .when('/operator/payment/resquest_code', {
                templateUrl: 'views/payment/code.html',
            })

}).run(function ($window) {
    if (!$window.sessionStorage.auth_user) {
        $window.location.href = ROOT_PATH + 'login.html';
    } else if (JSON.parse($window.sessionStorage.auth_user).type_user != USER_ROLE_OPERATOR) {
        $window.location.href = ROOT_PATH + 'resources/pages/errors/page_403.html';
    }
});
app.controller('operatorController', function ($scope, $http, $window) {
    $scope.user = JSON.parse($window.sessionStorage.auth_user);
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
    /**
     * 
     * @returns {undefined}
     */
    $scope.logout = function () {
        delete $window.sessionStorage.auth_user;
        delete $window.sessionStorage.token;
        $window.location.href = ROOT_PATH + 'login.html';
    };
});
