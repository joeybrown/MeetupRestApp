app.factory('GroupInfo', ['$http', '$q', function($http, $q) {

    var groupInfo = function (groupUrlName) {
        var apiUrl = groupUrlName ? '/app/api/get_group_info/{0}/'.format(groupUrlName) : '/app/api/get_group_info/';

        var deferred = $q.defer();
        $http({method: 'GET', url: apiUrl}).
            success(function(data) {
                deferred.resolve(data)
            });
        return deferred.promise;
    }

    return {
        getGroupInfo: groupInfo
    }

}])