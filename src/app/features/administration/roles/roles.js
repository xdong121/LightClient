(function () {
    'use strict';

    angular.module('Legacy.features.administration.roles')
        .controller('RolesController', RolesController);

    function RolesController($uibModal, roleSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();

        function load() {
            vm.loadPromise = roleSvc.crud.query().$promise;
            vm.loadPromise.then(function (data) {
                vm.roles = data;
            }, function (res) {
                var msg = tools.getError(res);
                tools.toastr.error(msg);
            });
        }
        load();
        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/administration/roles/roles.add.modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, roleSvc) {
                    var vm = this;
                    vm.newItem = {};
                    vm.submitAdd = function () {
                        vm.addPromise = roleSvc.crud.save(vm.newItem).$promise
                            .then(function (data) {
                                tools.toastr.success("操作成功");
                                $uibModalInstance.close(data);
                            }, function (res) {
                                tools.toastr.error(tools.getError(res));
                            });
                    };
                },
                controllerAs: 'vm'
            });
            addModal.result.then(function (item) {
                vm.roles.push(item);
            }, function () {});
        };

        vm.edit = function (item) {
            var cloned = angular.copy(item);
            var editModal = $uibModal.open({
                templateUrl: 'app/features/administration/roles/roles.edit.modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, roleSvc, cloned) {
                    var vm = this;
                    vm.current = cloned;
                    vm.submitEdit = function () {
                        vm.updatePromise = roleSvc.crud.update(vm.current).$promise
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
                    cloned: function () {
                        return cloned;
                    }
                }
            });
            editModal.result.then(function (updatedItem) {
                var index = vm.roles.indexOf(item);
                if (index > -1) {
                    vm.roles[index] = updatedItem;
                }
            }, function () {
                cloned = undefined;
            });
        };
        vm.remove = function (item) {
            vm.deletePromise = roleSvc.crud.remove({
                id: item.id
            }).$promise.then(function (data) {
                tools.toastr.success("删除成功");
                var index = vm.roles.indexOf(item);
                if (index > -1) {
                    vm.roles.splice(index, 1);
                }
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };
    }

})();