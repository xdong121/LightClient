(function () {
    "use strict";

    var moduleId = "Legacy.features.lightManage.lightInfo.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('LightInfoSvc', LightInfoSvc);

    function LightInfoSvc($resource) {
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
            toGroup: $resource("/api/GroupLightInfo/ToGroup/:groupID/:obj", {
                groupID: '@groupID',
                obj: '@obj'
            }, {}),
            BySelect: $resource("/api/GroupLightInfo/BySelect/:controlNo/:lightNo/:lightSonNo", {
                controlNo: '@controlNo',
                lightNo: '@lightNo',
                lightSonNo: '@lightSonNo'
            }, {}),
        };
    }
   

}());