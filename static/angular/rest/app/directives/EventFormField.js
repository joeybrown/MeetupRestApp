app.directive('eventFormField', [function() {
    var template = '<div class="row">\n    <div class="col col-lg-2" style="text-align: right; margin-bottom: 10px">\n        <label for="{{ htmlId }}">{{ label }}</label>\n    </div>\n    <div class="col col-lg-10">\n        <input id="{{ htmlId }}" data-ng-model="event" style="width: 100%">\n    </div>\n</div>'

    var controller = ['$scope', function($scope) {
         $scope.htmlId = (function() {
             return 'field-{0}'.format($scope.label);
         }())

        $scope.event = angular.copy($scope.ngModel);
    }]

    return {
        require: '^ngModel',
        scope: {
            ngModel: '=',
            label: '@'
        },
        template: template,
        controller: controller
    }
}])