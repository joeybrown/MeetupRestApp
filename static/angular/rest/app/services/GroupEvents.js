app.factory('GroupEvents', ['$http', '$q', function($http, $q) {

    var groupEvents = function (groupUrlName, page, offset) {
        var apiUrl = (function() {
            var baseUrl = '/app/api/get_group_events/?'
            baseUrl += 'group_urlname={0}&'.format(groupUrlName);
            if (page || offset) {
                if (page) baseUrl += 'page={0}&'.format(page);
                if (offset) baseUrl += 'offset={0}&'.format(offset);
            }
            return baseUrl;
        } ())
        var deferred = $q.defer();
        $http({method: 'GET', url: apiUrl}).
            success(function(data) {
                deferred.resolve(data)
            });
        return deferred.promise;
    }

    return {
        getGroupEvents: groupEvents
    }

}])