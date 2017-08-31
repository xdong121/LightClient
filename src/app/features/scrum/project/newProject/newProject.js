(function () {
    'use strict';

    angular.module('Legacy.features.scrum.project')
        .controller('NewProjectController', NewProjectController);

    function NewProjectController($uibModal, projectSvc, tools) {
        var vm = this;
        
        vm.submit = function () {
            vm.submitPromise = projectSvc.crud.save(vm.currentItem).$promise
            vm.submitPromise.then(function (data) {
                tools.toastr.success("保存成功");
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };
    }

})();
