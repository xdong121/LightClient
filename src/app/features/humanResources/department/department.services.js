(function () {
    "use strict";

    var moduleId = "Legacy.features.humanResources.department.services";
    angular.module(moduleId, ["ngResource"]);
    angular.module(moduleId).factory('departmentSvc', departmentSvc);

    function departmentSvc($resource) {
        return {
            crud: $resource("/api/Department/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            tree: $resource("/api/Department/Tree", null, {})
        };
    }

}());