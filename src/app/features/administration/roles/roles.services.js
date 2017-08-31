(function () {
    "use strict";
    
    var moduleId = "Legacy.features.administration.roles.services";

    angular.module(moduleId, ["ngResource"]);

    //Role
    angular.module(moduleId).factory('roleSvc', roleSvc);
    function roleSvc($resource) {
        return {
            crud: $resource("/api/role/:id", {id: '@id'}, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            users: $resource("/api/role/users/:id"),
            addUser: $resource("/api/role/addUser"),
            removeUser: $resource("/api/role/removeUser/:userName/:roleId", null, {
                'remove': {
                    method: 'DELETE'
                }
            }),
            byUserName: $resource("/api/role/byUserName/:userName")
        };
    }
    
} ());