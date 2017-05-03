/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 15, 2017, 10:20:19 AM
 Author     : nguyen.xuan.tam
 */

/* global BASE_PATH_API_SUPERVISOR, transformRequestToUrlEncoded, message, app, BASE_PATH_API_OPERATOR, supervisor */

/**
 * 
 */
app.controller('detailProfileController', function ($scope, $http) {
    $('.remove-active-menu').trigger('click');
    setDefaulKeySearchAndPageCurent(supervisor);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'users/get_info_profile').then(function (data) {
        $scope.userSupervisor = data.data.data;
    });
    $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_info_profile_organization').then(function (data) {
        $scope.infoOperator = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
});
/**
 * 
 */
app.controller('editProfileController', function ($scope, $location, $window, $http, Flash) {
    $('.remove-active-menu').trigger('click');
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
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'users/get_info_profile').then(function (data) {
        $scope.userSupervisor = data.data.data;
        $scope.userSupervisor.birth_date = formatDate($scope.userSupervisor.birth);
        $('#spinner_loading').addClass('hide');

    });
    $scope.editProfile = function () {
        if ($scope.frm_edit_profile.$valid) {
            if (new Date($scope.userSupervisor.birth_date).getTime() > new Date().getTime()) {
                Flash.create('error', message.date_birth_error);
                return;
            }
            $('#spinner_loading').removeClass('hide');
            $scope.userSupervisor.birth = (new Date($scope.userSupervisor.birth_date).getTime()) / 1000;
            $http({
                method: 'PUT',
                url: BASE_PATH_API_SUPERVISOR + 'users/edit_profile',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.userSupervisor,
            }).then(function success(data) {
                $location.path('supervisor/profile');
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    };

});
/**
 * @function change password supervisor.
 */
app.controller('passwordProfileController', function ($scope, $location, $http, Flash) {
    $('.remove-active-menu').trigger('click');
    $scope.changPassword = function () {
        if ($scope.frm_change.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API_SUPERVISOR + "users/change_password",
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.supervisor,
            }).then(function (data) {
                $location.path("/supervisor/profile");
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function (data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
});

