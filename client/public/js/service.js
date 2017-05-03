/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : Mar 15, 2017, 1:10:14 PM
 Author     : nguyen.xuan.tam
 */
/* global app */

var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};
app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
app.directive("compareTo", compareTo);
/**
 * @param {type} param1
 * @param {type} param2
 */
app.filter('customSearch', function () {
    return function (items, keyword, fields) {
        if (keyword == null) {
            return items;
        }
        var filtered = [];
        var lengthArray = fields.length;
        angular.forEach(items, function (item) {
            for (var i = 0; i < lengthArray; i++) {
                if (String(item[fields[i]]).indexOf(keyword) != -1) {
                    filtered.push(item);
                    break;
                }
            }
        });
        return filtered;
    }
});
/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.filter('customSearchCorect', function () {
    return function (items, keyword, fields) {
        if (keyword == null) {
            return items;
        }
        var filtered = [];
        var lengthArray = fields.length;
        angular.forEach(items, function (item) {
            for (var i = 0; i < lengthArray; i++) {
                if (String(item[fields[i]]) == keyword) {
                    filtered.push(item);
                    break;
                }
            }
        });
        return filtered;
    }
});
