/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 27, 2017, 3:16:06 PM
 Author     : nguyen.xuan.tam
 */
/* global BASE_PATH_API_OPERATOR, message, app, operator, transformRequestToUrlEncoded */

operator.curentPageSending = 1; // set page default for list new sending when page load.
operator.keyWordSearchSendding = '';// set keyword default for list new sending when page load.
operator.curentPageNew = 1; // set page deffaul when page load list new.
operator.keyWordSearchNew = ''; // set keyword deffault page load list new.
status_add = 1; //check status of affter next to page add. Back to list sending or to list new. if is "1" back to list new. else back to list sending
app.controller('indexNewController', function ($scope, $window, $http, $filter, Flash) {
    setActiveMenuFirst(4);
    status_add = 1;
    setDefaulKeySearchAndPageCurent(operator, ['curentPageNew', 'keyWordSearchNew']);
    var getData = function () {
        $('#spinner_loading').removeClass('hide');
        $http.get(BASE_PATH_API_OPERATOR + 'news/organization_get_list_new_send').then(function (data) {
            $scope.news = data.data.data;
            $scope.keyword = operator.keyWordSearchNew;
            paginate($scope, $scope.news, operator.curentPageNew);
            $('#spinner_loading').addClass('hide');
            $scope.$watch('keyword', function (newValue, oldValue) {
                operator.keyWordSearchNew = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    operator.curentPageNew = 1;
                };
                $scope.news = newData;
                paginate($scope, $scope.news, operator.curentPageNew);
            });
            $scope.pageChange = function (page) {
                operator.curentPageNew = page;
            };
        });
    }
    getData();
    $scope.deleteNew = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: "DELETE",
                url: BASE_PATH_API_OPERATOR + 'news/organization_delete_news/' + id
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
app.controller('addNewController', function ($scope, $location, $window, $http, Flash, $filter) {
    if (status_add == 1) {
        setActiveMenuFirst(4);
    } else {
        setActiveMenuLast(4);
    }
    $scope.back = function () {
        if (status_add == 2) {
            $location.path('operator/new/sending');
        } else {
            $location.path('operator/new');
        }
    }
    jQuery.datetimepicker.setLocale(message.lang);
    $('#datetimepicker').datetimepicker({
        minDate: 0,
        onChangeDateTime: function () {
            $scope.operator_new.time_send = $('#datetimepicker').val();
            if ($('#datetimepicker').val()) {
                $('#datetimepicker').parents('.form-group').removeClass('has-error');
                $('#datetimepicker').next().find('.error').hide();
            } else {
                $('#datetimepicker').parents('.form-group').addClass('has-error');
                $('#datetimepicker').next().find('.error').show();
            }
        },
    });
    /**
     * 
     * @type Number
     */
    $('#spinner_loading').removeClass('hide');
    var curentPageGroupInNew = 1;
    $http.get(BASE_PATH_API_OPERATOR + 'groups/organization_list_group').then(function (data) {
        $scope.groups = data.data.data;
        for (var i = 0; i < $scope.groups.length; i++) {
            $scope.groups[i].tick = false;
        }
        $('#spinner_loading').addClass('hide');

    });
    $scope.changeStatus = function (index) {
        $scope.groups[index].tick = !$scope.groups[index].tick;
    };
    /**
     * 
     * @returns {undefined}
     */
    $scope.addNew = function () {
        var sendforGrop = [];
        if ($scope.frm_add_new.$valid) {
            if (($scope.operator_new.type_send == "late") && new Date($scope.operator_new.time_send).getTime() < new Date().getTime()) {
                Flash.create('error', message.date_new_error);
                return;
            }
            for (var i = 0; i < $scope.groups.length; i++)
            {
                if ($scope.groups[i].tick) {
                    sendforGrop.push($scope.groups[i]._id);
                }
            }
            if ($scope.operator_new.student_free) {
                sendforGrop.push('0');
            }
            if (!sendforGrop.length) {
                Flash.create('error', message.slect_address_send_new);
                return;
            }
            $('#spinner_loading').removeClass('hide');
            var itemNew = {
                title: $scope.operator_new.title,
                description: $scope.operator_new.desciption,
                is_booking: $scope.operator_new.type_send == "immediate" ? false : true,
                date_booking: (new Date($scope.operator_new.time_send).getTime()) / 1000,
                group_id: JSON.stringify(sendforGrop),
            };
            $http({
                method: 'POST',
                url: BASE_PATH_API_OPERATOR + 'news/organization_add_news',
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: itemNew,
            }).then(function (data) {
                $('#spinner_loading').addClass('hide');
                Flash.create('success', data.data.message_ui);
                if ((itemNew.is_booking) == false) {
                    $location.path("/operator/new");
                } else {
                    $location.path("operator/new/sending");
                }
            }, function (data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    };
    /**
     * 
     * @param {type} status
     * @returns {undefined}
     */
    $scope.checkAllGroup = function (status) {
        if (status) {
            for (var i = 0; i < $scope.groups.length; i++) {
                $scope.groups[i].tick = true;
            }
        } else {
            for (var i = 0; i < $scope.groups.length; i++) {
                $scope.groups[i].tick = false;
            }
        }
    }
});
/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('sendingNewController', function ($scope, $location, $window, $http, Flash, $filter) {
    setActiveMenuLast(4);
    status_add = 2;
    setDefaulKeySearchAndPageCurent(operator, ['curentPageSending', 'keyWordSearchSendding']);
    $('#spinner_loading').removeClass('hide');
    var getData = function () {
        $http.get(BASE_PATH_API_OPERATOR + 'news/organization_get_list_new_booking').then(function (data) {
            $('#spinner_loading').addClass('hide');
            $scope.sendings = data.data.data;
            $scope.keyword = operator.keyWordSearchSendding;
            paginate($scope, $scope.sendings, operator.curentPageSending);
            $scope.$watch('keyword', function (newValue, oldValue) {
                operator.keyWordSearchSendding = newValue;
                var newData = $filter('customSearch')(data.data.data, newValue, $scope.fileds);
                $scope.pageChangeSearch = function (page) {
                    operator.curentPageSending = 1;
                };
                $scope.sendings = newData;
                paginate($scope, $scope.sendings, operator.curentPageSending);
            });
            $scope.pageChange = function (page) {
                operator.curentPageSending = page;
            };
        });
    }
    getData();
    /**
     * 
     * @returns {undefined}
     */
    $scope.deleteNew = function (id) {
        if ($window.confirm(message.confirm_delete)) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'DELETE',
                url: BASE_PATH_API_OPERATOR + 'news/organization_delete_news/' + id,
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
//**
/**
 * 
 */
app.controller('editNewController', function ($scope, $location, $routeParams, $window, $http, Flash, $filter) {
    setActiveMenuLast(4);
    var checkDate = false;
    jQuery.datetimepicker.setLocale(message.lang);
    $('#datetimepicker').datetimepicker({
        minDate: 0,
        onChangeDateTime: function () {
            checkDate = true;
            $scope.operator_new.date_booking = $('#datetimepicker').val();
            if ($('#datetimepicker').val()) {
                $('#datetimepicker').parents('.form-group').removeClass('has-error');
                $('#datetimepicker').next().find('.error').hide();
            } else {
                $('#datetimepicker').parents('.form-group').addClass('has-error');
                $('#datetimepicker').next().find('.error').show();
            }
        },
    });
    $('#spinner_loading').removeClass('hide');

    $http.get(BASE_PATH_API_OPERATOR + 'news/organization_get_new/' + $routeParams.id).then(function (data) {
        $scope.operator_new = data.data.data;
        $scope.operator_new.type_send = 'late';
        $scope.operator_new.time_send = moment($scope.operator_new.date_booking * 1000).format("YYYY-MM-DD HH:mm");
        $http.get(BASE_PATH_API_OPERATOR + 'groups/organization_list_group').then(function (data) {
            $scope.groups = data.data.data;
            for (var j = 0; j < $scope.operator_new.group.length; j++) {
                if ($scope.operator_new.group[j]._id == "0") {
                    $scope.operator_new.student_free = true;
                }
            }
            for (var i = 0; i < $scope.groups.length; i++) {
                for (var j = 0; j < $scope.operator_new.group.length; j++) {
                    if ($scope.groups[i]._id == $scope.operator_new.group[j]._id) {
                        $scope.groups[i].tick = true;
                        break;
                    }
                }
            }
            $('#spinner_loading').addClass('hide');
            $scope.changeStatus = function (index) {
                $scope.groups[index].tick = !$scope.groups[index].tick;
            };
        });
    });
    $scope.editNew = function () {
        var sendforGrop = [];
        if ($scope.frm_edit_new.$valid) {
            var dateSending = checkDate ? new Date($scope.operator_new.date_booking).getTime() : new Date($scope.operator_new.date_booking).getTime() * 1000;
            if (dateSending < new Date().getTime()) {
                Flash.create('error', message.date_new_error);
                return;
            }
            for (var i = 0; i < $scope.groups.length; i++)
            {
                if ($scope.groups[i].tick) {
                    sendforGrop.push($scope.groups[i]._id);
                }
            }
            if ($scope.operator_new.student_free) {
                sendforGrop.push('0');
            }
            if (!sendforGrop.length) {
                Flash.create('error', message.slect_address_send_new);
                return;
            }
            $('#spinner_loading').removeClass('hide');
            var itemNew = {
                title: $scope.operator_new.title,
                description: $scope.operator_new.description,
                is_booking: true,
                date_booking: $scope.operator_new.type_send == 'late' ? dateSending / 1000 : new Date().getTime() / 1000,
                group_id: JSON.stringify(sendforGrop),
            };
            $http({
                method: 'PUT',
                url: BASE_PATH_API_OPERATOR + 'news/organization_edit_new_booking/' + $routeParams.id,
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: itemNew,
            }).then(function (data) {
                $('#spinner_loading').addClass('hide');
                $location.path("operator/new/sending");
                Flash.create('success', data.data.message_ui);
            }, function (data) {
                Flash.create('error', data.data.message_ui);
                $('#spinner_loading').addClass('hide');
            });
        }
    }
    $scope.checkAllGroup = function (status) {
        if (status) {
            for (var i = 0; i < $scope.groups.length; i++) {
                $scope.groups[i].tick = true;
            }
        } else {
            for (var i = 0; i < $scope.groups.length; i++) {
                $scope.groups[i].tick = false;
            }
        }
    }

});
app.controller('detailNewController', function ($scope, $location, $routeParams, $window, $http, Flash, $filter) {
    setActiveMenuFirst(4);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_OPERATOR + 'news/organization_get_new/' + $routeParams.id).then(function (data) {
        $scope.operator_new = data.data.data;
        $scope.operator_new.is_booking == "TRUE" ? $scope.operator_new.type_send = 'late' : $scope.operator_new.type_send = 'immediate';
        $scope.groups = data.data.data.group;
        $('#spinner_loading').addClass('hide');
        $scope.groups.hasOwnProperty("0") ? $scope.operator_new.student_free = true : $scope.operator_new.student_free = false;
    });
});