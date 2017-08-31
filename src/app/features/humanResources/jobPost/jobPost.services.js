(function () {
    "use strict";

    var moduleId = "Legacy.features.humanResources.jobPost.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('jobPostLevelSvc', jobPostLevelSvc);

    function jobPostLevelSvc($resource) {
        return {
            crud: $resource("/api/JobPostLevel/:id", {
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

    angular.module(moduleId).factory('jobPostSvc', jobPostSvc);

    function jobPostSvc($resource) {
        return {
            crud: $resource("/api/JobPost/:id", {
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