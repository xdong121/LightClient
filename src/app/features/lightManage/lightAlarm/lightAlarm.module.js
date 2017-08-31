(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightAlarm', [
        'Legacy.features.lightManage.lightAlarm.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider           
            .state('lightManage.lightAlarm', {
                url: '/lightManage-lightAlarm',
                templateUrl: 'app/features/lightManage/lightAlarm/lightAlarm/lightAlarm.html',
                title: '灯报警信息设置',
                controller: "lightAlarmController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1400
                }
            })
            .state('lightManage.lightAlarmSelect', {
                url: '/lightManage-lightAlarmSelect',
                templateUrl: 'app/features/lightManage/lightAlarm/lightAlarmSelect/lightAlarmSelect.html',
                title: '灯报警信息查询',
                controller: "lightAlarmSelectController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1400
                }
            })
    }
})();