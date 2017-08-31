(function () {
    'use strict';

    angular.module('Legacy.features.administration.roleUsers')
        .controller('RoleUsersController', RoleUsersController);

    function RoleUsersController($q, roleSvc, userSvc, tools) {
        var vm = this;

        function load() {
            vm.loadPromise = roleSvc.crud.query().$promise;
            vm.loadPromise.then(function (data) {
                vm.roles = data;
            }, function (res) {
                tools.toastr.error(tools.getError(res));
            });
        }
        load();

        var loadUsers = function (roleId) {
            vm.usersInRole = [];
            vm.usersNotInRole = [];
            vm.loadUserPromise = roleSvc.users.get({
                    id: roleId
                }).$promise
                .then(function (data) {
                    vm.usersInRole = data.inRole;
                    vm.usersNotInRole = data.notInRole;
                }, function (res) {
                    tools.toastr.error(tools.getError(res));
                });
        };

        vm.changeRole = function (role) {
            if (vm.currentRole !== role) {
                vm.currentRole = role;
                loadUsers(vm.currentRole.id);
            }
        };

        vm.addToRole = function (user) {
            var userName = user.userName;
            if (vm.currentRole && userName) {
                vm.addToRolePromise = roleSvc.addUser.save({
                    userName: userName,
                    roleId: vm.currentRole.id
                }).$promise.then(function (result) {
                    tools.toastr.success("加入角色成功");
                    var index = vm.usersNotInRole.indexOf(user);
                    if (index > -1) {
                        vm.usersNotInRole.splice(index, 1);
                    }
                    vm.usersInRole.push(user);
                }, function (res) {
                    tools.toastr.error(tools.getError(res));
                });
            }
        };

        vm.removeFromRole = function (user) {
            var userName = user.userName;
            if (vm.currentRole && userName) {
                vm.removeFromRolePromise = roleSvc.removeUser.delete({
                    userName: userName,
                    roleId: vm.currentRole.id
                }).$promise.then(function (result) {
                        tools.toastr.success("移除成功");
                        var index = vm.usersInRole.indexOf(user);
                        if (index > -1) {
                            vm.usersInRole.splice(index, 1);
                        }
                        vm.usersNotInRole.push(user);
                    },
                    function (res) {
                        tools.toastr.error(tools.getError(res));
                    });
            }
        };
    }

})();