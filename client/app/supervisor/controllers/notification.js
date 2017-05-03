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
/* global supervisor, BASE_PATH_API_SUPERVISOR, app */

supervisor.keyWordSearchNotification = ''; // set key word search list notification is '' when page load;
supervisor.curentPageNotification = 1; // set page curent 1 list notification is 1 when page load;
app.controller('indexNotificationController', function ($scope, $filter, $http) {
    setActiveMenuLast(2);
    setDefaulKeySearchAndPageCurent(supervisor, ['keyWordSearchNotification', 'curentPageNotification']);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'news/list_news').then(function (data) {
        $scope.news = data.data.data;
        $scope.keyword = supervisor.keyWordSearchNotification;
        paginate($scope, $scope.news, supervisor.curentPageNotification);
        $('#spinner_loading').addClass('hide');
        $scope.$watch('keyword', function (newValue, oldValue) {
            supervisor.keyWordSearchNotification = newValue;
            var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
            $scope.pageChangeSearch = function (page) {
                supervisor.curentPageNotification = 1;
            };
            $scope.news = newData;
            paginate($scope, $scope.news, supervisor.curentPageNotification);
        });
        $scope.pageChange = function (page) {
            supervisor.curentPageNotification = page;
        };
    });

});
/**
 * 
 */
app.controller('detailNotificationController', function ($scope, $http, $routeParams, Flash, $filter) {
    setActiveMenuLast(2);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'news/get_new/' + $routeParams.id).then(function (data) {
        $scope.notification = data.data.data;
        $('#spinner_loading').addClass('hide');
    });

});
