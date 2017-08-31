(function () {
    "use strict";

    var moduleId = "Legacy.features.lightManage.groupInfo.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('groupInfoSvc', groupInfoSvc);

    function groupInfoSvc($resource) {
        return {
            crud: $resource("/api/GroupInfo/:id", {
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