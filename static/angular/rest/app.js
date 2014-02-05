'use strict';

var rest = angular.module('rest', ['app', 'ngRoute', 'ngCookies', 'ngResource', 'ngAnimate']);

rest.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);