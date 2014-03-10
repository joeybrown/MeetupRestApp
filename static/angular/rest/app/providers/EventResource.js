app.provider('EventResource', function() {
    this.$get = ['$resource', function($resource) {
        var Event = $resource(
            '/app/api/events/:id/', {}, {
                update: { method: 'PUT' }
            }
        )
        return Event;
    }]
})