'use strict';

app.controller('GroupCtrl',  ['$scope', '$routeParams', '$location', '$modal', '$timeout', 'SmoothScroll', 'GroupInfo', 'GroupEvents', 'Rsvps', 'Group',
    function ($scope, $routeParams, $location, $modal, $timeout, SmoothScroll, GroupInfo, GroupEvents, Rsvps, Group) {

        $scope.params = $routeParams;
        $scope.groupInfo = Group.GroupInfo.results[0];
        $scope.eventsInfo = Group.EventsInfo;

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
                function (data) {
                    console.log('hey');
                }, function(data) {
                    console.log('shit');
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
                function (data) {
                    console.log('hey');
                }, function(data) {
                    console.log('shit');
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
            eventResource.$update({id: event.id});
        }


        $modalInstance.close(69);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('shit');
    };
}];

var DeleteEventModalInstanceCtrl = ['$scope', '$route', '$modalInstance', 'Events', 'event', function ($scope, $route, $modalInstance, Events, event) {

    $scope.event = event;

    console.log(event);
    console.log(event);

    $scope.delete = function () {
        Events.delete({id: event.id});
        $route.reload()
        $modalInstance.close('fuck')
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('shit');
    };
}];