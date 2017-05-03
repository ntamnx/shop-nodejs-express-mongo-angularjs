/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 16, 2017, 10:27:27 AM
 Author     : nguyen.xuan.tam
 */

/* global operator, app, BASE_PATH_API_OPERATOR */

/**
 * 
 */

app.controller('homeController', function ($scope, $location, $filter, $http, Flash) {
    $('.remove-active-menu').trigger('click');
    setDefaulKeySearchAndPageCurent(operator);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_OPERATOR + 'groups/organization_list_group').then(function (data) {
        $scope.groups = data.data.data;
        $scope.currentPageGroup = 1;
        $scope.maxsizeGroup = 7;
        $scope.itemsPerPageGroup = 8;
        $scope.totalItemsGroup = $scope.groups.length;
        $('#spinner_loading').addClass('hide');
    });
    var homeCurentPageStudent = 1; // set page list student in home deffaul =1;
    var getStudent = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_student_dont_have_group').then(function (data) {
            $scope.students = data.data.data;
            paginateHome($scope, $scope.students, homeCurentPageStudent);
            $scope.$watch('keyword', function (newValue, oldValue) {
                var newData = $filter('filter')(data.data.data, newValue);
                $scope.pageChangeSearch = function (page) {
                    homeCurentPageStudent = 1;
                };
                $scope.students = newData;
                paginateHome($scope, $scope.students, homeCurentPageStudent);
            });
            $scope.pageChange = function (page) {
                homeCurentPageStudent = page;
            };

        });
    };
    getStudent();
    /**
     * Thêm học sinh tới group
     */
    $scope.changeGroup = function (id_student, id_group)
    {
        $('#spinner_loading').removeClass('hide');
        $http({
            method: "POST",
            url: BASE_PATH_API_OPERATOR + 'organizations/organization_add_user_to_group/' + id_group + '/' + id_student,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function success(data) {
            getStudent();
            Flash.create('success', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        }, function error(data) {
            Flash.create('error', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        });
    };
});