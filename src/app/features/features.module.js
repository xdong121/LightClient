(function () {
    'use strict';

    angular.module('Legacy.features', [
            'ui.router',

            'Legacy.features.administration',
            
            'Legacy.features.humanResources',
            'Legacy.features.lightManage',
            'Legacy.features.scrum'
        ])
        .config(routeConfig);

    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/dashboard');

    }

})();