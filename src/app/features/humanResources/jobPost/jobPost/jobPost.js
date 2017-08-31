(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.jobPost')
        .controller('JobPostController', JobPostController);

    function JobPostController($q, $uibModal, jobPostSvc, jobPostLevelSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();

        function load() {
            var jobPostPromise = jobPostSvc.crud.query().$promise;
            var jobPostLevelPromise = jobPostLevelSvc.crud.query().$promise;
            vm.loadPromise = $q.all([jobPostPromise, jobPostLevelPromise]).then(function (result) {
                vm.items = result[0];
                vm.levels = result[1];
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        }
        load();

        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/jobPost/jobPost/jobPost.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, jobPostSvc, levels) {
                    var vm = this;
                    vm.current = {};
                    vm.levels = levels;
                    vm.submitAdd = function () {
                        vm.addPromise = jobPostSvc.crud.save(vm.current).$promise
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
                templateUrl: 'app/features/humanResources/jobPost/jobPost/jobPost.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, jobPostSvc, cloned, levels) {
                    var vm = this;
                    vm.current = cloned;
                    vm.levels = levels;
                    vm.submitEdit = function () {
                        vm.updatePromise = jobPostSvc.crud.update(vm.current).$promise
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
            vm.deletePromise = jobPostSvc.crud.remove({
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