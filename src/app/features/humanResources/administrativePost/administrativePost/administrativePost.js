(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.administrativePost')
        .controller('AdministrativePostController', AdministrativePostController);

    function AdministrativePostController($q, $uibModal, administrativePostSvc, administrativeLevelSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();

        function load() {
            var administrativePostPromise = administrativePostSvc.crud.query().$promise;
            var administrativeLevelPromise = administrativeLevelSvc.crud.query().$promise;
             var enumPromise = tools.getEnums('HumanResources');
            vm.loadPromise = $q.all([administrativePostPromise, administrativeLevelPromise,enumPromise]).then(function (result) {
                vm.items = result[0];
                vm.levels = result[1];
                vm.administrativePostNatures = result[2].administrativePostNature;
            }, function (res) {
                var msg = tools.toastr.error(tools.getError(res));
            });
        }
        load();

        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/administrativePost/administrativePost/administrativePost.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, administrativePostSvc, levels, administrativePostNatures) {
                    var vm = this;
                    vm.current = {};
                    vm.levels = levels;
                    vm.administrativePostNatures = administrativePostNatures;
                    vm.submitAdd = function () {
                        vm.addPromise = administrativePostSvc.crud.save(vm.current).$promise
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
                    levels: function() {
                        return vm.levels;
                    },
                    administrativePostNatures: function() {
                        return vm.administrativePostNatures;
                    }
                }
            });
            addModal.result.then(function (item) {
                vm.items.push(item);
            }, function () {});
        };

        vm.edit = function (item) {
            var cloned = angular.copy(item);
            var editModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/administrativePost/administrativePost/administrativePost.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, administrativePostSvc, cloned, levels, administrativePostNatures) {
                    var vm = this;
                    vm.current = cloned;
                    vm.levels = levels;
                    vm.administrativePostNatures = administrativePostNatures;
                    vm.submitEdit = function () {
                        vm.updatePromise = administrativePostSvc.crud.update(vm.current).$promise
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
                    },
                    levels: function() {
                        return vm.levels;
                    },
                    administrativePostNatures: function() {
                        return vm.administrativePostNatures;
                    }
                }
            });
            editModal.result.then(function (updatedItem) {
                var index = vm.items.indexOf(item);
                if (index > -1) {
                    vm.items[index] = updatedItem;
                }
            }, function () {
                cloned = undefined;
            });
        };
        vm.remove = function (item) {
            vm.deletePromise = administrativePostSvc.crud.remove({
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