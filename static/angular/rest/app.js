'use strict';

var rest = angular.module('rest', ['app', 'ngCookies', 'ngResource', 'ngAnimate', 'ngRoute']);

rest.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

