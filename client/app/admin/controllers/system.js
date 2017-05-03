/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 14, 2017, 10:21:19 AM
 Author     : nguyen.xuan.tam
 */

/* global BASE_PATH_API_ADMIN, app, fileUpload, message, admin, transformRequestToUrlEncoded, CKEDITOR */

var code = ''; // code create
var checkShowModal = true; // check modal if have create code first.
app.controller('termSystemPaymentController', function ($scope, $http, $filter, $timeout, Flash) {
    setActiveMenuFirst(7);
    CKEDITOR.replace('use_of_the_terms_vietname');
    CKEDITOR.replace('use_of_the_terms_japane');
    $scope.editTermsVi = function () {
        $http({
            method: 'PUT',
            url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + id,
            transformRequest: transformRequestToUrlEncoded,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {vi: CKEDITOR.instances['use_of_the_terms_vietname'].getData()},
        }).then(function success(data) {
            getData();
            Flash.create('success', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        }, function error(data) {
            Flash.create('error', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        });
    }
    $scope.editTermsJa = function () {
        $http({
            method: 'PUT',
            url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + id,
            transformRequest: transformRequestToUrlEncoded,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {ja: CKEDITOR.instances['use_of_the_terms_japane'].getData()},
        }).then(function success(data) {
            getData();
            Flash.create('success', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        }, function error(data) {
            Flash.create('error', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        });
    }
});
/**
 * 
 */
app.controller('createCodeTermSystemPaymentController', function ($scope, $http, Flash) {
    setActiveMenuFirst(7);
    CKEDITOR.replace('use_of_the_terms_vietname');
    CKEDITOR.replace('use_of_the_terms_japane');
    $scope.editTermsVi = function () {
        $http({
            method: 'PUT',
            url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + id,
            transformRequest: transformRequestToUrlEncoded,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {vi: CKEDITOR.instances['use_of_the_terms_vietname'].getData()},
        }).then(function success(data) {
            getData();
            Flash.create('success', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        }, function error(data) {
            Flash.create('error', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        });
    }
    $scope.editTermsJa = function () {
        $http({
            method: 'PUT',
            url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + id,
            transformRequest: transformRequestToUrlEncoded,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {ja: CKEDITOR.instances['use_of_the_terms_japane'].getData()},
        }).then(function success(data) {
            getData();
            Flash.create('success', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        }, function error(data) {
            Flash.create('error', data.data.message_ui);
            $('#spinner_loading').addClass('hide');
        });
    }
});
/**
 * 
 */
app.controller('systemPaymentController', function ($scope, $http, $location, Flash) {
    setActiveMenuFirst(7);
    setDefaulKeySearchAndPageCurent(admin);
});
/**
 * 
 */
app.controller('subjectPaymentSystemController', function ($scope, $http, $location, Flash) {
    setActiveMenuFirst(7);
    $scope.changSubject = function () {
        if ($scope.frm_subject.$valid) {
            $('#spinner_loading').removeClass('hide');
            $http({
                method: 'PUT',
                url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + id,
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.payment,
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
app.controller('timeExpiredSystemController', function ($scope, $http, $location, Flash) {
    setActiveMenuFirst(7);
    $scope.changTimeExpire = function () {
        if ($scope.frm_change.$valid) {
            console.log($scope.payment);
        }
    }
});
/**
 * 
 */

app.controller('systemDiscountPaymentController', function ($scope, $http, $window, $location, Flash) {
    setActiveMenuFirst(7);
    $http.get(BASE_PATH_API_ADMIN + 'news/admin_list_news').then(function (data) {
        $scope.numberItem = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
    /**
     * 
     * @returns {undefined}
     */
    $scope.add_new_discount = function () {
        $scope.numberItem.push({_id: 0, title: '', description: '', discount: ''});
    }
    /**
     * 
     * @param {type} id
     * @param {type} $index
     * @returns {undefined}
     */
    $scope.removeItem = function (id, $index) {
        if ($window.confirm(message.confirm_delete)) {
            if (id) {
                $('#spinner_loading').removeClass('hide');
                $http({
                    method: "DELETE",
                    url: BASE_PATH_API_ADMIN + 'news/admin_delete_new/' + id
                }).then(function success(data) {
                    Flash.create('success', data.data.message_ui);
                    $scope.numberItem.splice($index, 1);
                    $('#spinner_loading').addClass('hide');
                }, function error(data) {
                    Flash.create('error', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                });
            }
        }
    }
    /**
     * 
     * @param {type} id
     * @param {type} vietname
     * @param {type} japane
     * @param {type} index
     * @returns {undefined}
     */
    $scope.addUpdate = function (id, from, to, discount, index) {
        if (!!from && !!to && !!discount) {
            if (id == 0) {
                $('#spinner_loading').removeClass('hide');
                $http({
                    method: 'POST',
                    url: BASE_PATH_API_ADMIN + 'news/admin_add_new',
                    transformRequest: transformRequestToUrlEncoded,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: {vietname: vietname, japane: japane},
                }).then(function success(data) {
                    $scope.numberItem[index] = data.data.data;
                    $('#spinner_loading').addClass('hide');
                    Flash.create('success', data.data.message_ui);
                }, function error(data) {
                    Flash.create('error', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                });
            } else {
                $http({
                    method: 'PUT',
                    url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + $routeParams.id,
                    transformRequest: transformRequestToUrlEncoded,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: {_id: id, vietname: vietname, japane: japane},
                }).then(function success(data) {
                    $scope.numberItem[index] = data.data.data;
                    Flash.create('success', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                }, function error(data) {
                    Flash.create('error', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                });
            }
        }
    }
});
/**
 * 
 */
app.controller('exerciseSystemController', function ($scope, $http, $location, Flash) {
    setActiveMenuPosition(7, 2);
    var getData = function () {
        $('#spinner_loading').removeClass('hide');
        $http.get(BASE_PATH_API_ADMIN + 'news/admin_list_news').then(function (data) {
            $scope.exercises = data.data.data;
            $('#spinner_loading').addClass('hide');
        });
    }
    getData();
    $scope.updateExercise = {};
    var id = '';
    $scope.updateExercise = function (idExercise, value) {
        id = idExercise;
        $scope.updateExercise.value = value;
    }
    /**
     * 
     */
    $scope.editValue = function () {
        if ($scope.frm_edit_value.$valid) {
            $http({
                method: 'PUT',
                url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + id,
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.updateExercise,
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
app.controller('testSystemController', function ($scope, $http, $location, Flash) {
    setActiveMenuPosition(7, 2);
    var getData = function () {
        $('#spinner_loading').removeClass('hide');
        $http.get(BASE_PATH_API_ADMIN + 'news/admin_list_news').then(function (data) {
            $scope.tests = data.data.data;
            $('#spinner_loading').addClass('hide');
        });
    }
    getData();
    $scope.updateTest = {};
    var id = '';
    $scope.updateTest = function (idTest, value) {
        id = idTest;
        $scope.updateTest.value = value;
    }
    /**
     * 
     */
    $scope.editValue = function () {
        if ($scope.frm_edit_value.$valid) {
            $http({
                method: 'PUT',
                url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + id,
                transformRequest: transformRequestToUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $scope.updateExercise,
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
app.controller('homeExerciseController', function ($scope, $http, $location, Flash) {
    setActiveMenuPosition(7, 2);
    setDefaulKeySearchAndPageCurent(admin);
});
/**
 * 
 */
app.controller('indexSystemCVController', function ($scope, $http, $location, Flash) {
    setActiveMenuLast(7);
    setDefaulKeySearchAndPageCurent(admin);
    $('#spinner_loading').removeClass('hide');
    $http.get(BASE_PATH_API_ADMIN + 'news/admin_list_news').then(function (data) {
        $scope.cvs = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
});
/**
 * 
 */
app.controller('editCVSystemController', function ($scope, $http, $window, Flash, $routeParams) {
    setActiveMenuLast(7);
    $http.get(BASE_PATH_API_ADMIN + 'news/admin_list_news').then(function (data) {
        $scope.numberItem = data.data.data;
        $('#spinner_loading').addClass('hide');
    });
    /**
     * 
     * @returns {undefined}
     */
    $scope.add_new_item = function () {
        $scope.numberItem.push({_id: 0, title: '', description: ''});
    }
    /**
     * 
     * @param {type} id
     * @param {type} $index
     * @returns {undefined}
     */
    $scope.removeItem = function (id, $index) {
        if ($window.confirm(message.confirm_delete)) {
            if (id) {
                $('#spinner_loading').removeClass('hide');
                $http({
                    method: "DELETE",
                    url: BASE_PATH_API_ADMIN + 'news/admin_delete_new/' + id
                }).then(function success(data) {
                    Flash.create('success', data.data.message_ui);
                    $scope.numberItem.splice($index, 1);
                    $('#spinner_loading').addClass('hide');
                }, function error(data) {
                    Flash.create('error', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                });
            }
        }
    }
    /**
     * 
     * @param {type} id
     * @param {type} vietname
     * @param {type} japane
     * @param {type} index
     * @returns {undefined}
     */
    $scope.addUpdate = function (id, vietname, japane, index) {
        if (!!vietname && !!japane) {
            if (id == 0) {
                $('#spinner_loading').removeClass('hide');
                $http({
                    method: 'POST',
                    url: BASE_PATH_API_ADMIN + 'news/admin_add_new',
                    transformRequest: transformRequestToUrlEncoded,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: {vietname: vietname, japane: japane},
                }).then(function success(data) {
                    $scope.numberItem[index] = data.data.data;
                    $('#spinner_loading').addClass('hide');
                    Flash.create('success', data.data.message_ui);
                }, function error(data) {
                    Flash.create('error', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                });
            } else {
                $http({
                    method: 'PUT',
                    url: BASE_PATH_API_ADMIN + 'news/admin_edit_new/' + $routeParams.id,
                    transformRequest: transformRequestToUrlEncoded,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: {_id: id, vietname: vietname, japane: japane},
                }).then(function success(data) {
                    $scope.numberItem[index] = data.data.data;
                    Flash.create('success', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                }, function error(data) {
                    Flash.create('error', data.data.message_ui);
                    $('#spinner_loading').addClass('hide');
                });
            }
        }
    }
});

/**
 * 
 */
app.controller('addCodePaymentController', function ($scope, $http, $location, Flash) {
    setActiveMenuFirst(7);
    $('.nav_menu').show();
    $('footer').show();
    if (checkShowModal) {
        $("#exampleModal").modal('show');
    } else {
        $("#exampleModal").modal('hide');
        checkShowModal = true;
        $scope.payment = {};
        $scope.payment.code = code;
        new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    }
    $scope.back = function () {
        $("#exampleModal").modal('hide');
        $location.path('/admin/system/payment');
    };
    $scope.createCode = function () {
        $("#exampleModal").modal('hide');
        code = '2123-5544-5456';
        $scope.payment = {};
        $scope.payment.code = code;
        new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    };

});
/**
 * 
 */
app.controller('printCodePaymentController', function ($scope, $location, $http, Flash, $window, $timeout) {
    $('.nav_menu').hide();
    $('footer').hide();
    checkShowModal = false;
    setActiveMenuFirst(7);
    $scope.payment = {};
    $scope.payment.code = '2123-5544-5456';
    new QRCode(document.getElementById('show_qrcode'), $scope.payment.code);
    $timeout(function () {
        window.print();
        $location.path("admin/system/payment/create_code");
    }, 100);
});