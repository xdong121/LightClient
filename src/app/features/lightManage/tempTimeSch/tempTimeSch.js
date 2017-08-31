(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.tempTimeSch')
        .controller('tempTimeSchController', tempTimeSchController);

    function tempTimeSchController($q, $uibModal, $timeout, SweetAlert, tempTimeSchMainSvc, tempTimeSchDetailSvc, groupInfoSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();
        vm.search = {};
        var mainId = 0;


        //    vm.load = function () {
        //         var tempTimeSchMainPromise = tempTimeSchMainSvc.crud.query().$promise;
        //         var enumPromise = tools.getEnums('LightManage');
        //         vm.loadPromise = $q.all([tempTimeSchMainPromise, enumPromise]).then(function (result) {
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
            startDate1: null,
            startDate2: null
        };
        vm.load = function (tableState) {
            var pagination = tableState.pagination;
            var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = pagination.number || 10; // Number of entries showed per page.
            vm.params = {
                pageIndex: start / pageSize,
                pageSize: pageSize,
                id: vm.search.id,
                startDate1: vm.startDate1,
                startDate2: vm.startDate2
            };
            var tempTimeSchMainPromise = tempTimeSchMainSvc.BySelect.save(vm.params).$promise;
            var enumPromise = tools.getEnums('LightManage');
            var tempTimeSchDetailPromise = tempTimeSchDetailSvc.crud.query().$promise;
            var groupInfoPromise = groupInfoSvc.crud.query().$promise;
            vm.loadPromise = $q.all([tempTimeSchMainPromise, enumPromise, tempTimeSchDetailPromise, groupInfoPromise]).then(function (result) {
                vm.items = result[0].data;
                pagination.numberOfPages = result[0].pageCount;
                vm.enums = result[1];
                vm.detailItems = result[2];
                vm.groupInfos = result[3];
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
                templateUrl: 'app/features/lightManage/tempTimeSch/tempTimeSchMain/tempTimeSchMain.add-modal.html',
                backdrop: false,
                //注入enums
                controller: function ($uibModalInstance, tempTimeSchMainSvc, enums) {
                    var vm = this;
                    vm.current = {};
                    vm.current.makeTime = new Date();
                    //接收传过来的变量
                    vm.enums = enums;
                    vm.submitAdd = function () {

                        if (!vm.selectButton) {
                            vm.current.makeTime = null;
                        }
                        vm.addPromise = tempTimeSchMainSvc.crud.save(vm.current).$promise
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
                    templateUrl: 'app/features/lightManage/tempTimeSch/tempTimeSchDetail/tempTimeSchDetail.add-modal.html',
                    backdrop: false,
                    //注入enums, groupInfos
                    controller: function ($uibModalInstance, tempTimeSchDetailSvc, enums, groupInfos) {
                        var vm = this;
                        vm.current = {};
                        vm.current.startTime = new Date();
                        vm.current.makeTime = new Date();
                        //接收传过来的变量
                        vm.enums = enums;
                        vm.groupInfos = groupInfos;

                        vm.submitAdd = function () {

                            if (!vm.selectStartTime) {
                                vm.current.startTime = null;
                            }
                            if (!vm.selecTmakeTime) {
                                vm.current.makeTime = null;
                            }
                            vm.current.tempTimeSchMainId = mainId;
                            vm.addPromise = tempTimeSchDetailSvc.crud.save(vm.current).$promise
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
                        groupInfos: function () {
                            return vm.groupInfos;
                        }
                    }
                });
                addModal.result.then(function (item) {
                    //alert(item.Result);
                    vm.tempDatailItems.push(item);
                }, function () {});
            } else {
                tools.toastr.error("不允许添加");
            }
        }

        vm.edit = function (item, e) {
            if (item.result != 1) {
                e.stopPropagation();
                var cloned = angular.copy(item);
                var editModal = $uibModal.open({
                    templateUrl: 'app/features/lightManage/tempTimeSch/tempTimeSchMain/tempTimeSchMain.edit-modal.html',
                    backdrop: false,
                    controller: function ($uibModalInstance, tempTimeSchMainSvc, cloned) {
                        var vm = this;
                        //重新查询一遍当前选中记录
                        console.log(cloned);
                        //vm.current = cloned;
                        var tempTimeSchMainPromise = tempTimeSchMainSvc.crud.get({
                            id: item.id
                        }).$promise;
                        var enumPromise = tools.getEnums('LightManage');
                        vm.loadPromise = $q.all([tempTimeSchMainPromise, enumPromise]).then(function (result) {
                            vm.current = result[0];
                            vm.enums = result[1];
                            console.log(result);
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
                            vm.updatePromise = tempTimeSchMainSvc.crud.update(vm.current).$promise
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
            } else {
                tools.toastr.error("不允许编辑");
            }
        };

        vm.remove = function (item, e) {
            if (item.result != 1) {
                e.stopPropagation();
                SweetAlert.confirm("确认执行删除?", vm.sweetOptions)
                    .then(function (p) {
                        if (p) {
                            vm.deletePromise = tempTimeSchMainSvc.crud.remove({
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
            } else {
                tools.toastr.error("不允许删除");
            }
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
                    return x.tempTimeSchMainId === main.id;
                });
            } else {
                vm.tempDatailItems = vm.detailItems.filter(function (x) {
                    return !x.tempTimeSchMainId;
                });
            }

            vm.tabActive = 1;

            vm.showbgcolour = main;
            mainId = main.id;
            vm.butReadonly = true;
        };

        vm.removeDetail = function (item) {
            if (vm.tempMain.result != 1) {
                vm.deletePromise = tempTimeSchDetailSvc.crud.remove({
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
            if (vm.tempMain.result != 1) {
                var cloned = angular.copy(item);
                var editModal = $uibModal.open({
                    templateUrl: 'app/features/lightManage/tempTimeSch/tempTimeSchDetail/tempTimeSchDetail.edit-modal.html',
                    backdrop: false,
                    //注入enums
                    controller: function ($uibModalInstance, tempTimeSchDetailSvc, cloned, enums, groupInfos) {
                        var vm = this;
                        vm.current = cloned;
                        vm.enums = enums;
                        vm.groupInfos = groupInfos;
                        if (vm.current.startTime) {
                            vm.selectStartTime = true;
                            vm.current.startTime = new Date(vm.current.startTime);
                        } else {
                            vm.current.startTime = new Date();
                        }
                        if (vm.current.makeTime) {
                            vm.selecTmakeTime = true;
                            vm.current.makeTime = new Date(vm.current.makeTime);
                        } else {
                            vm.current.makeTime = new Date();
                        }

                        vm.submitEdit = function () {
                            if (!vm.selectStartTime) {
                                vm.current.startTime = null;
                            }
                            if (!vm.selecTmakeTime) {
                                vm.current.makeTime = null;
                            }
                            vm.updatePromise = tempTimeSchDetailSvc.crud.update(vm.current).$promise
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
                        },
                        groupInfos: function () {
                            return vm.groupInfos;
                        }
                    }
                });
                editModal.result.then(function (updatedItem) {
                    var index = vm.tempDatailItems.indexOf(item);
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

        //临时时间方案-起止年月
        vm.tempTimeConfigurations = function () {
            //alert(vm.tempMain.id);
            vm.updatePromise = tempTimeSchMainSvc.TempTimeConfiguration.save({
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