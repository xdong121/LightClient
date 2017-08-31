(function () {
    'use strict';

    angular.module('Legacy.features.work', [
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('work', {
                url: '/work',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: '个人办公',
                sidebarMeta: {
                    icon: 'ion-merge',
                    order: 1000,
                },
            });
    }

})();