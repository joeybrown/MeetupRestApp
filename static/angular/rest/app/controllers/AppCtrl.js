'use strict';

app.controller('AppCtrl',  ['$scope', '$location', 'Groups',
    function ($scope, $location, Groups) {
        $scope.groups = _.map(Groups, function(group) {
            return group.results[0];
        });

        $scope.goToGroupPage = function(groupUrlName) {
            $location.url('/app/groups/{0}?page=15&offset=0'.format(groupUrlName));
        }
    }]);

