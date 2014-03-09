/**
 * Created by josephbrown on 3/8/14.
 */
app.provider('Events', function() {
    this.$get = ['$resource', function($resource) {
        var Events = $resource(
            '/app/api/events/:id/', {}, {
                update: {
                    method: 'PUT'
                }
            })
        return Events;
    }]
})