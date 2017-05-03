/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 15, 2017, 10:20:19 AM
 Author     : nguyen.xuan.tam
 */

/* global transformRequestToUrlEncoded, BASE_PATH_API_ADMIN, message, operator, app, BASE_PATH_API_OPERATOR */

/**
 * 
 */
app.controller('detailProfileController', function ($scope, $location, $window, $http) {
    $('.remove-active-menu').trigger('click');
    setDefaulKeySearchAndPageCurent(operator);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_OPERATOR + 'users/get_info_profile').then(function (data) {
        $scope.userOperator = data.data.data;
        $('#spinner_loading').addClass('hide');

    });
    $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_info_profile_organization').then(function (data) {
        $scope.infoOperator = data.data.data;
    });

});
/**
 * 
 */
app.controller('editProfileController', function ($scope, $location, $window, $http, Flash) {
    $('.remove-active-menu').trigger('click');
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_OPERATOR + 'users/get_info_profile').then(function (data) {
        $scope.operator_update = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
    $scope.editProfile = function () {
        if ($scope.frm_edit_profile.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API_OPERATOR + "users/edit_profile",
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    'name': $scope.operator_update.name,
                    'email': $scope.operator_update.email
                },
            }).then(function (data) {
                $('#spinner_loading').addClass('hide');
                $location.path("/operator/profile");
                Flash.create('success', data.data.message_ui);
            }, function (data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }

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
                url: BASE_PATH_API_OPERATOR + "users/change_password",
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.operator,
            }).then(function (data) {
                $('#spinner_loading').addClass('hide');
                $location.path("/operator/profile");
                Flash.create('success', data.data.message_ui);
            }, function (data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
});

