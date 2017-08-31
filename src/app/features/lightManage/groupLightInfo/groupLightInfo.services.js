(function () {
    "use strict";

    var moduleId = "Legacy.features.lightManage.groupLightInfo.services";
    angular.module(moduleId, ["ngResource"]);
    angular.module(moduleId).factory('groupLightInfoSvc', groupLightInfoSvc);

    function groupLightInfoSvc($resource) {
        return {
            crud: $resource("/api/GroupLightInfo/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            tree: $resource("/api/GroupLightInfo/Tree", null, {}),
            selectNoTime: $resource("/api/GroupLightInfo/SelectNoTime/:id", {
                id: '@id'
            }),
            setNoTime: $resource("/api/GroupLightInfo/SetNoTime/:id", {
                id: '@id'
            }),
        };
    }

}());