(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightSch', [
        'Legacy.features.lightManage.lightSch.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider, baSidebarServiceProvider) {
        $stateProvider
            .state('lightManage.lightSch', {
                url: '/lightManage-lightSch',
                templateUrl: 'app/features/lightManage/lightSch/lightSch.html',
                title: 'Light临时方案设置',
                controller: "lightSchController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1000
                }
            });
    }
})();