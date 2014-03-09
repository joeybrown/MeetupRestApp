app.directive('eventLocation', [function() {
    var template = '<strong>\n    {{ eventLocation.name }}\n</strong>\n<br>\n{{ eventLocation.address_1 }}\n<br>\n<span data-ng-if="eventLocation.address_2">\n    {{ eventLocation.address_2 }}\n    <br>\n</span>\n\n{{ eventLocation.city }}, {{ eventLocation.state }} {{ eventLocation.zip }}'

    return {
        scope: {
            eventLocation: '='
        },
        template: template
    }

}])