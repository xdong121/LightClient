(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightAlarm')
        .controller('lightAlarmSelectController', lightAlarmSelectController);

    function lightAlarmSelectController($q, $uibModal, $timeout, $rootScope, $interval, lightAlarmSvc, groupLightInfoSvc, tools) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();

        function load() {
            vm.isRepair = 0;
            var lightAlarmPromise = lightAlarmSvc.crud.query().$promise;
            var enumPromise = tools.getEnums('LightManage');
            var groupLightInfoPromise = groupLightInfoSvc.crud.query().$promise;
            vm.loadPromise = $q.all([lightAlarmPromise, enumPromise, groupLightInfoPromise]).then(function (result) {

                vm.lightAlarms = result[0];
                vm.enums = result[1];
                var groupLightInfos = result[2];

                //筛选两个表的数据
                vm.lightAlarms.forEach(function (a) {
                    var c = groupLightInfos.find(function (gi) {
                        return !gi.parentId && gi.no === a.controlNo;
                    });
                    if (c) {
                        a.control = c;
                        var l = groupLightInfos.find(function (gi) {
                            return gi.parentId === c.id && gi.no === a.lightNo;
                        });
                        if (l) {
                            a.light = l;
                            var s = groupLightInfos.find(function (gi) {
                                return gi.parentId === l.id && gi.no === a.lightSonNo;
                            });
                            if (s) {
                                a.lightSon = s;


                            }
                        }
                    }
                });
                vm.items = vm.lightAlarms.filter(function (x) {
                    return x.isRepair === vm.isRepair;
                });


            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        }
        load();

        //定时
        vm.runStart = function () {
            
            vm.timer = $interval(function () {
                var i = 0;
                vm.loadPromise = lightAlarmSvc.crud.query().$promise;
                vm.loadPromise.then(function (data) {
                    //alert(data[0].state);
                    //vm.datas = data;
                    data.forEach(function (d) {
                        if(d.state!=0 && i===0){
                            ++i;
                            //alert(d.stateDisplay);
                            tools.toastr.error("报警信息:"+d.stateDisplay);
                        }
                    });
                }, function (res) {
                    tools.toastr.error(tools.getError(res));
                });
            }, 9000)
        };
        //停止
        vm.runStop = function () {
            alert("关闭定时。");
            $interval.cancel(vm.timer);
        }
        //下拉框--是否修复
        vm.selectChecked = function () {
            vm.items = vm.lightAlarms.filter(function (x) {
                return x.isRepair === vm.isRepair;
            });
        };
        //更新
        vm.byUpdate = function (item) {
            var params = {
                controlNo: item.controlNo,
                lightNo: item.lightNo,
                lightSonNo: item.lightSonNo
            };
            vm.loadPromise = lightAlarmSvc.ByUpdate.save(params).$promise;
            vm.loadPromise.then(
                function (result) {
                    console.log(result[0]);
                    load();
                },
                function (res) {
                    tools.toastr.error(tools.getError(res));
                }
            );
        };
        //修复
        vm.edit = function (item) {
            item.isRepair = 1;
            vm.updatePromise = lightAlarmSvc.crud.update(item).$promise
                .then(
                    function (data) {
                        tools.toastr.success("操作成功");
                        $uibModalInstance.close(data);
                    },
                    function (res) {
                        tools.toastr.error(tools.getError(res));
                    }
                );
            editModal.result.then(
                function (updatedItem) {
                    var index = vm.items.indexOf(item);
                    if (index > -1) {
                        //vm.items[index] = updatedItem;
                        //vm.items[index].reMark = updatedItem.reMark;
                        //vm.items[index].stateDisplay = updatedItem.stateDisplay;
                        vm.items[index].isRepairDisplay = updatedItem.isRepairDisplay;
                    }
                },
                function () {
                    cloned = undefined;
                }
            );
        };

    }

})();