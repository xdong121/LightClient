(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.employee')
        .controller('EmployeeController', EmployeeController);

    function EmployeeController($q, $timeout, $uibModal, employeeSvc, tools) {
        var vm = this;
        vm.deleteSweetOptions = tools.getSweetOptions();
        vm.filter = {
            includeChildren: false
        };

        vm.load = function (tableState) {
            var pagination = tableState.pagination;
            var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = pagination.number || 10; // Number of entries showed per page.
            var params = {
                pageIndex: start / pageSize,
                pageSize: pageSize,
                includeChildren: vm.filter.includeChildren,
                departmentId: vm.currentDepartment.id
            };

            var employeePromise = employeeSvc.byPage.get(params).$promise;
            var enumPromise = tools.getEnums('HumanResources');
            vm.loadPromise = $q.all([employeePromise, enumPromise]).then(function (result) {
                vm.items = result[0].data;
                console.log(vm.items);
                vm.enums = result[1];
                pagination.numberOfPages = result[0].pageCount;
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };

        vm.departmentChange = function (department) {
            vm.currentDepartment = null;
            $timeout(function () {
                vm.currentDepartment = department;
            });
        };

        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/employee/employee.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, employeeSvc, departmentId) {
                    console.log(departmentId);
                    var vm = this;
                    vm.newItem = {
                        departmentId: departmentId
                    };
                    vm.submitAdd = function () {
                        vm.addPromise = employeeSvc.crud.save(vm.newItem).$promise
                            .then(function (data) {
                                tools.toastr.success("操作成功");
                                $uibModalInstance.close(data);
                            }, function (res) {
                                tools.toastr.error(tools.getError(res));
                            });
                    };
                },
                controllerAs: 'vm',
                resolve: {
                    departmentId: function () {
                        return vm.currentDepartment.id;
                    }
                }
            });
            addModal.result.then(function (item) {
                vm.items.push(item);
            }, function () {});
        };

        vm.remove = function (item) {
            vm.deletePromise = employeeSvc.crud.remove({
                id: item.id
            }).$promise.then(function (data) {
                tools.toastr.success("删除成功");
                var index = vm.items.indexOf(item);
                if (index > -1) {
                    vm.items.splice(index, 1);
                }
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };
    }

})();