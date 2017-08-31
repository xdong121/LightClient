(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.administrativePost', [
        'Legacy.features.humanResources.administrativePost.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('humanResources.administrativeLevel', {
                url: '/humanResources-administrativeLevel',
                templateUrl: 'app/features/humanResources/administrativePost/administrativeLevel/administrativeLevel.html',
                title: '行政岗位级别',
                controller: "AdministrativeLevelController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1300
                }
            })
            .state('humanResources.administrativePost', {
                url: '/humanResources-administrativePost',
                templateUrl: 'app/features/humanResources/administrativePost/administrativePost/administrativePost.html',
                title: '行政岗位',
                controller: "AdministrativePostController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1400
                }
            })
    }
})();