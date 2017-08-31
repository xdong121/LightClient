(function () {
    "use strict";

    var moduleId = "Legacy.features.lightManage.lightSch.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('lightSchMainSvc', lightSchMainSvc);

    function lightSchMainSvc($resource) {
        return {
            crud: $resource("/api/LightSchMain/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            BySelect: $resource("/api/LightSchMain/BySelect/:obj"),
            LightConfiguration: $resource("/api/LightSchMain/LightConfiguration/:id", {
                id: '@id'
            }),
        };
    }
   

    angular.module(moduleId).factory('lightSchDetailSvc', lightSchDetailSvc);

    function lightSchDetailSvc($resource) {
        return {
            crud: $resource("/api/LightSchDetail/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            SelcetDetail: $resource("/api/LightSchMain/SelcetDetail/:mid"),
        };
    }

}());