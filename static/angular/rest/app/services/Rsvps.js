app.factory('Rsvps', ['$http', '$q', function($http, $q) {

    var getRsvpsForEvent = function (event_id) {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/app/api/rsvps/', params: {event_id: event_id}}).
            success(function(data) {
                deferred.resolve(data)
            });
        return deferred.promise;
    }

    return {
        getRsvpsForEvent: getRsvpsForEvent
    }

}])