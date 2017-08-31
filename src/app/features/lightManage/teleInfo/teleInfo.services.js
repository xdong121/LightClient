(function () {
    "use strict";

    var moduleId = "Legacy.features.lightManage.teleInfo.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('teleInfoSvc', teleInfoSvc);

    function teleInfoSvc($resource) {
        return {
            crud: $resource("/api/TeleInfo/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            byPage: $resource("/api/TeleInfo/ByPage/:pageIndex/:pageSize/:content?", {
                pageIndex: '@pageIndex',
                pageSize: '@pageSize',
                content: '@content'
            }, {}),
        };
    }
   

}());