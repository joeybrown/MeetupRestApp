'use strict';

app.controller('AppCtrl',  ['$scope', 'GroupInfo', 'GroupEvents', 'Rsvps', 'Groups',
    function ($scope, GroupInfo, GroupEvents, Rsvps, Groups) {

        $scope.groups = _.map(Groups, function(group) {
            return group.results[0];
        });

        console.log($scope.groups);

//    var getGroupInfo = function() {
//        var promise = GroupInfo.getGroupInfo();
//        promise.then(function (data) {
//            $scope.groupInfo = data;
//            console.log($scope.groupInfo)
//        })
//    }
//
//    $scope.getRsvpsForEvent = function(event_id) {
//        var promise = Rsvps.getRsvpsForEvent(event_id);
//        promise.then(function (data) {
//            console.log(data)
//        })
//    }
//
//    var getGroupEvents = function() {
//        var promise = GroupEvents.getGroupEvents();
//        promise.then(function (data) {
//            $scope.groupEvents = data;
//            console.log($scope.groupEvents)
//        })
//    }

    }]);

