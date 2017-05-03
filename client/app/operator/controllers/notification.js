/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 27, 2017, 4:40:34 PM
 Author     : nguyen.xuan.tam
 */

/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 27, 2017, 3:16:06 PM
 Author     : nguyen.xuan.tam
 */
/* global operator, app, BASE_PATH_API_OPERATOR */

operator.keyWordSearchNotification = ''; // set keyword search deffaul ='' when page load.
operator.curentPageNotification = 1; // set curent page ='1' when page load.
app.controller('indexNotificationController', function ($scope, $filter, $http) {
    setActiveMenuFirst(5);
    setDefaulKeySearchAndPageCurent(operator, ['keyWordSearchNotification', 'curentPageNotification']);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_OPERATOR + 'news/organization_get_list_new_of_admin').then(function (data) {
        $scope.news = data.data.data;
        $scope.keyword = operator.keyWordSearchNotification;
        paginate($scope, $scope.news, operator.curentPageNotification);
        $('#spinner_loading').addClass('hide');
        $scope.$watch('keyword', function (newValue, oldValue) {
            operator.keyWordSearchNotification = newValue;
            var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
            $scope.pageChangeSearch = function (page) {
                operator.curentPageNotification = 1;
            };
            $scope.news = newData;
            paginate($scope, $scope.news, operator.curentPageNotification);
        });
        $scope.pageChange = function (page) {
            operator.curentPageNotification = page;
        };
    });
});
/**
 * 
 */
app.controller('detailNotificationController', function ($scope, $location, $routeParams, $window, $http, Flash, $filter) {
    setActiveMenuFirst(5);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_OPERATOR + 'news/get_new_of_admin/' + $routeParams.id).then(function (data) {
        $scope.notification = data.data.data;
        $('#spinner_loading').addClass('hide');
    });

});
