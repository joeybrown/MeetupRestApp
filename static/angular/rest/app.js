'use strict';

var rest = angular.module('rest', ['app', 'ngRoute', 'ngCookies', 'ngResource', 'ngAnimate']);

rest.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);