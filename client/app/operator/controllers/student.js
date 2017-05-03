/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 2:40:07 PM
 Author     : nguyen.xuan.tam
 */
/* global message, BASE_PATH_API_ADMIN, app, transformRequestToUrlEncoded, BASE_PATH_API_OPERATOR, operator */

operator.curentPageStudent = 1; // set curent page off list sutudent=1 when page load.
operator.keyWordSearchIndexStudent = '';// set keyword search off lists sutudent='' when page load.
operator.curentPageAddStudent = 1;// set curent page off list add  sutudent=1 when page load.
operator.keyWordSearchAddStudent = ''; // set keyword search off list add  sutudent='' when page load.
var listStudentSelected = [];// list off student select for print.
var infoStudent_for_print = {}; // infor description type print for print
app.controller('studentIndexController', function ($scope, $http, $location, $filter, $window, Flash) {
    $('.nav_menu').show();
    $('footer').show();
    setActiveMenuFirst(2);
    setDefaulKeySearchAndPageCurent(operator, ['curentPageStudent', 'keyWordSearchIndexStudent']);
    var getData = function () {
        $('#spinner_loading').removeClass('hide');
        $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_student_in_organization').then(function (data) {
            $('#spinner_loading').addClass('hide');
            $scope.students = data.data.data;
            for (var i = 0; i < $scope.students.length; i++)
            {
                $scope.students[i].tick = false;
            }
            $scope.keyword = operator.keyWordSearchIndexStudent;
            paginate($scope, $scope.students, operator.curentPageStudent);
            $scope.$watch('keyword', function (newValue, oldValue) {
                operator.keyWordSearchIndexStudent = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    operator.curentPageStudent = 1;
                };
                $scope.students = newData;
                paginate($scope, $scope.students, operator.curentPageStudent);
            });
            $scope.pageChange = function (page) {
                operator.curentPageStudent = page;
            };
        });
    }
    getData();
    /**
     * 
     * @param {type} data
     * @returns {undefined}
     */
    $scope.changeCheckAll = function (data) {
        if (data)
            for (var i = 0; i < $scope.students.length; i++)
            {
                $scope.students[i].tick = true;
            }
        else {
            for (var i = 0; i < $scope.students.length; i++)
            {
                $scope.students[i].tick = false;
            }
        }
    };
    /**
     * 
     * @returns {undefined}
     */
    $scope.printStudent = function () {
        listStudentSelected = [];
        for (var i = 0; i < $scope.students.length; i++)
        {
            if ($scope.students[i].tick) {
                listStudentSelected.push($scope.students[i]._id);
            }
        }
        if (!listStudentSelected.length) {
            Flash.create('error', message.message_print_error);
        } else {
            $location.path("/operator/student/print");
        }
    };
    /**
     * 
     * @param {type} id
     * @returns {undefined}
     */
    $scope.deleteStudent = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API_OPERATOR + 'organizations/organization_delete_student_in_organization/' + id
            }).then(function success(data) {
                getData();
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
app.controller('addStudentController', function ($scope, $http, $window, $filter, Flash) {
    setActiveMenuLast(2);
    angular.forEach(operator, function (value, key) {
        if (key !== "keyWordSearchAddStudent" && key !== "curentPageAddStudent") {
            operator[key] = '';
        }
    });
    setDefaulKeySearchAndPageCurent(operator, ['keyWordSearchAddStudent', 'curentPageAddStudent']);
    var getData = function () {
        $('#spinner_loading').removeClass('hide');
        $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_request_dont_accept').then(function (data) {
            $scope.students = data.data.data;
            $scope.keyword = operator.keyWordSearchAddStudent;
            paginate($scope, $scope.students, operator.curentPageAddStudent);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                operator.keyWordSearchAddStudent = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    operator.curentPageAddStudent = 1;
                };
                $scope.students = newData;
                paginate($scope, $scope.students, operator.curentPageAddStudent);
            });
            $scope.pageChange = function (page) {
                operator.curentPageAddStudent = page;
            };

        });
    }
    getData();
    /**
     * 
     */
    $scope.addStudent = function () {
        if ($scope.frm_add_student.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'POST',
                url: BASE_PATH_API_OPERATOR + 'organizations/organization_send_request_to_student',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.student,
            }).then(function success(data) {
                getData();
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
     */
    $scope.cancelStudent = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'DELETE',
                url: BASE_PATH_API_OPERATOR + 'organizations/organization_delete_request_dont_accept/' + id,
            }).then(function success(data) {
                getData();
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
app.controller('detailStudentController', function ($scope, $routeParams, $http, $location, $timeout) {
    setActiveMenuFirst(2);
    $scope.student = {
        _id: '12312bf43434434',
        name: 'Tam nx',
        email: 'tamnx@gmail.com',
        address: 'Hà nội - Việt Nam',
        phone: '0972722994',
        sex: 'nam',
        birth: '1994/27/06',
    }
    $('.item_average_exercise').height($('#content_exercise').height());

});
/**
 * 
 */
app.controller('profileStudentController', function ($scope, $routeParams, $http, $location) {
    setActiveMenuFirst(2);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_SUPERVISOR + 'users/get_info_profile_student/' + $routeParams.id).then(function (data) {
        $scope.student = data.data.data;
        $scope.student.countEducation = data.data.data.educations.length;
        $scope.student.countEmployment_history = data.data.data.employment_history.length;
        $scope.student.countFamily = data.data.data.family.length;
        $('#spinner_loading').addClass('hide');
    });
});
/**
 * 
 */
app.controller('printStudentController', function ($scope, $http, $location, Flash, $filter) {
    setActiveMenuFirst(2);
    $('.nav_menu').show();
    $('footer').show();
    if (!listStudentSelected.length) {
        return $location.path('operator/student');
    }
    console.log(listStudentSelected);
    $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_student_in_organization').then(function (data) {
        $scope.students = data.data.data;
        paginate($scope, $scope.students, operator.curentPageAddStudent);
        $scope.pageChange = function (page) {
            operator.curentPageAddStudent = page;
        };
    });
    $scope.reverse = true;
    $scope.field_order = "name";
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.field_order === propertyName) ? !$scope.reverse : false;
        $scope.field_order = propertyName;
        $scope.students = $filter('orderBy')($scope.students, $scope.field_order, $scope.reverse);
    };

    $scope.printPDF = function () {
        if (!$scope.printDescription || !$scope.printDescription.description1 || !$scope.printDescription.description2) {
            Flash.create('error', message.confirm_input_description);
        } else if (!$scope.print) {
            Flash.create('error', message.confirm_select_type_for_print);
        } else {
            infoStudent_for_print = {
                description: $scope.printDescription,
                print: $scope.print,
            }
            $location.path('/operator/student/print-data');
        }
    }
});
/**
 * 
 */
app.controller('executePrintData', function ($scope, $timeout, $location, $http) {
    $('.nav_menu').hide();
    $('footer').hide();
    $scope.description = {
        description: infoStudent_for_print.description.description1,
        description1: infoStudent_for_print.description.description2,
    };
    $scope.student = {
        _id: '12312bf43434434',
        name: 'Tam nx',
        email: 'tamnx@gmail.com',
        address: 'Hà nội - Việt Nam',
        phone: '0972722994',
        sex: 'nam',
        birth: '1994/27/06',
    }
    $scope.date = new Date();
    $timeout(function () {
        window.print();
        $location.path("operator/student/print");
    }, 100);

});