(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.groupInfo', [
        'Legacy.features.lightManage.groupInfo.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider           
            .state('lightManage.groupInfo', {
                url: '/lightManage-groupInfo',
                templateUrl: 'app/features/lightManage/groupInfo/groupInfo/groupInfo.html',
                title: '组信息',
                controller: "GroupInfoController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1400
                }
            })
    }
})();