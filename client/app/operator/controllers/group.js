/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 2:40:07 PM
 Author     : nguyen.xuan.tam
 */

/* global BASE_PATH_API_OPERATOR, transformRequestToUrlEncoded, app, message, operator */

operator.curentPageGroup = 1; // set page group when page load is 1;
operator.keyWordSearchIndexGroup = ''; // set keyword when page load is '';
operator.statusGroupBefor = 1; // back to list group.
app.controller('groupIndexController', function ($scope, $http, $filter, $window, Flash) {
    operator.statusGroupBefor = 1;
    setActiveMenuFirst(3);
    setDefaulKeySearchAndPageCurent(operator, ['curentPageGroup', 'keyWordSearchIndexGroup', 'statusGroupBefor']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'groups/organization_list_group').then(function (data) {
            $scope.groups = data.data.data;
            $scope.keyword = operator.keyWordSearchIndexGroup;
            paginate($scope, $scope.groups, operator.curentPageGroup);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                operator.keyWordSearchIndexGroup = newValue;
                var newData = $filter('filter')(data.data.data, newValue);
                $scope.pageChangeSearch = function (page) {
                    operator.curentPageGroup = 1;
                };
                $scope.groups = newData;
                paginate($scope, $scope.groups, operator.curentPageGroup);
            });
            $scope.pageChange = function (page) {
                operator.curentPageGroup = page;
            };
        });
    };
    getData();
    $scope.deleteGroup = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API_OPERATOR + 'groups/organization_delete_group/' + id
            }).then(function success(data) {
                getData();
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function errorCallback(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
});
/**
 * 
 */
app.controller('addGroupController', function ($scope, $location, $http, Flash) {
    setActiveMenuLast(3);
    $('.menu_section').find('ul:first').find('li:nth-child(3)').find('a').trigger('click');
    setDefaulKeySearchAndPageCurent(operator, ['curentPageGroup', 'keyWordSearchIndexGroup']);
    $scope.addGroup = function () {
        if ($scope.frm_add_group.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "POST",
                url: BASE_PATH_API_OPERATOR + 'groups/organization_add_group',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.group
            }).then(function success(data) {
                $location.path('operator/group');
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
});
/**
 * @date 27/3/2017
 * Edit controller
 */
app.controller('editGroupController', function ($scope, $routeParams, Flash, $http, $location, $filter, $window) {


    $scope.back = function () {
        if (operator.statusGroupBefor == 1) {
            setActiveMenuFirst(3);
            $location.path('operator/group');
        } else {
            $location.path('/');
        }
    }

    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_OPERATOR + 'groups/organization_get_info_group/' + $routeParams.id).then(function (data) {
        $scope.group = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
    $scope.editGroup = function () {
        if ($scope.frm_edit_group.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "PUT",
                url: BASE_PATH_API_OPERATOR + 'groups/organization_edit_info_group/' + $routeParams.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: transformRequestToUrlEncoded,
                data: $scope.group
            }).then(function success(data) {
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function error(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
    /**
     * date 27/3/2017
     * get list supervisor of operator in group
     */
    var curentPageSupervisorGroup = 1; // set page off list supervisor deffaul =1;
    var curentPageSupervisorGroupToAdd = 1; // set page off list supervisor add  deffaul =1;
    var curentPagelistStudent = 1; // set page off list student deffaul =1;
    var curentPageAddStudentGroupToAdd = 1; // set page off list student add deffaul =1;
    var getSupervisorOfGroup = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_supervisor_in_group/' + $routeParams.id).then(function (data) {
            $scope.supervisors = data.data.data;
            paginateSupervisor($scope, $scope.supervisors, curentPageSupervisorGroup);
            $scope.$watch('keywordListSupervisor', function (newValue, oldValue) {
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.filedsListSupervisor);
                $scope.pageChangeSearchListSupervisor = function (page) {
                    curentPageSupervisorGroup = 1;
                };
                $scope.supervisors = newData;
                paginateSupervisor($scope, $scope.supervisors, curentPageSupervisorGroup);
            });
            $scope.changePageListSupervisor = function (page) {
                curentPageSupervisorGroup = page;
            }
        });
    }
    getSupervisorOfGroup();
    /**
     * @date 27/3/2017
     * get list student of group
     */
    var getStudentsOfGroup = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_student_in_group/' + $routeParams.id).then(function (data) {
            $scope.students = data.data.data;
            paginateStudent($scope, $scope.students, curentPagelistStudent);
            $scope.$watch('keywordListSupervisor', function (newValue, oldValue) {
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.filedsListStudent);
                $scope.searchListStudent = function () {
                    curentPagelistStudent = 1;
                };
                $scope.students = newData;
                paginateStudent($scope, $scope.students, curentPagelistStudent);
            });
            $scope.changePageListStudent = function (page) {
                curentPagelistStudent = page;
            }
        });
    }
    getStudentsOfGroup();
    /**
     * date 27/3/2017
     * get list supervisor of operator to add
     */
    var getSupervisorNotHaveOfGroup = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_supervisor_dont_in_group/' + $routeParams.id).then(function (data) {
            $scope.addSupervisors = data.data.data;
            paginateSupervisorAdd($scope, $scope.addSupervisors, curentPageSupervisorGroupToAdd);
            $scope.$watch('keywordAddSupervisor', function (newValue, oldValue) {
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.filedsListSupervisorAdd);
                $scope.pageChangeSearchSupervisorAdd = function (page) {
                    curentPageSupervisorGroupToAdd = 1;
                };
                $scope.addSupervisors = newData;
                paginateSupervisorAdd($scope, $scope.addSupervisors, curentPageSupervisorGroupToAdd);
            });
            $scope.changePageSupervisorAdd = function (page) {
                curentPageSupervisorGroupToAdd = page;
            };
        });
    }
    getSupervisorNotHaveOfGroup();
    /**
     * @date 27/3/2017
     * get list student of operator not have group to add
     */
    var getStudentNotHaveIngroup = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'organizations/organization_get_list_student_dont_have_group').then(function (data) {
            $scope.addStudents = data.data.data;
            paginateStudentAdd($scope, $scope.addStudents, curentPageAddStudentGroupToAdd);
            $scope.$watch('keywordAddStudent', function (newValue, oldValue) {
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.filedsListStudentAdd);
                $scope.searchListAddStudent = function (page) {
                    curentPageAddStudentGroupToAdd = 1;
                };
                $scope.addStudents = newData;
                paginateStudentAdd($scope, $scope.addStudents, curentPageAddStudentGroupToAdd);
            });
            $scope.pageAddStudent = function (page) {
                curentPageAddStudentGroupToAdd = page;
            }
        });
    }
    getStudentNotHaveIngroup();
    /**
     * @7/3/2017
     * Add new supervisor to group.
     * @param {type} idSupervisor
     * @param {type} idGroup
     * @returns {undefined}
     */
    $scope.addSupervisorToGroup = function (idSupervisor, idGroup) {
        $('#spinner_loading').removeClass('hide');
        $http({
            method: "POST",
            url: BASE_PATH_API_OPERATOR + 'organizations/organization_add_user_to_group/' + idGroup + '/' + idSupervisor,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function success(data) {
            getSupervisorNotHaveOfGroup();
            getSupervisorOfGroup();
            Flash.create('success', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        }, function error(data) {
            Flash.create('error', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        });
    }
    /**
     * 
     * @param {type} idStudent
     * @param {type} idGroup
     * @returns {undefined}
     */

    $scope.deleteSupervisorOfGroup = function (idSupervisor, idGroup) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API_OPERATOR + 'organizations/organization_remove_user_in_group/' + idGroup + '/' + idSupervisor,
            }).then(function success(data) {
                getSupervisorNotHaveOfGroup();
                getSupervisorOfGroup();
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function errorCallback(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
    /**
     * Add new student to group
     * @param {type} idSupervisor
     * @param {type} idGroup
     * @returns {undefined}
     */
    $scope.addStudentToGroup = function (idStudent, idGroup) {
        $('#spinner_loading').removeClass('hide');
        $http({
            method: "POST",
            url: BASE_PATH_API_OPERATOR + 'organizations/organization_add_user_to_group/' + idGroup + '/' + idStudent,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function success(data) {
            getStudentsOfGroup();
            getStudentNotHaveIngroup();
            Flash.create('success', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        }, function error(data) {
            Flash.create('error', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        });
    }
    /**
     * 
     * @param {type} idStudent
     * @param {type} idGroup
     * @returns {undefined}
     */
    $scope.deleteStudentOfGroup = function (idStudent, idGroup) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API_OPERATOR + 'organizations/organization_remove_user_in_group/' + idGroup + '/' + idStudent,
            }).then(function success(data) {
                getStudentsOfGroup();
                getStudentNotHaveIngroup();
                Flash.create('success', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            }, function errorCallback(data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }

});

