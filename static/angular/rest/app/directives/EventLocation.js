app.directive('eventLocation', [function() {
    var template = '<strong>\n    {{ eventLocation.name }}\n</strong>\n<span data-ng-if="eventLocation.address_1">\n<br/>\n{{ eventLocation.address_1 }}\n</span>\n<span data-ng-if="eventLocation.address_2">\n<br/>\n{{ eventLocation.address_2 }}\n</span>\n<span>\n<br/>\n{{ cityStateZip }}\n</span>\n\n\n'

    var controller = ['$scope', function ($scope) {

        $scope.cityStateZip = (function() {
            if ($scope.eventLocation && ($scope.eventLocation.city || $scope.eventLocation.state || $scope.eventLocation.zip)) {
                var address = '';
                if ($scope.eventLocation.city) {
                    address += $scope.eventLocation.city;
                    if ($scope.eventLocation.state || $scope.eventLocation.zip) {
                        address += ', ';
                    }
                }
                if ($scope.eventLocation.state) {
                    address += $scope.eventLocation.state + ' ';
                }
                if ($scope.eventLocation.zip) {
                    address += $scope.eventLocation.zip;
                }
                return address;
            }
        }());
    }]

    return {
        scope: {
            eventLocation: '='
        },
        template: template,
        controller: controller
    }

}])