(function () {
    "use strict";

    var moduleId = "Legacy.features.lightManage.tempTimeSch.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('tempTimeSchMainSvc', tempTimeSchMainSvc);

    function tempTimeSchMainSvc($resource) {
        return {
            crud: $resource("/api/TempTimeSchMain/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            BySelect: $resource("/api/TempTimeSchMain/BySelect/:obj"),
            TempTimeConfiguration: $resource("/api/TempTimeSchMain/TempTimeConfiguration/:id", {
                id: '@id'
            }),
        };
    }
   

    angular.module(moduleId).factory('tempTimeSchDetailSvc', tempTimeSchDetailSvc);

    function tempTimeSchDetailSvc($resource) {
        return {
            crud: $resource("/api/TempTimeSchDetail/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            SelcetDetail: $resource("/api/TempTimeSchMain/SelcetDetail/:mid"),
            
        };
    }

}());