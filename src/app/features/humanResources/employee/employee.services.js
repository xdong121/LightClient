(function () {
    "use strict";

    var moduleId = "Legacy.features.humanResources.employee.services";
    angular.module(moduleId, ["ngResource"]);
    angular.module(moduleId).factory('employeeSvc', employeeSvc);

    function employeeSvc($resource) {
        return {
            crud: $resource("/api/employee/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            byPage: $resource("/api/Employee/ByPage/:pageIndex/:pageSize/:includeChildren/:departmentId?", {
                pageIndex: '@pageIndex',
                pageSize: '@pageSize',
                includeChildren: '@includeChildren',
                departmentId: '@departmentId'
            }, {}),
        };
    }

}());