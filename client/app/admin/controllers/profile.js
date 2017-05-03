/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 15, 2017, 10:20:19 AM
 Author     : nguyen.xuan.tam
 */

/* global BASE_PATH_API_ADMIN, transformRequestToUrlEncoded, app, message_update_success, message_update_error, admin */

/**
 * 
 */
app.controller('detailProfileController', function ($scope, $http) {
    //set '' for keyword search and page off list different.
    setDefaulKeySearchAndPageCurent(admin);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'users/admin_get_info_profile_admin').then(function (data) {
        $scope.adminUser = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
});
/**
 * 
 */
app.controller('editProfileController', function ($scope, $location, $http, Flash) {
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'users/admin_get_info_profile_admin').then(function (data) {
        $scope.adminUser = data.data.data;
        $('#spinner_loading').addClass('hide');
    });

    $scope.editProfile = function () {
        if ($scope.frm_editProfile.$valid) {
            alert('Chức năng đang được xây dựng.')
//            $http({
//                method: "PUT",
//                url: BASE_PATH_API_ADMIN + "users/admin_edit_profile_admin",
//                transformRequest: transformRequestToUrlEncoded,
//                headers: {
//                    'Content-Type': 'application/x-www-form-urlencoded',
//                },
//                data: $scope.adminUser,
//            }).then(function (response) {
//                if (response.status == 200) {
//                    $location.path("/admin/profile")
//                    Flash.create('success', message_update_success);
//                } else {
//                    Flash.create('error', message_update_error);
//                }
//            });
        }
    };

});
/**
 * @function change password supervisor.
 */
app.controller('passwordProfileController', function ($scope, $location, $http, Flash) {
    $scope.changPassword = function () {
        if ($scope.frm_change.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API_ADMIN + "users/admin_change_password",
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.adminUser,
            }).then(function success(data) {
                $location.path("/admin/profile");
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
});

