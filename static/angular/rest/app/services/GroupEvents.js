app.factory('GroupEvents', ['$http', '$q', function($http, $q) {

    var groupEvents = function () {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/app/api/get_group_events'}).
            success(function(data) {
                deferred.resolve(data)
            });
        return deferred.promise;
    }

    return {
        getGroupEvents: groupEvents
    }

}])