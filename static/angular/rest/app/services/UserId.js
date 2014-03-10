app.factory('UserId', ['$http', '$q', function($http, $q) {
    var userId = function () {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/app/api/get_user_meetup_id/'}).
            success(function(data) {
                deferred.resolve(data)
            });
        return deferred.promise;
    }
    return {
        getUserId: userId
    }
}])