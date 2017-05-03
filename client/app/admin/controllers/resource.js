/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

/* global BASE_PATH_API_ADMIN, app, fileUpload, message, admin */

/**
 * curentPageResource parram value for page paination.
 * keyWordSearchIndexResource parram value for keyword searchs.
 * @type Number|page
 */
admin.curentPageResource = 1; // set page deffaul off list resourec is 1;
admin.keyWordSearchIndexResource; // set key word search list resource is one.
app.controller('indexResourceController', function ($scope, $http, $filter) {
    setActiveMenuFirst(4);
    setDefaulKeySearchAndPageCurent(admin, ['curentPageResource', 'keyWordSearchIndexResource']);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'lesson/admin_list_lesson').then(function (data) {
        $('#spinner_loading').addClass('hide');
        $scope.resources = data.data.data;
        $scope.keyword = admin.keyWordSearchIndexResource;
        paginate($scope, $scope.resources, admin.curentPageResource);
        $scope.$watch('keyword', function (newValue, oldValue) {
            admin.keyWordSearchIndexResource = newValue;
            var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
            $scope.pageChangeSearch = function (page) {
                admin.curentPageResource = 1;
            };
            $scope.resources = newData;
            paginate($scope, $scope.resources, admin.curentPageResource);
        });
        $scope.pageChange = function (page) {
            admin.curentPageResource = page;
        };
    });
});
/**
 * @date 5/4/2017
 * edit resource controller
 */

app.controller('editResourceController', function ($scope, $location, $http, $routeParams, Flash, Upload) {
    setActiveMenuFirst(4);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'lesson/admin_get_lesson/' + $routeParams.id).then(function (data) {
        $scope.resource = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
    var options = {height: "200px", width: "200px", line_width: 12, color: "#48CFAD", starting_position: 0, percent: 0, text: "percent"};
    var progress_circle = $("#progress-circle").gmpc(options);
    $scope.updateResource = function () {
        if ($scope.frm_update_resource.$valid) {
            if (typeof ($scope.file) === 'undefined') {
                Flash.create('error', message.file_error);
            } else {
                var extension_file = $scope.file.name.substr($scope.file.name.lastIndexOf('.') + 1);
                if (extension_file === "rar" || extension_file === "zip") {
                    $('#swaper_progress_bar').removeClass('hide');
                    Upload.upload({
                        url: BASE_PATH_API_ADMIN + 'lesson/admin_edit_lesson/' + $routeParams.id,
                        data: {
                            link: $scope.file,
                            name: $scope.resource.name
                        }
                    }).then(function (data) {
                        $('#swaper_progress_bar').addClass('hide');
                        $location.path('/admin/resource');
                        Flash.create('success', data.data.message_ui);
                    }, function (data) {
                        Flash.create('error', data.data.message_ui);
                    }, function (evt) {
                        var progressPercentage = parseInt(100 * evt.loaded / evt.total);
                        progress_circle.gmpc('percent', progressPercentage);
                    });
                } else {
                    Flash.create('error', message.file_error_extension);
                }
            }
        }
    };
});