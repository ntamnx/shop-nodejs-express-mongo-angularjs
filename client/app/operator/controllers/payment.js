/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

/* global transformRequestToUrlEncoded, BASE_PATH_API_OPERATOR, app, message, operator */

operator.curentPagePayment = 1; // set curent page off list supervisor is 1 when page load
operator.keyWordSearchIndexPayment = '';// set keyword search off list supervisor is "" when page load
var code = '';
var checkShowModal = true;
app.controller('indexPaymentController', function ($scope, $http, $location, $filter, $window, Flash) {
    $('.nav_menu').show();
    $('footer').show();
    setActiveMenuFirst(6);
    setDefaulKeySearchAndPageCurent(operator, ['curentPageSupervisor', 'keyWordSearchIndexSupervisor']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'users/organization_list_supervisor').then(function (data) {
            $scope.supervisors = data.data.data;
            $scope.keyword = operator.keyWordSearchIndexPayment;
            paginate($scope, $scope.supervisors, operator.curentPagePayment);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                operator.keyWordSearchIndexPayment = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    operator.curentPagePayment = 1;
                };
                $scope.supervisors = newData;
                paginate($scope, $scope.supervisors, operator.curentPagePayment);
            });
            $scope.pageChange = function (page) {
                operator.curentPagePayment = page;
            }
        });
    }
    getData();
    $scope.deleteSupervisor = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API_OPERATOR + 'users/organization_delete_supervisor/' + id,
            }).then(function success(data) {
                getData();
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
    $scope.printPDF = function (code) {
        $location.path('/operator/payment/list/print/' + code);

    }
});
/**
 * 
 */
app.controller('printInListPaymentController', function ($scope, $location, $routeParams, $timeout) {
    $('.nav_menu').hide();
    $('footer').hide();
    setActiveMenuFirst(6);
    $scope.payment = {};
    $scope.payment.code = $routeParams.id;
    new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    $timeout(function () {
        window.print();
        $location.path("operator/payment");
    }, 100);
});
/**
 * 
 */
app.controller('addPaymentController', function ($scope, $location, $http, Flash, $window) {
    $('.nav_menu').show();
    $('footer').show();
    setActiveMenuFirst(6);
    if (checkShowModal) {
        $("#exampleModal").modal('show');
    } else {
        $("#exampleModal").modal('hide');
        $scope.payment = {};
        checkShowModal = true;
        $scope.payment.code = code;
        new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    }
    $scope.back = function () {
        $("#exampleModal").modal('hide');
        $location.path('/operator/payment');
    };
    $scope.createCode = function () {
        $("#exampleModal").modal('hide');
        setDefaulKeySearchAndPageCurent(operator, ['curentPagePayment', 'keyWordSearchIndexPayment']);
        $scope.payment = {};
        code = '2123-5544-5456';
        $scope.payment.code = code;
        new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    };
});
/**
 * 
 */
app.controller('printPaymentController', function ($scope, $location, $http, Flash, $window, $timeout) {
    checkShowModal = false;
    $('.nav_menu').hide();
    $('footer').hide();
    setActiveMenuFirst(6);
    $scope.payment = {};
    setDefaulKeySearchAndPageCurent(operator, ['curentPagePayment', 'keyWordSearchIndexPayment']);
    $scope.payment.code = '2123-5544-5456';
    new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    $timeout(function () {
        window.print();
        $location.path("operator/payment/add");
    }, 100);
});
/**
 * 
 */
app.controller('byCodePaymentController', function ($scope, $location, $http, Flash, $window, $timeout) {
    setActiveMenuLast(6);
    setDefaulKeySearchAndPageCurent(operator, ['curentPagePayment', 'keyWordSearchIndexPayment']);
    $scope.savePayment = function (status, response) {
        if (response.error) {
            if ($scope.frm_payment.$valid) {
                Flash.create('error', message.info_not_correct);
            }
        } else {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "POST",
                url: BASE_PATH_API_OPERATOR + 'groups/organization_add_group',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: {token: response.id, quality: $scope.payment.number}
            }).then(function success(data) {
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
                $location.path('operator/payment');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
    var money = 1200000;
    var discount = 10;
    $scope.updateTotalMoney = function (number) {
        $scope.totalMoney = (number * money * (100 - discount)) / 100;
    }
});
