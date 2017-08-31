(function () {
    "use strict";

    var moduleId = "Legacy.features.humanResources.nationality.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('nationalitySvc', nationalitySvc);

    function nationalitySvc($resource) {
        return {
            crud: $resource("/api/Nationality/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            byPage: $resource("/api/Nationality/ByPage/:pageIndex/:pageSize/:userName?", {
                pageIndex: '@pageIndex',
                pageSize: '@pageSize',
                userName: '@userName'
            }, {}),
        };
    }
   

}());