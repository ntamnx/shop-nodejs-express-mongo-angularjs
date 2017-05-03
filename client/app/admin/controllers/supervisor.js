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

admin.curentPageSupervisor = 1; //set page deffaul for list supervisr is 1.
admin.keyWordSearchIndexSupervisor; //  set deffaul key word seach list supervisro is null when page load success.
app.controller('indexSupervisorController', function ($scope, $http, $location, $filter, $window, Flash) {
    setActiveMenuFirst(3);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageSupervisor', 'keyWordSearchIndexSupervisor']);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'users/admin_list_supervisor').then(function (data) {
        $('#spinner_loading').addClass('hide');
        $scope.supervisors = data.data.data;
        $scope.keyword = admin.keyWordSearchIndexSupervisor;
        paginate($scope, $scope.supervisors, admin.curentPageSupervisor);
        $scope.$watch('keyword', function (newValue, oldValue) {
            admin.keyWordSearchIndexSupervisor = newValue;
            var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
            $scope.pageChangeSearch = function (page) {
                admin.curentPageSupervisor = 1;
            };
            $scope.supervisors = newData;
            paginate($scope, $scope.supervisors, admin.curentPageSupervisor);
        });
        $scope.pageChange = function (page) {
            admin.curentPageSupervisor = page;
        };
        $scope.searchByOperator = function (keyword) {
            var newData = $filter('customSearchCorect')(data.data.data, keyword, ['name_organization']);
            $scope.pageChangeSearch = function (page) {
                admin.curentPageSupervisor = 1;
            };
            $scope.supervisors = newData;
            paginate($scope, $scope.supervisors, admin.curentPageSupervisor);
        }
    });
});
/**
 * 
 */
app.controller('detailSupervisorController', function ($scope, $routeParams, $http) {
    setActiveMenuFirst(3);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'users/get_profile_user/' + $routeParams.id).then(function (data) {
        $scope.userSupervisor = data.data.data;
        $http.get(BASE_PATH_API_ADMIN + 'organizations/admin_get_info_profile_organization/' + data.data.data.organization_id).then(function (data) {
            $scope.infoSupervisor = data.data.data;
            $('#spinner_loading').addClass('hide');
        });
    });
});