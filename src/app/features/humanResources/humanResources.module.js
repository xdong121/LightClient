(function () {
    'use strict';

    angular.module('Legacy.features.humanResources', [
        'Legacy.features.humanResources.department',
        'Legacy.features.humanResources.employee',
        'Legacy.features.humanResources.jobPost',
        'Legacy.features.humanResources.administrativePost',
        'Legacy.features.humanResources.titlePost',
        'Legacy.features.humanResources.nationality'

    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('humanResources', {
                url: '/humanResources',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: '人力资源',
                sidebarMeta: {
                    icon: 'ion-ios-people',
                    order: 1000,
                },
            });
    }

})();