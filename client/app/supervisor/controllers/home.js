/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 16, 2017, 10:27:27 AM
 Author     : nguyen.xuan.tam
 */

/* global app, BASE_PATH_API_SUPERVISOR, supervisor, message, transformRequestToUrlEncoded, $routeParams */

/**
 * 
 */
app.controller('homeController', function ($scope, $http, Flash) {
    $('.remove-active-menu').trigger('click');
    setDefaulKeySearchAndPageCurent(supervisor);
    $('#spinner_loading').removeClass('hide');
    var idPosition = -1;// -1 will not have index off groups.
    var getData = function () {
        $http.get(BASE_PATH_API_SUPERVISOR + 'groups/supervisor_list_group_and_count_dont_comment').then(function (data) {
            $scope.groups = data.data.data;
            $scope.currentPage = 1;
            $scope.maxsize = 7;
            $scope.itemsPerPage = 8;
            $scope.totalItems = $scope.groups.length;
            if (idPosition != -1) {
                $scope.group_name = $scope.groups[idPosition]['name'];
                $scope.groupStudent = $scope.groups[idPosition]['user_no_comment'];
            }
            $('#spinner_loading').addClass('hide');
        });
        $scope.studentNotComment = function (id) {
            idPosition = id;
            $scope.group_name = $scope.groups[idPosition]['name'];
            $scope.groupStudent = $scope.groups[idPosition]['user_no_comment'];
        };
    }
    getData();
    $scope.addComentStudent = function (id, description) {
        if (!description) {
            Flash.create('error', message.comment_error);
        } else {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'POST',
                url: BASE_PATH_API_SUPERVISOR + 'comments/add_comment/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: {'description': description},
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
});