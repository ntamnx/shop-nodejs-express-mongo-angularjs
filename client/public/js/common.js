/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 10, 2017, 10:25:26 AM
 Author     : nguyen.xuan.tam
 */
/**
 * 
 * @param {type} obj
 * @returns {String}
 */
function transformRequestToUrlEncoded(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
/**
 * 
 * @param {type} $scope
 * @param {type} data
 * @param {type} pageCR
 * @returns {undefined}
 */
function paginate($scope, data, pageCR) {
    var page = pageCR ? pageCR : 1;
    $scope.data = data;
    $scope.totalItems = $scope.data.length;
    $scope.currentPage = page;
    $scope.itemsPerPage = 20;
    $scope.maxsize = 7;
}
/**
 * 
 * @param {type} $scope
 * @param {type} data
 * @param {type} pageCR
 * @returns {undefined}
 */
function paginateHome($scope, data, pageCR) {
    var page = pageCR ? pageCR : 1;
    $scope.data = data;
    $scope.totalItems = $scope.data.length;
    $scope.currentPage = page;
    $scope.itemsPerPage = 10;
    $scope.maxsize = 7;
}
/*
 * @date 21/3/2017
 * @function check duplicate
 */
function  checkDupplicate(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (j == i) {
            } else {
                if (data[i].email == data[j].email) {
                    data[i].isDuplicate = true;
                    break;
                } else {
                    data[i].isDuplicate = false;
                }
            }
        }
    }
}
/**
 * 
 * @param {type} $scope
 * @param {type} data
 * @param {type} pageCR
 * @returns {undefined}
 */
function paginateStudent($scope, data, pageCR) {
    var page = pageCR ? pageCR : 1;
    $scope.data = data;
    $scope.totalItemsStudent = $scope.data.length;
    $scope.curentPagelistStudent = page;
    $scope.itemsPerPage = 10;
    $scope.maxsize = 7;
}
/**
 * 
 */
function paginateStudentAdd($scope, data, pageCR) {
    var page = pageCR ? pageCR : 1;
    $scope.data = data;
    $scope.totalItemsAddStudent = $scope.data.length;
    $scope.curentPageAddStudentGroupToAdd = page;
    $scope.itemsPerPage = 10;
    $scope.maxsize = 7;
}
/**
 * 
 */
function paginateSupervisor($scope, data, pageCR) {
    var page = pageCR ? pageCR : 1;
    $scope.data = data;
    $scope.totalItemsSupervisor = $scope.data.length;
    $scope.curentPageSupervisorGroup = page;
    $scope.itemsPerPage = 10;
    $scope.maxsize = 7;
}
/**
 * 
 */
function paginateSupervisorAdd($scope, data, pageCR) {
    var page = pageCR ? pageCR : 1;
    $scope.data = data;
    $scope.totalItemsAddSupervisor = $scope.data.length;
    $scope.curentPageSupervisorGroupToAdd = page;
    $scope.itemsPerPage = 10;
    $scope.maxsize = 7;
}
/**
 * 
 * @param {type} date
 * @returns {Array}
 */
function formatDate(date) {
    var d = new Date(date * 1000),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
/**
 * 
 * @param {type} date
 * @returns {Array}
 */
function formatDateYear(date) {
    var d = new Date(date * 1000),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return year
}
/**
 * @function set null  for keyword search and page number off list different when leave list to list diffrent.
 * 
 * @param {type} items
 * @param {type} fields
 * @returns {undefined}
 */
function setDefaulKeySearchAndPageCurent(items, keyword) {
    var fields = keyword ? keyword : [];
    var lengthArray = fields.length;
    angular.forEach(items, function (value, key) {
        var check = false;
        for (var i = 0; i < lengthArray; i++) {
            if (key === fields[i]) {
                check = true;
                break;
            }
        }
        if (!check) {
            items[key] = '';
        }
    });
}
/**
 * 
 * @param {type} position position for active menu in left
 * @returns {undefined}
 */
function setActiveMenuFirst(position) {
    var selectorActive = $('.menu_section').find('ul:first').find('li:nth-child(' + position + ')');
    selectorActive.find('a:first').trigger('click');
    selectorActive.find('ul:first').find('a:first').trigger('click');
}
function setActiveMenuLast(position) {
    $('.menu_section').find('ul:first').find('li:nth-child(' + position + ')').find('a').trigger('click');
}
function setActiveMenuPosition(position, aPosition) {
//    $('.menu_section').find('ul:first').find('li:nth-child(' + position + ')').find('a:nth-child(' + aPosition + ')').trigger('click');
    var selectorActive = $('.menu_section').find('ul:first').find('li:nth-child(' + position + ')');
    selectorActive.find('a:first').trigger('click');
    selectorActive.find('ul:first').find('li:nth-child(' + aPosition + ')').find('a').trigger('click');
}
