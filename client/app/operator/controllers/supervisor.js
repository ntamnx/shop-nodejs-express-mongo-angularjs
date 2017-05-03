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

operator.curentPageSupervisor = 1; // set curent page off list supervisor is 1 when page load
operator.keyWordSearchIndexSupervisor = '';// set keyword search off list supervisor is "" when page load
app.controller('indexSupervisorController', function ($scope, $http, $location, $filter, $window, Flash) {
    setActiveMenuFirst(1);
    setDefaulKeySearchAndPageCurent(operator, ['curentPageSupervisor', 'keyWordSearchIndexSupervisor']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'users/organization_list_supervisor').then(function (data) {
            $scope.supervisors = data.data.data;
            $scope.keyword = operator.keyWordSearchIndexSupervisor;
            paginate($scope, $scope.supervisors, operator.curentPageSupervisor);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                operator.keyWordSearchIndexSupervisor = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    operator.curentPageSupervisor = 1;
                };
                $scope.supervisors = newData;
                paginate($scope, $scope.supervisors, operator.curentPageSupervisor);
            });
            $scope.pageChange = function (page) {
                operator.curentPageSupervisor = page;
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
    }
    ;
}
);
/**
 * 
 */
app.controller('addSupervisorController', function ($scope, $location, $http, Flash, $window) {
    setActiveMenuLast(1);
    setDefaulKeySearchAndPageCurent(operator, ['curentPageSupervisor', 'keyWordSearchIndexSupervisor']);
    $scope.userSupervisor = {};
    $scope.currentDate = new Date();
    jQuery.datetimepicker.setLocale(message.lang);
    $('#datetimepicker').datetimepicker({
        timepicker: false,
        format: 'Y-m-d',
        maxDate: 0,
        onChangeDateTime: function () {
            $scope.userSupervisor.birth_date = $('#datetimepicker').val();
            if ($('#datetimepicker').val()) {
                $('#datetimepicker').parents('.form-group').removeClass('has-error');
                $('#datetimepicker').next().find('.error').hide();
            } else {
                $('#datetimepicker').parents('.form-group').addClass('has-error');
                $('#datetimepicker').next().find('.error').show();
            }

        },
    });
    $scope.addSupervisor = function () {
        if ($scope.frm_addUser.$valid) {
            if (new Date($scope.userSupervisor.birth_date).getTime() > new Date().getTime()) {
                return Flash.create('error', message.date_birth_error);
            }
            $('#spinner_loading').removeClass('hide');
            $scope.userSupervisor.birth = (new Date($scope.userSupervisor.birth_date).getTime()) / 1000;
            $http({
                method: 'POST',
                url: BASE_PATH_API_OPERATOR + 'users/organization_add_supervisor',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.userSupervisor,
            }).then(function success(data) {
                $('#spinner_loading').addClass('hide');
                $location.path('operator/supervisor');
                Flash.create('success', data.data.message_ui);
            }, function error(data) {
                $('#spinner_loading').addClass('hide');
                Flash.create('error', data.data.message_ui);
            });
        }
    }
});