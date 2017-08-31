(function () {
    'use strict';

    angular.module('Legacy.features.lightManage', [
        'Legacy.features.lightManage.teleInfo',
        'Legacy.features.lightManage.groupInfo',       
        'Legacy.features.lightManage.groupLightInfo',
        'Legacy.features.lightManage.lightInfo',
        'Legacy.features.lightManage.tempTimeSch',
        'Legacy.features.lightManage.lightSch',
        'Legacy.features.lightManage.lightAlarm'


    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('lightManage', {
                url: '/lightManage',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: '照明控制系统',
                sidebarMeta: {
                    icon: 'ion-ios-people',
                    order: 2000,
                },
            });
    }

})();