app.directive('eventActions', [function() {

    var template = '<data ng-show="showEditButton">\n    <span class="btn btn-info" data-ng-click="openEditModal({event: event})">\n        <span class="glyphicon glyphicon-pencil"></span>\n    </span>\n</data>\n\n<data ng-show="showDeleteButton">\n    <span class="btn btn-danger" data-ng-click="openDeleteModal({event: event})">\n        <span class="glyphicon glyphicon-remove"></span>\n    </span>\n</data>'

    var controller = ['$scope', function($scope) {
        $scope.showEditButton = _.contains($scope.event.self.actions, 'edit');
        $scope.showDeleteButton = _.contains($scope.event.self.actions, 'delete')
    }]


    return {
        scope: {
            event: '=eventActions',
            openEditModal: '&',
            openDeleteModal: '&'
        },
        template: template,
        controller: controller
    }

}])