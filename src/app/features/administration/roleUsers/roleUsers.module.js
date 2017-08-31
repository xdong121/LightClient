(function () {
    'use strict';

    angular.module('Legacy.features.administration.roleUsers', []).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('administration.roleUsers', {
                url: '/administration-roleUsers',
                templateUrl: 'app/features/administration/roleUsers/roleUsers.html',
                title: '角色成员',
                controller: "RoleUsersController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 1200
                },
            });
    }
})();