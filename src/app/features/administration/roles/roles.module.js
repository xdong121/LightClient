(function () {
    'use strict';

    angular.module('Legacy.features.administration.roles', [
        'Legacy.features.administration.roles.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('administration.roles', {
                url: '/administration-roles',
                templateUrl: 'app/features/administration/roles/roles.html',
                title: '角色管理',
                controller: "RolesController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1100
                },
            });
    }
})();