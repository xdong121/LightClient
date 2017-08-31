(function () {
    "use strict";

    //Tools
    angular.module("common.services").factory("tools", tools);

    function tools($window, appSettings, $http, $q, toastr, prompt, hotkeys) {
        //sweet options
        function getSweetOptions(options) {
            var sweetOptions = {
                title: "确认执行该操作?",
                text: "执行后将无法恢复!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是的, 执行操作!",
                cancelButtonText: "不, 取消操作!",
                closeOnConfirm: true,
                closeOnCancel: true
            };
            return Object.assign({}, sweetOptions, options || {});
        }

        function promptInput(options) {
            var defaultOptions = {
                title: '请您输入',
                input: true,
                // message: '',
                // label: '',
                // value: '',
                // values: '',
                buttons: [{
                    label: '取消',
                    cancel: true
                }, {
                    label: '确定',
                    primary: true
                }]
            };
            options = Object.assign({}, defaultOptions, options);
            return prompt(options);
        }

        return {
            //constants
            serverBase: appSettings.SERVER_BASE,
            //libraries
            jq: $window.jQuery,
            toastr: toastr,
            getSweetOptions: getSweetOptions,
            prompt: promptInput,
            hotkeys: hotkeys,
            //functions
            getProfile: getProfile,
            hasDuty: hasDuty,
            clearProfile: clearProfile,
            getError: getError,
            getEnums: getEnums
        };

        function getProfile() {
            var temp = $window.localStorage.getItem(appSettings.PROFILE_KEY);
            var profile = JSON.parse(temp);
            if (profile.roles) {
                profile.roles = profile.roles.split(',').filter(function (x) {
                    return x;
                });
            }
            return profile;
        }

        function hasDuty() {
            return true;
        }

        function clearProfile() {
            window.localStorage.removeItem(appSettings.PROFILE_KEY);
        }

        function getError(response) {
            console.error(response);
            var msg = "发生错误";
            return msg;
        }

        function getEnums(moduleName) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Shared/Enums/' + (moduleName || "")
            }).then(function success(result) {
                deferred.resolve(result.data);
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }

})();