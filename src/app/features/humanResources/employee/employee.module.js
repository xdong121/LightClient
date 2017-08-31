(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.employee', [
        'Legacy.features.humanResources.employee.services'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('humanResources.employee', {
                url: '/humanResources-employee',
                templateUrl: 'app/features/humanResources/employee/employee.html',
                title: '员工资料',
                controller: "EmployeeController",
                controllerAs: "vm",
                sidebarMeta: {
                    order: 100
                }
            })
            .state('humanResources.employee-edit', {
                url: '/humanResources-employee-edit/:id',
                templateUrl: 'app/features/humanResources/employee/edit/employee-edit.html',
                title: '编辑员工资料',
                controller: "EmployeeEditController",
                controllerAs: "vm"
            });
    }
})();