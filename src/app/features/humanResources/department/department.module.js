(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.department', [
        'Legacy.features.humanResources.department.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('humanResources.department', {
                url: '/humanResources-department',
                templateUrl: 'app/features/humanResources/department/department.html',
                title: '组织机构',
                controller: "DepartmentController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 0
                },
            });
    }
})();