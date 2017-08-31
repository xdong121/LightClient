(function () {
    "use strict";

    var moduleId = "Legacy.features.humanResources.administrativePost.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('administrativeLevelSvc', administrativeLevelSvc);

    function administrativeLevelSvc($resource) {
        return {
            crud: $resource("/api/AdministrativeLevel/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            })
        };
    }

    angular.module(moduleId).factory('administrativePostSvc', administrativePostSvc);

    function administrativePostSvc($resource) {
        return {
            crud: $resource("/api/AdministrativePost/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            })
        };
    }

}());