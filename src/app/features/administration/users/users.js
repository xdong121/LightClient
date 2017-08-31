(function () {
    'use strict';

    angular.module('Legacy.features.administration.users')
        .controller('UsersController', UsersController);

    function UsersController($uibModal, $timeout, userSvc, tools) {
        var vm = this;
        vm.deleteSweetOptions = tools.getSweetOptions();
        vm.search = {};

        vm.users = [];
        vm.load = function (tableState) {
            var pagination = tableState.pagination;
            var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = pagination.number || 10; // Number of entries showed per page.
            var params = {
                pageIndex: start / pageSize,
                pageSize: pageSize,
                userName: vm.search.userName
            };
            vm.loadPromise = userSvc.byPage.get(params).$promise;
            vm.loadPromise.then(function (result) {
                vm.users = result.data;
                pagination.numberOfPages = result.pageCount;
                //pagination.totalItemCount = result.count;
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };
        vm.search = function() {
            vm.hideTable = true;
            $timeout(function() {
                vm.hideTable = false;
            });
        };
        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/administration/users/users.add.modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, userSvc) {
                    var vm = this;
                    vm.newItem = {};
                    vm.submitAdd = function () {
                        vm.addPromise = userSvc.crud.save(vm.newItem).$promise
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
                vm.users.push(item);
            }, function () {});
        };

        vm.resetPasswordSweetOptions = tools.getSweetOptions({
            text: '密码将被设定为: 123456'
        });

        vm.resetPassword = function (item) {
            vm.resetPasswordPromise = userSvc.password.save({
                userName: item.userName,
                resetPassword: '123456'
            }).$promise.then(function (data) {
                tools.toastr.success("操作成功");
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };

        vm.remove = function (item) {
            vm.deletePromise = userSvc.crud.remove({
                id: item.id
            }).$promise.then(function (data) {
                tools.toastr.success("删除成功");
                var index = vm.users.indexOf(item);
                if (index > -1) {
                    vm.users.splice(index, 1);
                }
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };
    }

})();