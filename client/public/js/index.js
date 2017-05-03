/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 15, 2017, 10:43:20 AM
 Author     : nguyen.xuan.tam
 */
var app = angular.module('indexPage', []);
app.controller('indexController', function ($window) {
    if ($window.sessionStorage.auth_user) {
        if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_SUPERVISOR) {
            $window.location.href = 'app/supervisor/supervisor.html';
        } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_OPERATOR) {
            $window.location.href = 'app/operator/operator.html'
        } else if (JSON.parse($window.sessionStorage.auth_user).type_user == USER_ROLE_ADMIN) {
            $window.location.href = 'app/admin/admin.html'
        }
    } else {
        $window.location.href = 'login.html'
    }
});
