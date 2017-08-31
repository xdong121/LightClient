(function () {
    "use strict";

    var moduleId = "Legacy.features.administration.users.services";

    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('userSvc', userSvc);

    function userSvc($resource) {
        return {
            crud: $resource("/api/User/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            byPage: $resource("/api/User/ByPage/:pageIndex/:pageSize/:userName?", {
                pageIndex: '@pageIndex',
                pageSize: '@pageSize',
                userName: '@userName'
            }, {}),
            password: $resource("/api/User/resetPassword", null, {})
        };
    }

}());