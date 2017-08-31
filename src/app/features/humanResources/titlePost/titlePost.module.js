(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.titlePost', [
        'Legacy.features.humanResources.titlePost.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('humanResources.titleLevel', {
                url: '/humanResources-titleLevel',
                templateUrl: 'app/features/humanResources/titlePost/titleLevel/titleLevel.html',
                title: '职称级别',
                controller: "TitleLevelController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1500
                }
            })
            .state('humanResources.titlePost', {
                url: '/humanResources-titlePost',
                templateUrl: 'app/features/humanResources/titlePost/titlePost/titlePost.html',
                title: '职称',
                controller: "TitlePostController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1600
                }
            })
    }
})();