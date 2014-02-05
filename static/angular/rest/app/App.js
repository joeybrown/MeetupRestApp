var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource', 'ngAnimate']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/app/', {
            controller: 'AppCtrl',
            templateUrl: '/static/angular/rest/app/templates/app.html'
        });
});