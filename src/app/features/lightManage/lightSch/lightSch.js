(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightSch')
        .controller('lightSchController', lightSchController);

    function lightSchController($q, $uibModal, $timeout, SweetAlert, lightSchMainSvc, lightSchDetailSvc, groupLightInfoSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();
        vm.search = {};
        var mainId = 0;


        //    vm.load = function () {
        //         var lightSchMainPromise = lightSchMainSvc.crud.query().$promise;
        //         var enumPromise = tools.getEnums('LightManage');
        //         vm.loadPromise = $q.all([lightSchMainPromise, enumPromise]).then(function (result) {
        //             vm.items = result[0];
        //             vm.enums = result[1];
        //             
        //         }, function (res) {
        //             tools.toastr.error(tools.getError(res));
        //         });
        //     };
        //     vm.load();
        vm.params = {
            pageIndex: 0,
            pageSize: 10,
            id: null,
            makeTime1: null,
            makeTime2: null
        };
        vm.load = function (tableState) {
            var pagination = tableState.pagination;
            var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = pagination.number || 10; // Number of entries showed per page.
            vm.params = {
                pageIndex: start / pageSize,
                pageSize: pageSize,
                id: vm.search.id,
                makeTime1: vm.makeTime1,
                makeTime2: vm.makeTime2
            };
            var lightSchMainPromise = lightSchMainSvc.BySelect.save(vm.params).$promise;
            var enumPromise = tools.getEnums('LightManage');
            var lightSchDetailPromise = lightSchDetailSvc.crud.query().$promise;
            var groupLightInfoPromise = groupLightInfoSvc.crud.query().$promise;
            vm.loadPromise = $q.all([lightSchMainPromise, enumPromise, lightSchDetailPromise, groupLightInfoPromise]).then(function (result) {
                vm.items = result[0].data;
                pagination.numberOfPages = result[0].pageCount;
                vm.enums = result[1];
                vm.detailItems = result[2];
                vm.groupLightInfos = result[3];

            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        }
        vm.search = function () {
            vm.hideTable = true;
            $timeout(function () {
                vm.hideTable = false;
            });
        };

        vm.add = function () {
            if (mainId) {
                addDetail();
            } else {
                addMain();
            }

        };

        function addMain() {
            var addModal = $uibModal.open({
                templateUrl: 'app/features/lightManage/lightSch/lightSchMain/lightSchMain.add-modal.html',
                backdrop: false,
                //注入enums
                controller: function ($uibModalInstance, lightSchMainSvc, enums, groupLightInfos) {
                    var vm = this;
                    vm.current = {};
                    vm.current.makeTime = new Date();
                    //接收传过来的变量
                    vm.enums = enums;
                    //筛选控制器编号
                    vm.groupLightInfoControlNos = groupLightInfos.filter(function (x) {
                        return x.ancestorIds === null;
                    });

                    // console.log(vm.groupLightInfoControlNos);
                    vm.submitAdd = function () {

                        if (!vm.selecTmakeTime) {
                            vm.current.makeTime = null;
                        }
                        // console.log(vm.current);
                        vm.current.groupLightInfoId = vm.gnos.id;
                        vm.current.controlNo = vm.gnos.no;
                        // console.log(vm.current);
                        vm.addPromise = lightSchMainSvc.crud.save(vm.current).$promise
                            .then(function (data) {
                                tools.toastr.success("操作成功");
                                $uibModalInstance.close(data);
                            }, function (res) {
                                tools.toastr.error(tools.getError(res));
                            });
                    };
                },
                controllerAs: 'vm',
                //注入，把load里面的变量传过来。
                resolve: {
                    enums: function () {
                        return vm.enums;
                    },
                    groupLightInfos: function () {
                        return vm.groupLightInfos;
                    }
                }
            });
            addModal.result.then(function (item) {
                //alert(item.Result);
                vm.items.unshift(item);
            }, function () {});
        }

        function addDetail() {
            if (vm.tempDatailItems.length < 20 && vm.tempMain.result != 1) {
                var addModal = $uibModal.open({
                    templateUrl: 'app/features/lightManage/lightSch/lightSchDetail/lightSchDetail.add-modal.html',
                    backdrop: false,
                    //注入enums, groupLightInfos
                    controller: function ($uibModalInstance, lightSchDetailSvc) {
                        var vm = this;
                        vm.current = {};
                        vm.submitAdd = function () {
                            vm.current.lightSchMainId = mainId;
                            vm.addPromise = lightSchDetailSvc.crud.save(vm.current).$promise
                                .then(function (data) {
                                    tools.toastr.success("操作成功");
                                    $uibModalInstance.close(data);
                                }, function (res) {
                                    tools.toastr.error(tools.getError(res));
                                });
                        };
                    },
                    controllerAs: 'vm',
                });
                addModal.result.then(function (item) {
                    vm.tempDatailItems.push(item);
                }, function () {});
            } else {
                tools.toastr.error("不允许添加");
            }
        }

        vm.edit = function (item, e) {
            e.stopPropagation();
            var cloned = angular.copy(item);
            var editModal = $uibModal.open({
                templateUrl: 'app/features/lightManage/lightSch/lightSchMain/lightSchMain.edit-modal.html',
                backdrop: false,
                controller: function ($uibModalInstance, lightSchMainSvc, cloned) {
                    var vm = this;
                    //重新查询一遍当前选中记录
                    //console.log(cloned);
                    //vm.current = cloned;
                    var lightSchMainPromise = lightSchMainSvc.crud.get({
                        id: item.id
                    }).$promise;
                    var enumPromise = tools.getEnums('LightManage');
                    vm.loadPromise = $q.all([lightSchMainPromise, enumPromise]).then(function (result) {
                        vm.current = result[0];
                        vm.enums = result[1];
                        //console.log(result);
                        if (vm.current.startDate) {
                            vm.current.startDate = new Date(vm.current.startDate);
                        }
                        if (vm.current.endDate) {
                            vm.current.endDate = new Date(vm.current.endDate);
                        }
                        if (vm.current.makeTime) {
                            vm.selecTmakeTime = true;
                            vm.current.makeTime = new Date(vm.current.makeTime);
                        } else {
                            vm.current.makeTime = new Date();
                        }

                    }, function (res) {
                        tools.toastr.error(tools.getError(res));
                    });

                    vm.submitEdit = function () {
                        if (!vm.selecTmakeTime) {
                            vm.current.makeTime = null;
                        }
                        vm.updatePromise = lightSchMainSvc.crud.update(vm.current).$promise
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

        vm.remove = function (item, e) {
            e.stopPropagation();
            SweetAlert.confirm("确认执行删除?", vm.sweetOptions)
                .then(function (p) {
                    if (p) {
                        vm.deletePromise = lightSchMainSvc.crud.remove({
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
                    }
                });
        };

        vm.one = function () {
            mainId = 0;
            vm.butReadonly = false;
        };
        //Detail
        vm.selectDetail = function (main) {
            vm.tempMain = main;
            vm.tempDatailItems = vm.detailItems;
            if (main) {
                vm.tempDatailItems = vm.detailItems.filter(function (x) {
                    return x.lightSchMainId === main.id;
                });
            } else {
                vm.tempDatailItems = vm.detailItems.filter(function (x) {
                    return !x.lightSchMainId;
                });
            }

            vm.tabActive = 1;

            vm.showbgcolour = main;
            mainId = main.id;
            vm.butReadonly = true;
        };

        vm.removeDetail = function (item) {
            if (vm.tempMain.result != 1) {
                vm.deletePromise = lightSchDetailSvc.crud.remove({
                    id: item.id
                }).$promise.then(function (data) {
                    tools.toastr.success("删除成功");
                    var index = vm.tempDatailItems.indexOf(item);
                    if (index > -1) {
                        vm.tempDatailItems.splice(index, 1);
                    }
                }, function (res) {
                    tools.toastr.error(tools.getError(res));
                });
            } else {
                tools.toastr.error("不允许删除");
            }
        };

        vm.editDetail = function (item) {
            console.log(vm.tempMain);
            if (vm.tempMain.result != 1) {
                var cloned = angular.copy(item);
                var editModal = $uibModal.open({
                    templateUrl: 'app/features/lightManage/lightSch/lightSchDetail/lightSchDetail.edit-modal.html',
                    backdrop: false,

                    controller: function ($uibModalInstance, lightSchDetailSvc, cloned) {
                        var vm = this;
                        vm.current = cloned;

                        vm.submitEdit = function () {

                            vm.updatePromise = lightSchDetailSvc.crud.update(vm.current).$promise
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
                    //console.log(updatedItem);
                    var index = vm.tempDatailItems.indexOf(item);
                    //alert(index);
                    if (index > -1) {
                        vm.tempDatailItems[index] = updatedItem;
                    }
                }, function () {
                    cloned = undefined;
                });
            } else {
                tools.toastr.error("不允许编辑");
            }
        };

        //光控设置
        vm.lightConfigurations = function () {
            //alert(vm.tempMain.id);
            vm.updatePromise = lightSchMainSvc.LightConfiguration.save({
                id: vm.tempMain.id
            }).$promise;
            vm.updatePromise.then(function (result) {
                tools.toastr.success("操作成功");
                vm.refresh();
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };



    }

})();