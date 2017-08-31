(function () {
    "use strict";

    var moduleId = "Legacy.features.humanResources.titlePost.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('titleLevelSvc', titleLevelSvc);

    function titleLevelSvc($resource) {
        return {
            crud: $resource("/api/titleLevel/:id", {
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

    angular.module(moduleId).factory('titlePostSvc', titlePostSvc);

    function titlePostSvc($resource) {
        return {
            crud: $resource("/api/titlePost/:id", {
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