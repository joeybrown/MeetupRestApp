app.provider('Rsvps', function() {
    this.$get = ['$resource', function($resource) {
        var Rsvps = $resource(
            '/app/api/rsvps/:id/', {}, {}
        )
        return Rsvps;
    }]
})