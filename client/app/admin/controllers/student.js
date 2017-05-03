/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

/* global app, BASE_PATH_API_ADMIN, admin */

admin.curentPageStudent = 1; //set page deffaul for list student is 1.
admin.keyWordSearchIndexSupervisoStudent; //set keyword search deffaul for list student is null.
admin.keyWordOffSelect = '';
var checkPaginateChange = false; /// check satus search by operator
app.controller('indexStudentController', function ($scope, $http, $location, $filter, $window, Flash, $timeout) {
    setActiveMenuLast(1);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageStudent', 'keyWordSearchIndexSupervisoStudent', 'keyWordOffSelect']);
    $('#spinner_loading').removeClass('hide');
    var getAllData = function () {
        $http.get(BASE_PATH_API_ADMIN + 'users/admin_list_student').then(function (data) {
            $scope.students = data.data.data;
            $scope.keyword = admin.keyWordSearchIndexSupervisoStudent;
            paginate($scope, $scope.students, admin.curentPageStudent);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.keyWordSearchIndexSupervisoStudent = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.curentPageStudent = 1;
                };
                $scope.students = newData;
                paginate($scope, $scope.students, admin.curentPageStudent);
            });
            $scope.pageChange = function (page) {
                admin.curentPageStudent = page;
            };
        });
    };
    // check if back from detail and show
    var getdataSearch = function (id) {
        $http.get(BASE_PATH_API_ADMIN + 'users/admin_list_student_by_organizations/' + id).then(function (data) {
            $scope.students = data.data.data;
            $scope.keyword = admin.keyWordSearchIndexSupervisoStudent;
            paginate($scope, $scope.students, admin.curentPageStudent);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                admin.keyWordSearchIndexSupervisoStudent = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    admin.curentPageStudent = 1;
                };
                $scope.students = newData;
                paginate($scope, $scope.students, admin.curentPageStudent);
            });
            $scope.pageChange = function (page) {
                admin.curentPageStudent = page;
            };
        });
    };
    if (!admin.keyWordOffSelect) {
        getAllData();
    } else {
        $timeout(function () {
            $('select').val(admin.keyWordOffSelect).trigger("change");
        }, 300);
    }
    /**
     * 
     */
    $http.get(BASE_PATH_API_ADMIN + 'organizations/admin_list_organization').then(function (data) {
        $scope.operators = data.data.data;
        $('select').select2();
    });
    $('select').on("change", function () {
        admin.keyWordOffSelect = this.value;
        if (!checkPaginateChange) {
            admin.curentPageStudent = 1;
        }
        if (!admin.keyWordOffSelect) {
            getAllData();
        } else {
            getdataSearch(admin.keyWordOffSelect);
        }
        $timeout(function () {
            checkPaginateChange = false;
        }, 200);
    });
});
/**
 * 
 */
app.controller('detailStudentController', function ($scope, $routeParams, $http, $location) {
    checkPaginateChange = true;
    setActiveMenuFirst(1);
    $scope.student = {
        _id: '12312bf43434434',
        name: 'Tam nx',
        email: 'tamnx@gmail.com',
        address: 'Hà nội - Việt Nam',
        phone: '0972722994',
        sex: 'nam',
        birth: '1994/27/06',
    };
    $('.item_average_exercise').height($('#content_exercise').height());
});
/**
 * 
 */
app.controller('profileStudentController', function ($scope, $routeParams, $http, $location) {
    checkPaginateChange = true;
    setActiveMenuFirst(1);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'users/get_info_profile_student/' + $routeParams.id).then(function (data) {
        $scope.student = data.data.data;
        $scope.student.countEducation = data.data.data.educations.length;
        $scope.student.countEmployment_history = data.data.data.employment_history.length;
        $scope.student.countFamily = data.data.data.family.length;
        $('#spinner_loading').addClass('hide');
    });
});