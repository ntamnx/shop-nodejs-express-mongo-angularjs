/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 13, 2017, 2:57:06 PM
 Author     : nguyen.xuan.tam
 */
/* global app */

app.factory('authentication', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = $window.sessionStorage.token;
                config.headers.lang = $window.sessionStorage.lang;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                $window.location.href = '/login.html';
            }
            return response || $q.when(response);
        }
    };
});

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push('authentication');
});
