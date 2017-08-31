(function () {
    'use strict';

    angular.module('Legacy.features.administration', [   
        'Legacy.features.administration.roles',        
        'Legacy.features.administration.users',
        'Legacy.features.administration.roleUsers'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('administration', {
                url: '/administration',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: '系统设定',
                sidebarMeta: {
                    icon: 'ion-gear-b',
                    order: 10000,
                },
            });
    }

})();