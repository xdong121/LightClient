(function () {
    "use strict";

    angular.module("common.services").factory("accountSvc", accountSvc);
    accountSvc.$inject = ["$resource", "appSettings"];
    function accountSvc($resource, appSettings) {
        return {
            login: $resource(appSettings.SERVER_BASE + "/Token", null,
                {
                    'loginUser': {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            for (var d in data)
                                str.push(encodeURIComponent(d) + "=" +
                                    encodeURIComponent(data[d]));
                            return str.join("&");
                        }

                    }
                }),
            logout: $resource(appSettings.SERVER_BASE + "/api/account/logout", null, {
                'logoutUser': {
                    method: 'POST'
                }
            }),
            password: $resource(appSettings.SERVER_BASE + "/api/account/changepassword", null, {
                'changePassword': {
                    method: 'POST'
                }
            })
        }
    }
})();
