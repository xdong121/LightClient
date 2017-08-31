(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.teleInfo', [
        'Legacy.features.lightManage.teleInfo.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider, baSidebarServiceProvider) {
        $stateProvider
            .state('lightManage.teleInfo', {
                url: '/lightManage-teleInfo',
                templateUrl: 'app/features/lightManage/teleInfo/teleInfo/teleInfo.html',
                title: '电文信息查询',
                controller: "teleInfoController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1000
                }
            });
    }
})();