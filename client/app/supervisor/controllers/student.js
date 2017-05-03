/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 15, 2017, 10:20:19 AM
 Author     : nguyen.xuan.tam
 */

/* global BASE_PATH_API_SUPERVISOR, app, message, BASE_PATH_API_OPERATOR, transformRequestToUrlEncoded, supervisor, $window, BASE_PATH_API_ADMIN, id, commentUpdate */

supervisor.curentPageStudent = 1; // set page defaul page loadd off list student  = 1;
supervisor.keyWordSearchIndexStudent = ''; // set keyword search deffaul page load student ='';
supervisor.id_group_before; // store id of list sutudent fllow group when lick to detail or ifomation click back redirect to sutudent off group
app.controller('indexStudentController', function ($scope, $http, $routeParams, $filter) {
    $('.nav_menu').show();
    $('footer').show();
    setActiveMenuFirst(1);
    setDefaulKeySearchAndPageCurent(supervisor, ['curentPageStudent', 'keyWordSearchIndexStudent']);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'groups/supervisor_get_list_student_in_group/' + $routeParams.id).then(function (data) {
        supervisor.id_group_before = $routeParams.id;
        $scope.students = data.data.data;
        $scope.keyword = supervisor.keyWordSearchIndexStudent;
        paginate($scope, $scope.students, supervisor.curentPageStudent);
        $('#spinner_loading').addClass('hide');
        $scope.$watch('keyword', function (newValue, oldValue) {
            supervisor.keyWordSearchIndexStudent = newValue;
            var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
            $scope.pageChangeSearch = function (page) {
                supervisor.curentPageStudent = 1;
            };
            $scope.students = newData;
            paginate($scope, $scope.students, supervisor.curentPageStudent);
        });
        $scope.pageChange = function (page) {
            supervisor.curentPageStudent = page;
        };
    });
});
/**
 * 
 */
app.controller('detailStudentController', function ($scope, $routeParams, $http, Flash, $window) {
    $('.nav_menu').show();
    $('footer').show();
    setActiveMenuFirst(1);
    $("#spinner_loading").removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'users/get_info_profile_student/' + $routeParams.id).then(function (data) {
        $scope.student = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
    $scope.id_group_before = supervisor.id_group_before;
    var curentPageComent = 1; // page deffaul off commnet is 1.
    var getComment = function () {
        $("#spinner_loading").removeClass('hide');
        $http.get(BASE_PATH_API_SUPERVISOR + 'comments/get_list_comment/' + $routeParams.id).then(function (data) {
            $scope.comments = data.data.data;
            paginateHome($scope, $scope.comments, curentPageComent);
            $('#spinner_loading').addClass('hide');
            $scope.pageChange = function (page) {
                curentPageComent = page;
            };
        });

    };
    getComment();
    /**
     * 
     */
    $('.item_average_exercise').height($('#content_exercise').height());
    $scope.addComment = function () {
        if ($scope.frm_add_comment.$valid) {
            $("#spinner_loading").removeClass('hide');
            $http({
                method: 'POST',
                url: BASE_PATH_API_SUPERVISOR + 'comments/add_comment/' + $routeParams.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.teacher,
            }).then(function success(data) {
                getComment();
                Flash.create('success', data.data.message_ui);
                $("#spinner_loading").addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $("#spinner_loading").addClass('hide');
            });
        }
    }
    /**
     * 
     * @returns {undefined}
     */
    $scope.deleteComent = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API_SUPERVISOR + 'comments/delete_comment/' + id
            }).then(function success(data) {
                getComment();
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
    /**
     * 
     * @param {type} id
     * @param {type} description
     * @returns {undefined}
     */
    $scope.commentUpdate = {};
    var idComment = '';
    $scope.updateComment = function (id, description) {
        idComment = id;
        $scope.commentUpdate.description = description;
    }
    /**
     * 
     */
    $scope.editComment = function () {
        if ($scope.frm_edit_comment.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API_SUPERVISOR + 'comments/edit_comment/' + idComment,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.commentUpdate
            }).then(function success(data) {
                getComment();
                $('#exampleModal').modal('toggle');
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }

});
/**
 * 
 */
app.controller('profileStudentController', function ($scope, $http, $routeParams) {
    setActiveMenuFirst(1);
    $scope.id_group_before = supervisor.id_group_before;
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'users/get_info_profile_student/' + $routeParams.id).then(function (data) {
        $scope.student = data.data.data;
        $scope.student.countEducation = data.data.data.educations.length;
        $scope.student.countEmployment_history = data.data.data.employment_history.length;
        $scope.student.countFamily = data.data.data.family.length;
        $('#spinner_loading').addClass('hide');
    });
});
app.controller('groupStudentController', function ($scope, $http) {
    setActiveMenuFirst(1);
    setDefaulKeySearchAndPageCurent(supervisor);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'groups/supervisor_list_group').then(function (data) {
        $scope.groups = data.data.data;
        $scope.currentPage = 1;
        $scope.maxsize = 7;
        $scope.itemsPerPage = 12;
        $scope.totalItems = $scope.groups.length;
        $('#spinner_loading').addClass('hide');
    });
});
app.controller('executePrintData', function ($scope, $http, $window, $location, $timeout) {
    $('.nav_menu').hide();
    $('footer').hide();
    $scope.student = {
        _id: '58dddba53185a7a626257f07',
        name: 'Tam nx',
        email: 'tamnx@gmail.com',
        address: 'Hà nội - Việt Nam',
        phone: '0972722994',
        sex: 'nam',
        birth: '1994/27/06',
    }
    $timeout(function () {
        $window.print();
        $location.path("supervisor/student/" + $scope.student._id);
    }, 100);
});

