(function () {
    'use strict';

    angular.module('Legacy.features.administration.users', [
        'Legacy.features.administration.users.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('administration.users', {
                url: '/administration-users',
                templateUrl: 'app/features/administration/users/users.html',
                title: '用户管理',
                controller: "UsersController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1000
                },
            });
    }
})();