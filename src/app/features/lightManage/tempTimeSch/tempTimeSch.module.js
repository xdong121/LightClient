(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.tempTimeSch', [
        'Legacy.features.lightManage.tempTimeSch.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider, baSidebarServiceProvider) {
        $stateProvider
            .state('lightManage.tempTimeSch', {
                url: '/lightManage-tempTimeSch',
                templateUrl: 'app/features/lightManage/tempTimeSch/tempTimeSch.html',
                title: 'Hen临时方案设置',
                controller: "tempTimeSchController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1000
                }
            });
    }
})();