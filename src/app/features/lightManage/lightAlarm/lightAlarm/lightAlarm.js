(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightAlarm')
        .controller('lightAlarmController', lightAlarmController);

    function lightAlarmController($q, $uibModal, $timeout, lightAlarmSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();

        function load() {
            // vm.loadPromise = lightAlarmSvc.crud.query().$promise;
            // vm.loadPromise.then(function (data) {
            //     vm.items = data;
            // }, function (res) {
            //     var msg = tools.toastr.error(tools.getError(res));
            // });

            var lightAlarmPromise = lightAlarmSvc.crud.query().$promise;
            var enumPromise = tools.getEnums('LightManage');
            vm.loadPromise = $q.all([lightAlarmPromise, enumPromise]).then(function (result) {
                //console.log(result);
                vm.items = result[0];
                vm.enums = result[1];
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        }
        load();

        vm.add = function () {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/lightManage/lightAlarm/lightAlarm/lightAlarm.add-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, lightAlarmSvc) {
                    var vm = this;
                    vm.current = {};
                    vm.submitAdd = function () {
                        vm.current.back1=vm.current.controlNo+vm.current.lightNo+vm.current.lightSonNo;
                        vm.addPromise = lightAlarmSvc.crud.save(vm.current).$promise
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
                templateUrl: 'app/features/lightManage/lightAlarm/lightAlarm/lightAlarm.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, lightAlarmSvc, cloned, enums) {
                    var vm = this;
                    vm.current = cloned;
                    vm.enums = enums;
                    vm.submitEdit = function () {
                        vm.updatePromise = lightAlarmSvc.crud.update(vm.current).$promise
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
                    enums: function () {
                        return vm.enums;
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
            vm.deletePromise = lightAlarmSvc.crud.remove({
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