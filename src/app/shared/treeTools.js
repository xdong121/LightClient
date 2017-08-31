(function () {
    "use strict";

    angular.module("common.services").factory("treeTools", treeTools);

    function treeTools($window, toastr) {

        return {
            //functions
            toNgJsTreeType: toNgJsTreeType,
            toNgJsTree: toNgJsTree
        };

        function toRoot(items) {
            var root = items.find(function (x) {
                return !x.parentId;
            });
            if (!root) {
                findChildren(root);
            }

            function findChildren(item) {
                var children = items.filter(function (x) {
                    return x.parentId === item.id;
                });
                children.forEach(findChildren);
                item.children = children;
            }
            return root || {};
        }

        function toRoots(items) {
            var roots = [];
            if (Array.isArray(items) && items.length > 0) {
                var roots = items.filter(function (x) {
                    return !x.parentId;
                });
                roots.forEach(findChildren);

                function findChildren(item) {
                    var children = items.filter(function (x) {
                        return parentId === item.id;
                    });
                    children.forEach(findChildren);
                    item.children = children;
                }
            }
            return roots;
        }

        function toNgJsTreeType(roots) {
            if (Array.isArray(roots)) {
                roots.forEach(translate);
            } else {
                translate(roots);
            }
            return roots;

            function translate(item) {
                if (item.id) { //id
                    if (typeof (item.id) === 'number') {
                        item.id = item.id.toString();
                    }
                }
                item.text = item.text || item.name; //text
                if (item.parentId) { //parent
                    if (typeof (item.parentId) === 'number') {
                        item.parent = item.parentId.toString();
                    }
                } else {
                    item.parent = '#';
                }
                if (item.children) {
                    item.children.forEach(translate);
                }
                item.state = {
                    opened: true
                };
            }
        }

        function toNgJsTree(items) {
            var roots = toRoots(items);
            roots = toNgJsTreeType(roots);
            return roots;
        }
    }

})();