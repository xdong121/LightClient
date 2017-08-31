(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.jobPost', [
        'Legacy.features.humanResources.jobPost.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('humanResources.jobPostLevel', {
                url: '/humanResources-jobPostLevel',
                templateUrl: 'app/features/humanResources/jobPost/jobPostLevel/jobPostLevel.html',
                title: '岗位级别',
                controller: "JobPostLevelController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1100
                }
            })
            .state('humanResources.jobPost', {
                url: '/humanResources-jobPost',
                templateUrl: 'app/features/humanResources/jobPost/jobPost/jobPost.html',
                title: '岗位',
                controller: "JobPostController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1200
                }
            })
    }
})();