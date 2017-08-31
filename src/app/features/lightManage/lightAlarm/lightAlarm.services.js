(function () {
    "use strict";

    var moduleId = "Legacy.features.lightManage.lightAlarm.services";
    angular.module(moduleId, ["ngResource"]);

    angular.module(moduleId).factory('lightAlarmSvc', lightAlarmSvc);

    function lightAlarmSvc($resource) {
        return {
            crud: $resource("/api/lightAlarm/:id", {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            ByUpdate: $resource("/api/lightAlarm/ByUpdate/:controlNo/:lightNo/:lightSonNo", {
                controlNo: '@controlNo',
                lightNo: '@lightNo',
                lightSonNo: '@lightSonNo'
            }, {}),
        };
    }

}());