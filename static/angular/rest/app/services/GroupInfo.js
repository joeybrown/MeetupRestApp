app.factory('GroupInfo', ['$http', '$q', function($http, $q) {

    var groupInfo = function () {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/app/api/get_group_info'}).
            success(function(data) {
                deferred.resolve(data)
            });
        return deferred.promise;
    }

    return {
        getGroupInfo: groupInfo
    }

}])