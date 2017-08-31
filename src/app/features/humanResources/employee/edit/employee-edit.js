(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.employee')
        .controller('EmployeeEditController', EmployeeEditController);

    function EmployeeEditController($state, $q, employeeSvc, jobPostSvc, tools) {
        var vm = this;
        vm.id = +$state.params.id;
        vm.temp = {};

        vm.load = function () {
            var employeePromise = employeeSvc.crud.get({
                id: vm.id
            }).$promise;
            var enumPromise = tools.getEnums('HumanResources');
            var jobPostPromise = jobPostSvc.crud.query().$promise;
            vm.loadPromise = $q.all([employeePromise, enumPromise, jobPostPromise]).then(function (result) {
                vm.currentItem = result[0];
                vm.enums = result[1];
                vm.posts = result[2];
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };
        vm.load();

        vm.submit = function () {
            vm.updatePromise = employeeSvc.crud.update(vm.currentItem).$promise
                .then(function (data) {
                    $state.go("humanResources.employee");
                    tools.toastr.success("操作成功");
                }, function (res) {
                    tools.toastr.error(tools.getError(res));
                });
        };
    }

})();