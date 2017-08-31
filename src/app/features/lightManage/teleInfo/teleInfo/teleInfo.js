(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.teleInfo')
        .controller('teleInfoController', teleInfoController);

    function teleInfoController($uibModal,$timeout, teleInfoSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();
        vm.search = {};
       
       /* vm.load = function() {
            vm.loadPromise = teleInfoSvc.crud.query().$promise;
            vm.loadPromise.then(function (result) {
                //alert(result.length);
                vm.items = result;
                console.log(vm.items);
            }, function (res) {
                var msg = tools.getError(tools.toastr.error(msg));
            });
        }
        vm.load();*/

        vm.load = function (tableState) {
            var pagination = tableState.pagination;
            var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = pagination.number || 10; // Number of entries showed per page.
            var params = {
                pageIndex: start / pageSize,
                pageSize: pageSize,
                content: vm.search.content
            };
            vm.loadPromise = teleInfoSvc.byPage.get(params).$promise;
            vm.loadPromise.then(function (result) {
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
                templateUrl: 'app/features/lightManage/teleInfo/teleInfo/teleInfo.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, teleInfoSvc) {
                    var vm = this;
                    vm.current = {};
                    vm.submitAdd = function () {
                        vm.current.type=0;
                        vm.current.Result=0;
                        vm.addPromise = teleInfoSvc.crud.save(vm.current).$promise
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
                //alert(item.Result);
                vm.items.push(item);
            }, function () {});
        };

        vm.edit = function (item) {
            var cloned = angular.copy(item);
            var editModal = $uibModal.open({
                templateUrl: 'app/features/lightManage/teleInfo/teleInfo/teleInfo.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, teleInfoSvc, cloned) {
                    var vm = this;
                    vm.current = cloned;
                    vm.submitEdit = function () {
                        vm.updatePromise = teleInfoSvc.crud.update(vm.current).$promise
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
            vm.deletePromise = teleInfoSvc.crud.remove({
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