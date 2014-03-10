app.provider('RsvpResource', function() {
    this.$get = ['$resource', function($resource) {
        var Rsvps = $resource(
            '/app/api/rsvps/:id/', {}, {
                update: { method: 'PUT'}
            }
        )
        return Rsvps;
    }]
})