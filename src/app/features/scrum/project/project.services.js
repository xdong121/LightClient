(function () {
    "use strict";

    var moduleId = "Legacy.features.scrum.project.services";
    angular.module(moduleId, ["ngResource"]);
    
    angular.module(moduleId).factory('projectSvc', projectSvc);

    function projectSvc($resource) {
        return {
            crud: $resource("/api/project/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            byPage: $resource("/api/Project/ByPage/:pageIndex/:pageSize", {
                pageIndex: '@pageIndex',
                pageSize: '@pageSize'
            }, {})
        };
    }

}());