app.directive('eventRsvp', [function() {

    var link = function() {

    }

    var template = '<div data-ng-mouseenter="showHideOption = true" data-ng-mouseleave="showHideOption = false">\n    {{ groupEvent.name }}\n\n<div data-ng-show="showHideOption" class="btn btn-xs btn-danger" data-ng-click="addToHiddenMeetups(groupEvent.name)" >\n    <span class="glyphicon glyphicon-remove"></span>\n    hide events like this\n</div>\n</div>'

    var controller = ['$scope', function($scope) {
        console.log($scope.hiddenMeetups);

        $scope.addToHiddenMeetups = function (groupName) {
            $scope.hiddenMeetups.push(groupName);
            console.log($scope.hiddenMeetups);
        }


    }]

    return {
        scope: {
            hiddenMeetups: '=',
            groupEvent: '='
        },
        link: link,
        template: template,
        controller: controller
    }

}])