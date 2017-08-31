(function () {
    'use strict';

    angular.module('Legacy.features.lightManage.lightInfo')
        .controller('lightInfoSelectController', lightInfoSelectController);

    function lightInfoSelectController($q, $uibModal, $timeout, tools, groupInfoSvc, LightInfoSvc) {
        var vm = this;
        vm.sweetOptions = tools.getSweetOptions();
        //vm.search = {};

        // vm.load = function () {
        //     //var groupPromise = groupInfoSvc.crud.query().$promise;
        //     var lightPromie = LightInfoSvc.crud.query().$promise;
        //     vm.loadPromise = $q.all([lightPromie]).then(function (result) {
        //         //vm.items = result[0];
        //         vm.lights = result[0];
        //         vm.lights.forEach(function (x) {
        //             if (x.level === 2) {
        //                 var ancestorIds = x.ancestorIds.split('-').map(function (x) {
        //                     return +x;
        //                 });
        //                 x.ancestors = ancestorIds.map(function (y) {
        //                     var parent = vm.lights.find(function (z) {
        //                         return z.id === y;
        //                     });
        //                     return parent;
        //                 });
        //                 x.allNo = x.ancestors.map(function (x) {
        //                     return x.no;
        //                 }).join('-') + '-' + x.no;

        //             }
        //         });
        //         vm.currentLights = vm.lights.filter(function (x) {
        //             return x.level === 2;
        //         });

        //     }, function (res) {
        //         tools.toastr.error(tools.getError(res));
        //     });
        // }

        vm.select = function () {
            if (!vm.search.controlNo || vm.search.controlNo < 1) {
                alert("请输入正确控制器编号");
            } else {
                if(!vm.search.lightNo){
                    vm.search.lightNo=0;
                    vm.search.lightSonNo=0;
                }
                else if(!vm.search.lightSonNo){
                    vm.search.lightSonNo=0;
                }
                var params = {
                    controlNo: vm.search.controlNo,
                    lightNo: vm.search.lightNo,
                    lightSonNo: vm.search.lightSonNo
                };
                vm.loadPromise = LightInfoSvc.BySelect.query(params).$promise;
                vm.loadPromise.then(
                    function (result) {
                        vm.lights = result;
                    },
                    function (res) {
                        var msg = tools.toastr.error(tools.getError(res));
                    }
                );
            }


        }

    }

})();