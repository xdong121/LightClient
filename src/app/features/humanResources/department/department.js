(function () {
    'use strict';

    angular.module('Legacy.features.humanResources.department')
        .controller('DepartmentController', DepartmentController);

    function DepartmentController($uibModal, $timeout, departmentSvc, tools, treeTools) {
        var vm = this;
        vm.deleteSweetOptions = tools.getSweetOptions();

        function load() {
            vm.loadPromise = departmentSvc.crud.query().$promise;
            vm.loadPromise.then(function (data) {
                vm.items = data.sort(function (x, y) {
                    return x.order - y.order;
                });
                vm.treeData = treeTools.toNgJsTreeType(vm.items);
                vm.treeData.forEach(function (x) {
                    if (x.parent === '#') {
                        x.type = 'folder';
                        x.state = x.state || {};
                        x.state.opened = true;
                    }
                });
                vm.basicConfig.version++;
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        }
        load();

        vm.ignoreChanges = false;
        var newId = 0;

        vm.basicConfig = {
            core: {
                multiple: false,
                check_callback: true,
                worker: true
            },
            'types': {
                'folder': {
                    'icon': 'ion-ios-folder'
                },
                'default': {
                    'icon': 'ion-document-text'
                }
            },
            'plugins': ['types'],
            'version': 1
        };

        vm.addNewNode = function () {
            vm.ignoreChanges = true;
            var selectedId = vm.basicTree.jstree(true).get_selected()[0];
            if (selectedId) {
                tools.prompt({
                    title: '添加组织机构',
                    message: '请填写组织机构名称',
                    label: '组织机构名称'
                }).then(function (name) {
                    vm.addPromise = departmentSvc.crud.save({
                        parentId: +selectedId,
                        name: name
                    }).$promise;
                    vm.addPromise.then(function (result) {
                        var newNode = treeTools.toNgJsTreeType(result);
                        newNode.state = {
                            opened: true
                        };
                        vm.treeData.push(newNode);
                        vm.currentNodeId = newNode.id;
                        vm.basicConfig.version++;
                    }, function (res) {
                        tools.toastr.error(tools.getError(res));
                    });
                });
            } else {
                tools.toastr.error("您没有选择节点");
            }
        };

        vm.addNewRoot = function () {
            vm.ignoreChanges = true;
            tools.prompt({
                title: '添加根级组织机构',
                message: '请填写组织机构名称',
                label: '组织机构名称'
            }).then(function (name) {
                vm.addRootPromise = departmentSvc.crud.save({
                    isAbstract: true,
                    name: name
                }).$promise;
                vm.addRootPromise.then(function (result) {
                    var newNode = treeTools.toNgJsTreeType(result);
                    newNode.type = 'folder';
                    newNode.state = {
                        opened: true
                    };
                    vm.treeData.push(newNode);
                    vm.currentNodeId = newNode.id;
                    vm.basicConfig.version++;
                }, function (res) {
                    tools.toastr.error(tools.getError(res));
                });
            });
        };

        vm.updateSubmit = function () {
            vm.ignoreChanges = true;
            var item = angular.copy(vm.currentItem);
            item.id = +item.id;
            delete item.state;
            delete item.parent;
            delete item.children;
            vm.updatePromise = departmentSvc.crud.update(item).$promise;
            vm.updatePromise.then(function (result) {
                tools.toastr.success("操作成功");
                vm.refresh();
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };

        vm.remove = function () {
            vm.ignoreChanges = true;
            var id = +vm.currentItem.id;
            vm.removePromise = departmentSvc.crud.remove({
                id: +vm.currentItem.id
            }).$promise;
            vm.removePromise.then(function (result) {
                tools.toastr.success("删除成功");
                var index = vm.items.indexOf(vm.currentItem);
                if (index > -1) {
                    vm.items.splice(index, 1);
                    vm.basicConfig.version++;
                    vm.currentItem = undefined;
                    vm.currentNodeId = undefined;
                }
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        };

        vm.refresh = function () {
            vm.ignoreChanges = true;
            newId = 0;
            load();
            vm.basicConfig.version++;
        };

        vm.expand = function () {
            vm.ignoreChanges = true;
            vm.treeData.forEach(function (n) {
                n.state.opened = true;
            });
            vm.basicConfig.version++;
        };

        vm.collapse = function () {
            vm.ignoreChanges = true;
            vm.treeData.forEach(function (n) {
                n.state.opened = false;
            });
            vm.basicConfig.version++;
        };

        vm.readyCB = function () {
            $timeout(function () {
                vm.ignoreChanges = false;
                if (vm.currentNodeId) {
                    var currentNode = vm.treeData.find(function (x) {
                        return x.id == vm.currentNodeId;
                    });
                    if (currentNode) {
                        vm.basicTree.jstree(true).select_node(currentNode);
                    }
                }
            });
        };

        vm.selectNodeCB = function (event, tree) {
            vm.currentNodeId = tree.node.id;
            vm.currentItem = vm.items.find(function (x) {
                return x.id == tree.node.id;
            });
        };

        vm.applyModelChanges = function () {
            return !vm.ignoreChanges;
        };

    }

})();