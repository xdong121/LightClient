(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightInfo', [
        'Legacy.features.lightManage.lightInfo.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider, baSidebarServiceProvider) {
        $stateProvider
            .state('lightManage.lightInfo', {
                url: '/lightManage-lightInfo',
                templateUrl: 'app/features/lightManage/lightInfo/lightInfo/lightInfo.html',
                title: '灯节点管理',
                controller: "lightInfoController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1800
                }
            })
            .state('lightManage.lightInfoSelect', {
                url: '/lightManage-lightInfoSelect',
                templateUrl: 'app/features/lightManage/lightInfo/lightInfoSelect/lightInfoSelect.html',
                title: '查询当前灯状态',
                controller: "lightInfoSelectController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1900
                }
            });
    }
})();