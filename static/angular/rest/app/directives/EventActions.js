app.directive('eventActions', [function() {

    var template = '<span data-ng-show="showEditButton">\n    <span class="btn btn-info" data-ng-click="openEditEventModal({event: event})">\n        <span class="glyphicon glyphicon-pencil"></span>\n    </span>\n</span>\n\n<span data-ng-show="showDeleteButton">\n    <span class="btn btn-danger" data-ng-click="openDeleteEventModal({event: event})">\n        <span class="glyphicon glyphicon-remove"></span>\n    </span>\n</span>\n\n<span data-ng-show="showRsvpButton && loadedRsvpStatus">\n    <span data-ng-show="showGreenButton(rsvpForUser)">\n        <span class="btn btn-success" data-ng-click="openDeleteRsvpModal({rsvpId: rsvpId})">\n            <span class="glyphicon glyphicon-tag"></span>\n        </span>\n    </span>\n    \n    <span data-ng-show="showRedButton(rsvpForUser)">\n        <span class="btn btn-danger" data-ng-click="openEditRsvpModal({eventId: eventId, rsvpId: rsvpId})">\n            <span class="glyphicon glyphicon-tag"></span>\n        </span>\n    </span>\n    \n</span>'

    var controller = ['$scope', '$q', '$timeout', 'RsvpResource', function($scope, $q, $timeout, RsvpResource) {

        var getRandomNumber = function(max, min) {
            min = min || 0;
            return Math.random() * (max - min) + min;
        }

        var getRsvpStatus = function() {

            var deferred = $q.defer();
            var rsvpResource = new RsvpResource();
            rsvpResource.event_id = $scope.event.id;

            $timeout(function() {
                var rsvpResourcePromise = rsvpResource.$get({event_id: $scope.event.id});
                rsvpResourcePromise.then(function(data) {
                    deferred.resolve(data);
                });
            }, getRandomNumber(3500))

            return deferred.promise
        }

        var rsvpPromise = getRsvpStatus();
        rsvpPromise.then(function(data) {
            $scope.rsvpForUser = getRsvpForUser(data.results);
            $scope.loadedRsvpStatus = true;

            if ($scope.rsvpForUser.length > 0) {
                $scope.rsvpId = $scope.rsvpForUser[0].rsvp_id;
            }
            else {
                $scope.eventId = $scope.event.id;
            }
        });

        var getRsvpForUser = function(rsvps) {
            return _.filter(rsvps, function(rsvp) {
                return rsvp.member.member_id == $scope.userId;
            })
        }

        $scope.showRedButton = function(rsvpForUser) {
            return !rsvpForUser || rsvpForUser.length == 0 || rsvpForUser[0].response !== 'yes'
        }
        $scope.showGreenButton = function(rsvpForUser) {
            return rsvpForUser && rsvpForUser.length > 0 && rsvpForUser[0].response === 'yes'
        }

        $scope.showEditButton = _.contains($scope.event.self.actions, 'edit');
        $scope.showDeleteButton = _.contains($scope.event.self.actions, 'delete');
        $scope.showRsvpButton = _.contains($scope.event.self.actions, 'rsvp');

        $scope.loadedRsvpStatus = false;
    }]

    return {
        scope: {
            event: '=eventActions',
            openEditEventModal: '&',
            openDeleteEventModal: '&',
            openEditRsvpModal: '&',
            openDeleteRsvpModal: '&',
            userId: '@'
        },
        template: template,
        controller: controller
    }
}])