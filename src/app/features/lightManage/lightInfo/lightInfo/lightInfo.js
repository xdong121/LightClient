(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightInfo')
        .controller('lightInfoController', lightInfoController);

    function lightInfoController($q, $uibModal, $timeout, tools, groupInfoSvc, LightInfoSvc) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();
        vm.search = {};

        vm.load = function () {
            var groupPromise = groupInfoSvc.crud.query().$promise;
            var lightPromie = LightInfoSvc.crud.query().$promise;
            vm.loadPromise = $q.all([groupPromise, lightPromie]).then(function (result) {
                //console.log(result);
                vm.items = result[0];
                vm.lights = result[1];

                vm.lights.forEach(function (x) {
                    if (x.level === 2) {
                        var ancestorIds = x.ancestorIds.split('-').map(function (x) {
                            return +x;
                        });
                        x.ancestors = ancestorIds.map(function (y) {
                            var parent = vm.lights.find(function (z) {
                                return z.id === y;
                            });
                            return parent;
                        });
                        x.allNo = x.ancestors.map(function (x) {
                            return x.no;
                        }).join('-') + '-' + x.no;
                        //console.log(x.ancestors);
                    }
                });
                
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        }
        vm.load();

        vm.filterByGroup = function (group) {
            if (group) {
                vm.currentLights = vm.lights.filter(function (x) {
                    return x.groupInfoId === group.id && x.level === 2;
                });
            } else {
                vm.currentLights = vm.lights.filter(function (x) {
                    return !x.groupInfoId && x.level === 2;
                });
            }
            vm.currentGroupLeft = group;
        };

        vm.toggle = function () {
            vm.currentLights.forEach(function (x) {
                x.isSelected = vm.isSelectAll;
            });
        };

        vm.addToGroup = function (group) {
            vm.currentLights.forEach(function (x) {
                if (x.isSelected) {
                    x.isSelected=false;
                    if (group) {
                        x.groupInfoId = group.id;
                    } else {
                        x.groupInfoId = null;
                    }
                    LightInfoSvc.crud.update(x).$promise;                                  
                }
            });
            vm.filterByGroup(group);
            vm.isSelectAll=false;
        };

        // vm.addToGroup = function (group) {
        //     var arrayObj = new Array();
        //     if (group) {
        //         vm.currentLights.forEach(function (x) {
        //             if (x.isSelected) {
        //                 arrayObj.push(x.id);
        //             }
        //         });
        //         var obj = {
        //             arrayObj
        //         };
        //         if (obj) {
        //             console.log('1111111111111111' + obj);
        //             var params = {
        //                 groupID: group.id,
        //                 obj: obj
        //             };
        //             vm.loadPromise = LightInfoSvc.toGroup.get(params).$promise;

        //             vm.loadPromise.then(function (result) {
        //                 alert("ok");
        //                 //vm.load();
        //                 vm.filterByGroup(group);
        //             }, function (res) {
        //                 alert("no");
        //                 var msg = tools.getError(tools.toastr.error(msg));
        //             });
        //         } else {
        //             alert("请选择灯信息。");
        //         }
        //     }
        // };

    }

})();