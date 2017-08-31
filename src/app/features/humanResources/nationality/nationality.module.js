(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.nationality', [
        'Legacy.features.humanResources.nationality.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider           
            .state('humanResources.nationality', {
                url: '/humanResources-nationality',
                templateUrl: 'app/features/humanResources/nationality/nationality/nationality.html',
                title: '民族',
                controller: "nationalityController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1700
                }
            })
    }
})();