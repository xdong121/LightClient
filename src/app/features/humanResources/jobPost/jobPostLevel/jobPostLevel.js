(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.jobPost')
        .controller('JobPostLevelController', JobPostLevelController);

    function JobPostLevelController($uibModal, jobPostLevelSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();

        function load() {
            vm.loadPromise = jobPostLevelSvc.crud.query().$promise;
            vm.loadPromise.then(function (data) {
                vm.items = data;
            }, function (res) {
                var msg = tools.getError(tools.toastr.error(msg));
            });
        }
        load();

        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/jobPost/jobPostLevel/jobPostLevel.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, jobPostLevelSvc) {
                    var vm = this;
                    vm.current = {};
                    vm.submitAdd = function () {
                        vm.addPromise = jobPostLevelSvc.crud.save(vm.current).$promise
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
                vm.items.push(item);
            }, function () {});
        };

        vm.edit = function (item) {
            var cloned = angular.copy(item);
            var editModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/jobPost/jobPostLevel/jobPostLevel.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, jobPostLevelSvc, cloned) {
                    var vm = this;
                    vm.current = cloned;
                    vm.submitEdit = function () {
                        vm.updatePromise = jobPostLevelSvc.crud.update(vm.current).$promise
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
                var index = vm.items.indexOf(item);
                if (index > -1) {
                    vm.items[index] = updatedItem;
                }
            }, function () {
                cloned = undefined;
            });
        };
        vm.remove = function (item) {
            vm.deletePromise = jobPostLevelSvc.crud.remove({
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