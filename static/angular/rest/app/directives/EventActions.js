app.directive('eventActions', [function() {

    var template = '<span data-ng-show="showEditButton">\n    <span class="btn btn-info" data-ng-click="openEditEventModal({event: event})">\n        <span class="glyphicon glyphicon-pencil"></span>\n    </span>\n</span>\n\n<span data-ng-show="showDeleteButton">\n    <span class="btn btn-danger" data-ng-click="openDeleteEventModal({event: event})">\n        <span class="glyphicon glyphicon-remove"></span>\n    </span>\n</span>\n\n<span data-ng-show="showRsvpButton && loadedRsvpStatus">\n    <span data-ng-show="rsvpForUser.length === 0">\n        <span class="btn btn-danger" data-ng-click="openEditRsvpModal({eventId: eventId, rsvpId: null})">\n            <span class="glyphicon glyphicon-tag"></span>\n        </span>\n    </span>\n    <span data-ng-show="rsvpForUser.length !== 0">\n        <span class="btn btn-success" data-ng-click="openDeleteRsvpModal({rsvpId: rsvpId})">\n            <span class="glyphicon glyphicon-tag"></span>\n        </span>\n    </span>\n</span>'

    var controller = ['$scope', '$q', 'Rsvps', function($scope, $q, Rsvps) {
        var getRsvpStatus = function() {
            var deferred = $q.defer();
            var rsvpResource = new Rsvps();
            rsvpResource.event_id = $scope.event.id;
            var rsvpResourcePromise = rsvpResource.$get({event_id: $scope.event.id});
            rsvpResourcePromise.then(function(data) {
                deferred.resolve(data);
            });
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