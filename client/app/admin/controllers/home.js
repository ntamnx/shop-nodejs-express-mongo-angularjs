/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Apr 5, 2017, 5:22:14 PM
 Author     : nguyen.xuan.tam
 */

/* global admin, app, BASE_PATH_API_ADMIN, operator */

app.controller('homeController', function ($scope, $http) {
    $('.remove-active-menu').trigger('click');
    setDefaulKeySearchAndPageCurent(admin);
});