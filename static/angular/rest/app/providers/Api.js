app.provider('Api', function() {
    this.$get = ['$resource', function ($resource) {

        var Api = $resource('/app/oauth', {}, {
            get: {
                method: 'GET'
            }
        })

        return Api;
    }]
})