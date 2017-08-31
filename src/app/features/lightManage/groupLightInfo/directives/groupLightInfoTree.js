(function () {
    'use strict';
    
    angular.module('Legacy.features.lightManage.groupLightInfo.services').directive('groupLightInfoTree', groupLightInfoTree);

    function groupLightInfoTree() {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                onSelect: "&"
            },
            template: '<div cg-busy="[vm.loadPromise]"></div>',
            controller: GroupLightInfoTreeController,
            controllerAs: 'vm',
            compile: compile
        };
        return directive;
        function compile(element, attrs) {
            var newNode = document.createElement("div");
            newNode.innerHTML = '<div js-tree="vm.basicConfig" ng-model="vm.treeData" should-apply="vm.applyModelChanges()" tree-events="ready:vm.readyCB;select_node:vm.selectNodeCB"></div>';
            element[0].appendChild(newNode);
        }
    }

    function GroupLightInfoTreeController($scope, $timeout, groupLightInfoSvc, tools, treeTools) {
        var vm = this;    

        var items = [];

        function load() {
            vm.loadPromise = groupLightInfoSvc.crud.query().$promise;
            vm.loadPromise.then(function (data) {
                items = data.sort(function (x, y) {
                    return x.order - y.order;
                });
                vm.treeData = treeTools.toNgJsTreeType(items);
                vm.treeData.forEach(function(x) {
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
        
        vm.readyCB = function () {
            $timeout(function () {
                vm.ignoreChanges = false;
            });
        };

        vm.selectNodeCB = function (event, tree) {
            var nodeId = tree.node.id;
            vm.currentItem = items.find(function (x) {
                return x.id == tree.node.id;
            });
            $scope.onSelect({selectedItem: vm.currentItem});
        };

        vm.applyModelChanges = function () {
            return !vm.ignoreChanges;
        };

    }
} ());