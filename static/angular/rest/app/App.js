'use strict';

var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/app/', {
            controller: 'AppCtrl',
            templateUrl: '/static/angular/rest/app/templates/app.html',
            resolve: {
                Groups: ['$q', '$route', 'GroupInfo', function($q, $route, GroupInfo) {
                    var groupUrlNames = {
                        memTech: 'memphis-technology-user-groups',
                        wwDemo: 'mem-web-demo'
                    }
                    var memTechDeferred = $q.defer(),
                        wwDemoDeferred = $q.defer();
                    var memTechPromise = GroupInfo.getGroupInfo(groupUrlNames.memTech);
                    memTechPromise.then(function (data) {
                        memTechDeferred.resolve(data);
                    })
                    var wwDemoPromise = GroupInfo.getGroupInfo(groupUrlNames.wwDemo);
                    wwDemoPromise.then(function (data) {
                        wwDemoDeferred.resolve(data);
                    })
                    var deferred = $q.defer();
                    var all = $q.all([memTechDeferred.promise, wwDemoDeferred.promise]);
                    all.then(function(data) {
                        var memTechInfo = data[0];
                        var wwDemoInfo = data[1];
                        deferred.resolve({
                            MemTechInfo: memTechInfo,
                            WebWorkersDemoInfo: wwDemoInfo
                        });
                    })
                    return deferred.promise
                }]
            }
        })
        .when('/app/group/:groupUrlName', {
            controller: 'GroupCtrl',
            templateUrl: '/static/angular/rest/app/templates/group.html',
            reloadOnSearch: false,
            resolve: {
                Group: ['$q', '$route', 'GroupInfo', 'GroupEvents', function($q, $route, GroupInfo, GroupEvents) {
                    var params = {
                        groupUrlName: $route.current.params.groupUrlName,
                        page: $route.current.params.page,
                        offset: $route.current.params.offset
                    }
                    var groupDeferred = $q.defer(),
                        eventsDeferred = $q.defer();

                    var groupPromise = GroupInfo.getGroupInfo(params.groupUrlName);
                    groupPromise.then(function (data) {
                        groupDeferred.resolve(data);
                    })

                    var eventsPromise = GroupEvents.getGroupEvents(params.groupUrlName, params.page, params.offset);
                    eventsPromise.then(function (data) {
                        eventsDeferred.resolve(data);
                    })

                    var deferred = $q.defer();
                    var all = $q.all([groupDeferred.promise, eventsDeferred.promise]);
                    all.then(function(data) {
                        var groupInfo = data[0];
                        var eventsInfo = data[1];
                        deferred.resolve({
                            GroupInfo: groupInfo,
                            EventsInfo: eventsInfo
                        });
                    })
                    return deferred.promise
                }]
            }
        })
        .when('/app/group/:groupUrlName/profile', {
            controller: 'AppCtrl',
            templateUrl: '/static/angular/rest/app/templates/app.html'
        })
        .when('/app/group/:groupUrlName/event/:eventId', {
            controller: 'AppCtrl',
            templateUrl: '/static/angular/rest/app/templates/app.html'
        });
}]);

