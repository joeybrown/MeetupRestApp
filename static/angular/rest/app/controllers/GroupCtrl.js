'use strict';

app.controller('GroupCtrl',  ['$scope', '$routeParams', '$location', '$modal', '$timeout', '$route', 'SmoothScroll', 'GroupInfo', 'GroupEvents', 'Rsvps', 'Group',
    function ($scope, $routeParams, $location, $modal, $timeout, $route, SmoothScroll, GroupInfo, GroupEvents, Rsvps, Group) {

        $scope.params = $routeParams;
        $scope.groupInfo = Group.GroupInfo.results[0];
        $scope.eventsInfo = Group.EventsInfo;
        $scope.userId = Group.UserId;

        var reloadPage = function() {
            $timeout(function() {
                $route.reload();
            });
        };

        $scope.pagination = (function () {
            var pageNumber = (function () {
                if ($routeParams.offset) return parseInt($routeParams.offset) + 1;
                else return 1;
            } ());
            var itemsPerPage = (function () {
                if ($routeParams.page) return $routeParams.page;
                else return 20;
            } ());
            var numberOfPages = (function() {
                return Math.ceil($scope.eventsInfo.meta.total_count / $scope.params.page);
            } ());
            var lastButtonText = (function() {
                return 'Last ({0})'.format(numberOfPages || 1);
            }());
            var selectPage = function(page) {
                var offset = (page - 1).toString();

                var eventsPromise = GroupEvents.getGroupEvents($scope.params.groupUrlName, $scope.params.page, offset);
                eventsPromise.then(function (data) {
                    $scope.eventsInfo = data;
                    $timeout(function() {
                        SmoothScroll.scrollElementIntoView('upcomingEvents');
                    });
                })
                $location.search('offset', (page-1).toString());
            }
            return {
                pageNumber: pageNumber,
                itemsPerPage: itemsPerPage,
                numberOfPages: numberOfPages,
                lastButtonText: lastButtonText,
                selectPage: selectPage
            }
        }())

        $scope.epochToLocaleTime = function(epoch) {
            epoch = parseInt(epoch);
            return new Date(epoch).toLocaleTimeString();
        }

        $scope.epochToLocaleDate = function(epoch) {
            epoch = parseInt(epoch);
            return new Date(epoch).toLocaleDateString();
        }

        $scope.openEditEventModal = function (event, groupId) {
            var modalInstance = $modal.open({
                templateUrl: 'editEventModal.html',
                controller: EditEventModalInstanceCtrl,
                resolve: {
                    event: function () {
                        if (event) return event;
                        return null;
                    },
                    groupId: function() {
                        if (groupId) return groupId;
                        return null;
                    }
                }
            });
            modalInstance.result.then(
                function () {
                    reloadPage()
                }
            )
        };

        $scope.openDeleteEventModal = function (event) {
            var modalInstance = $modal.open({
                templateUrl: 'deleteEventModal.html',
                controller: DeleteEventModalInstanceCtrl,
                resolve: {
                    event: function() {
                        return event;
                    }
                }
            });
            modalInstance.result.then(
                function () {
                    reloadPage();
                }
            )
        };

        $scope.openEditRsvpModal = function (eventId, rsvpId) {
            var modalInstance = $modal.open({
                templateUrl: 'editRsvpModal.html',
                controller: EditRsvpModalInstanceCtrl,
                resolve: {
                    rsvpId: function() {
                        return rsvpId;
                    },
                    eventId : function() {
                        return eventId;
                    }
                }
            });
            modalInstance.result.then(
                function () {
                    reloadPage();
                }
            )
        };

        $scope.openDeleteRsvpModal = function (rsvpId) {
            var modalInstance = $modal.open({
                templateUrl: 'deleteRsvpModal.html',
                controller: DeleteRsvpModalInstanceCtrl,
                resolve: {
                    rsvpId: function() {
                        return rsvpId;
                    }
                }
            });
            modalInstance.result.then(
                function () {
                    reloadPage();
                }
            )
        };

    }]);

var EditEventModalInstanceCtrl = ['$scope', '$routeParams', '$modalInstance', 'EventResource', 'event', function ($scope, $routeParams, $modalInstance, EventResource, event) {

    var isNew = event ? false : true;

    if (isNew) {
        $scope.event = {};
        $scope.labelText = 'Create Event';
    } else {
        console.log(event);
        $scope.event = event;
        $scope.labelText = 'Edit Event';
    }

    $scope.ok = function () {
        if (isNew) {
            var eventResource = new EventResource();
            eventResource.name = $scope.event.name;
            eventResource.time = new Date($scope.event.time).getTime();
            eventResource.description = $scope.event.description;
            eventResource.group_urlname = $routeParams.groupUrlName;
            eventResource.announce = true;
            eventResource.$save();
        } else {
            var eventResource = new EventResource();
            eventResource.name = $scope.event.name;
            eventResource.time = new Date($scope.event.time).getTime();
            eventResource.description = $scope.event.description;
            eventResource.group_urlname = $routeParams.groupUrlName;
            EventResource.update({id: event.id}, eventResource)
        }
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    if (!$scope.event.time) {
        $scope.event.time = new Date();
    }
    $scope.minDate = new Date();

}];

var DeleteEventModalInstanceCtrl = ['$scope', '$modalInstance', 'EventResource', 'event', function ($scope, $modalInstance, EventResource, event) {

    $scope.event = event;

    $scope.delete = function () {
        EventResource.delete({id: event.id});
        $modalInstance.close()
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}];

var EditRsvpModalInstanceCtrl = ['$scope', '$modalInstance', 'RsvpResource', 'rsvpId', 'eventId', function ($scope, $modalInstance, RsvpResource, rsvpId, eventId) {

    var isNew = rsvpId ? false : true;

    if (isNew) {
        $scope.event = {};
        $scope.labelText = 'Create Rsvp';
    } else {
        $scope.event = event;
        $scope.labelText = 'Edit Rsvp';
    }

    $scope.ok = function () {
        if (isNew) {
            var rsvpResource = new RsvpResource();
            rsvpResource.event_id = eventId;
            rsvpResource.rsvp = 'yes';
            rsvpResource.$save();
        } else {
            var rsvpResource = new RsvpResource()
            rsvpResource.rsvp = 'yes';
            RsvpResource.update({id: rsvpId}, rsvpResource);
        }

        $modalInstance.close(69);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('shit');
    };

}];

var DeleteRsvpModalInstanceCtrl = ['$scope', '$modalInstance', 'RsvpResource', 'rsvpId', function ($scope, $modalInstance, RsvpResource, rsvpId) {

    $scope.ok = function () {
        var rsvpResource = new RsvpResource()
        rsvpResource.rsvp = 'no';
        RsvpResource.update({id: rsvpId}, rsvpResource);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

}];