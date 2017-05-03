/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/*
 Created on : Mar 13, 2017, 3:13:12 PM
 Author     : nguyen.xuan.tam
 */

/* global ja, lb_ja, ROOT_PATH, USER_ROLE_SUPERVISOR, vi, lb_vi */

var app = angular.module('supervisor', ['ngRoute', 'ui.bootstrap', 'ngMessages', 'ngFlash']);
var message = {};
var supervisor = {};
app.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'views/home/index.html',
            })
            .when('/supervisor/group', {
                templateUrl: 'views/students/group.html',
            })
            .when('/supervisor/group/:id', {
                templateUrl: 'views/students/index.html',
            })
//            .when('/supervisor/student/add', {
//                templateUrl: 'views/students/add.html',
//            })
            .when('/supervisor/student/print', {
                templateUrl: 'views/students/print.html',
            })
            .when('/supervisor/student/:id', {
                templateUrl: 'views/students/show.html',
            })
            .when('/supervisor/student/profile/:id', {
                templateUrl: 'views/students/profile.html',
            })

            //*** profile
            .when('/supervisor/profile', {
                templateUrl: 'views/profile/show.html',
            })
            .when('/supervisor/profile/edit', {
                templateUrl: 'views/profile/edit.html',
            })
            .when('/supervisor/profile/change-password', {
                templateUrl: 'views/profile/password.html',
            })
            .when('/supervisor/notification', {
                templateUrl: 'views/notifications/index.html',
            })
            .when('/supervisor/notification/:id', {
                templateUrl: 'views/notifications/show.html',
            })
}).run(function ($window) {
    if (!$window.sessionStorage.auth_user) {
        $window.location.href = ROOT_PATH + 'login.html';
    } else if (JSON.parse($window.sessionStorage.auth_user).type_user != USER_ROLE_SUPERVISOR) {
        $window.location.href = ROOT_PATH + 'resources/pages/error/page_403.html';
    }
});
app.controller('supervisorController', function ($scope, $http, $window) {
    $scope.auth_user = JSON.parse($window.sessionStorage.auth_user);
    if ($window.sessionStorage.lang === 'ja') {
        message = ja;
        $scope.lable = lb_ja;
    } else {
        message = vi;
        $scope.lable = lb_vi;
    }
    $scope.setLanguage = function (language) {
        $window.sessionStorage.lang = language;
        if ($window.sessionStorage.lang === 'ja') {
            message = ja;
            $scope.lable = lb_ja;
            jQuery.datetimepicker.setLocale(message.lang);
        } else {
            message = vi;
            $scope.lable = lb_vi;
            jQuery.datetimepicker.setLocale(message.lang);
        }
    };
    $scope.logout = function () {
        delete $window.sessionStorage.auth_user;
        delete $window.sessionStorage.token;
        $window.location.href = ROOT_PATH + 'login.html';
    };
    /**
     * list student
     */

});
