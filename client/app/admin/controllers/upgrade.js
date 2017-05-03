/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

/* global message, transformRequestToUrlEncoded, BASE_PATH_API_ADMIN, $http, app, admin */

app.controller('indexUpgradeController', function ($scope, $http, $filter, $window, Flash) {
    setActiveMenuFirst(6);
    setDefaulKeySearchAndPageCurent(admin);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'news/admin_list_news').then(function (data) {
        $scope.news = data.data.data;
        paginate($scope, $scope.news, admin.curentPageNew);
        $('#spinner_loading').addClass('hide');
        $scope.$watch('keyword', function (newValue, oldValue) {
            var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
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

});
/**
 * 
 */
admin.curentPageCode = 1;
admin.curentSearchKeyWord;
app.controller('indexUpgradeCodeController', function ($scope, $http, $filter, $window, Flash, $location) {
    $('.nav_menu').show();
    $('footer').show();
    setActiveMenuLast(6);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageCode', 'curentSearchKeyWord']);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'news/admin_list_news').then(function (data) {
        $scope.news = data.data.data;
        $scope.keyword = admin.curentSearchKeyWord;
        paginate($scope, $scope.news, admin.curentPageCode);
        $('#spinner_loading').addClass('hide');
        $scope.$watch('keyword', function (newValue, oldValue) {
            admin.curentSearchKeyWord = newValue;
            var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
            $scope.pageChangeSearch = function (page) {
                admin.curentPageCode = 1;
            };
            $scope.news = newData;
            paginate($scope, $scope.news, admin.curentPageCode);
        });
        $scope.pageChange = function (page) {
            admin.curentPageCode = page;
        };
    });
    $scope.printPDF = function (code) {
        $location.path('admin/upgrade/not_active/' + code);
    }
});
/**
 * 
 */
app.controller('printCodeController', function ($scope, $location, $routeParams, $timeout) {
    $('.nav_menu').hide();
    $('footer').hide();
    setActiveMenuFirst(6);
    $scope.payment = {};
    $scope.payment.code = $routeParams.id;
    new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    $timeout(function () {
        window.print();
        $location.path("admin/upgrade/not_active");
    }, 100);
});