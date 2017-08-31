(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.nationality')
        .controller('nationalityController', nationalityController);

    function nationalityController($uibModal,$timeout, nationalitySvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();
        vm.search = {};
       

        vm.load = function (tableState) {
            var pagination = tableState.pagination;
            var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = pagination.number || 10; // Number of entries showed per page.
            var params = {
                pageIndex: start / pageSize,
                pageSize: pageSize,
                userName: vm.search.userName
            };
            vm.loadPromise = nationalitySvc.byPage.get(params).$promise;
            vm.loadPromise.then(function (result) {
                //alert(result.data);
                vm.items = result.data;
                pagination.numberOfPages = result.pageCount;
            }, function (res) {
                var msg = tools.getError(tools.toastr.error(msg));
            });
        }
        vm.search = function() {
            vm.hideTable = true;
            $timeout(function() {
                vm.hideTable = false;
            });
        };

        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/humanResources/nationality/nationality/nationality.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, nationalitySvc) {
                    var vm = this;
                    vm.current = {};
                    vm.submitAdd = function () {
                        vm.addPromise = nationalitySvc.crud.save(vm.current).$promise
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
                templateUrl: 'app/features/humanResources/nationality/nationality/nationality.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, nationalitySvc, cloned) {
                    var vm = this;
                    vm.current = cloned;
                    vm.submitEdit = function () {
                        vm.updatePromise = nationalitySvc.crud.update(vm.current).$promise
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
            vm.deletePromise = nationalitySvc.crud.remove({
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