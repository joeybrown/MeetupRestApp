app.factory('GroupEvents', ['$http', '$q', '$routeParams', 'EventResource', function($http, $q, $routeParams, EventResource) {

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
                var events = data;
                var eventResources = _.map(data.results, function(event) {
                    var eventResource = new EventResource();
                    for(var k in event) eventResource[k]=event[k];
                    eventResource.group_urlname = $routeParams.groupUrlName;
                    return eventResource;
                })
                events.results = eventResources;
                console.log(events.results);
                deferred.resolve(events);
            });
        return deferred.promise;
    }

    return {
        getGroupEvents: groupEvents
    }

}])