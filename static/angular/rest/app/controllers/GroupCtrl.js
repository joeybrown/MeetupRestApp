'use strict';

app.controller('GroupCtrl',  ['$scope', '$routeParams', '$location', '$modal', '$timeout', '$route', 'SmoothScroll', 'GroupInfo', 'GroupEvents', 'Rsvps', 'Group',
    function ($scope, $routeParams, $location, $modal, $timeout, $route, SmoothScroll, GroupInfo, GroupEvents, Rsvps, Group) {

        $scope.params = $routeParams;
        $scope.groupInfo = Group.GroupInfo.results[0];
        $scope.eventsInfo = Group.EventsInfo;
        $scope.userId = Group.UserId;

        var reloadPage = function() {
            $route.reload();
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

        $scope.openEditEventModal = function (event) {
            console.log('hey')
            var modalInstance = $modal.open({
                templateUrl: 'editEventModal.html',
                controller: EditEventModalInstanceCtrl,
                resolve: {
                    event: function () {
                        if (event) return event;
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

var EditEventModalInstanceCtrl = ['$scope', '$modalInstance', 'Events', 'event', function ($scope, $modalInstance, Events, event) {

    var isNew = event ? false : true;

    if (isNew) {
        $scope.event = {};
        $scope.labelText = 'Create Event';
    } else {
        console.log($scope.event);
        $scope.event = event;
        $scope.labelText = 'Edit Event';
    }

    $scope.ok = function () {
        if (isNew) {
            var eventResource = new Events();
            eventResource.name = 'hello'
            eventResource.$save();
        } else {
            var eventResource = new Events()
            eventResource.name = 'shit'
            eventResource.update({id: event.id});
        }


        $modalInstance.close(69);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('shit');
    };

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];




    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };


}];

var DeleteEventModalInstanceCtrl = ['$scope', '$modalInstance', 'Events', 'event', function ($scope, $modalInstance, Events, event) {

    $scope.event = event;

    console.log(event);
    console.log(event);

    $scope.delete = function () {
        Events.delete({id: event.id});
        $modalInstance.close('fuck')
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('shit');
    };
}];

var EditRsvpModalInstanceCtrl = ['$scope', '$modalInstance', 'Rsvps', 'rsvpId', 'eventId', function ($scope, $modalInstance, Rsvps, rsvpId, eventId) {

    var isNew = rsvpId ? false : true;

    console.log(rsvpId);
    console.log(eventId);

    if (isNew) {
        $scope.event = {};
        $scope.labelText = 'Create Rsvp';
    } else {
        $scope.event = event;
        $scope.labelText = 'Edit Rsvp';
    }

    $scope.ok = function () {
        if (isNew) {
            var rsvpResource = new Rsvps();
            rsvpResource.event_id = eventId;
            rsvpResource.$save();
        } else {
            var rsvpResource = new Rsvps()
            rsvpResource.update({id: rsvpId});
        }

        $modalInstance.close(69);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('shit');
    };

}];

var DeleteRsvpModalInstanceCtrl = ['$scope', '$modalInstance', 'Rsvps', 'rsvpId', function ($scope, $modalInstance, Rsvps, rsvpId) {

    var isNew = rsvpId ? false : true;

    console.log(rsvpId);

    if (isNew) {
        $scope.event = {};
        $scope.labelText = 'Create Rsvp';
    } else {
        $scope.event = event;
        $scope.labelText = 'Edit Rsvp';
    }

    $scope.ok = function () {
        if (isNew) {
            var rsvpResource = new Rsvps();
            rsvpResource.event_id = eventId;
            rsvpResource.$save();
        } else {
            var rsvpResource = new Rsvps()
            rsvpResource.update({id: rsvpId});
        }

        $modalInstance.close(69);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('shit');
    };

}];