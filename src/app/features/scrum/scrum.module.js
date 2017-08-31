(function () {
    'use strict';

    angular.module('Legacy.features.scrum', [
        'Legacy.features.scrum.project'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('scrum', {
                url: '/scrum',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: 'Scrum开发管理',
                sidebarMeta: {
                    icon: 'ion-merge',
                    order: 1200,
                },
            });
    }

})();