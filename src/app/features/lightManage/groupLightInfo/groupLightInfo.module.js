(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.groupLightInfo', [
        'Legacy.features.lightManage.groupLightInfo.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('lightManage.groupLightInfo', {
                url: '/lightManage-groupLightInfo',
                templateUrl: 'app/features/lightManage/groupLightInfo/groupLightInfo.html',
                title: '灯节点信息',
                controller: "GroupLightInfoController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1500
                },
            });
    }
})();