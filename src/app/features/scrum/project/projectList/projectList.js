(function () {
    'use strict';

    angular.module('Legacy.features.scrum.project')
        .controller('ProjectListController', ProjectListController);

    function ProjectListController($q, $uibModal, projectSvc, tools) {
        var vm = this;
        vm.deleteSweetOptions = tools.getSweetOptions();
        vm.items1 = projectSvc.crud.query();
        vm.load = function (tableState) {
            var pagination = tableState.pagination;
            var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = pagination.number || 5; // Number of entries showed per page.
            var params = {
                pageIndex: start / pageSize,
                pageSize: pageSize
            };
            var projectPromise = projectSvc.byPage.get(params).$promise;
            vm.loadPromise = $q.all([projectPromise]).then(function (result) {
                vm.items = result[0].data;
                pagination.numberOfPages = result[0].pageCount;
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };
        vm.remove = function (item) {
            vm.deletePromise = projectSvc.crud.remove({
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