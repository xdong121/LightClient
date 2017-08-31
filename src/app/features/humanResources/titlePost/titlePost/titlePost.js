(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.titlePost')
        .controller('TitlePostController', TitlePostController);

    function TitlePostController($q, $uibModal, titlePostSvc, titleLevelSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();

        function load() {
            var titlePostPromise = titlePostSvc.crud.query().$promise;
            var titleLevelPromise = titleLevelSvc.crud.query().$promise;
             var enumPromise = tools.getEnums('HumanResources');
            vm.loadPromise = $q.all([titlePostPromise, titleLevelPromise,enumPromise]).then(function (result) {
                vm.items = result[0];
                vm.levels = result[1];
                vm.titlePostNatures = result[2].titlePostNature;
            }, function (res) {
                var msg = tools.toastr.error(tools.getError(res));
            });
        }
        load();

        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/titlePost/titlePost/titlePost.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, titlePostSvc, levels, titlePostNatures) {
                    var vm = this;
                    vm.current = {};
                    vm.levels = levels;
                    vm.titlePostNatures = titlePostNatures;
                    vm.submitAdd = function () {
                        vm.addPromise = titlePostSvc.crud.save(vm.current).$promise
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
                    titlePostNatures: function() {
                        return vm.titlePostNatures;
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
                templateUrl: 'app/features/humanResources/titlePost/titlePost/titlePost.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, titlePostSvc, cloned, levels, titlePostNatures) {
                    var vm = this;
                    vm.current = cloned;
                    vm.levels = levels;
                    vm.titlePostNatures = titlePostNatures;
                    vm.submitEdit = function () {
                        vm.updatePromise = titlePostSvc.crud.update(vm.current).$promise
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
                    titlePostNatures: function() {
                        return vm.titlePostNatures;
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
            vm.deletePromise = titlePostSvc.crud.remove({
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