(function () {
	'use strict';

	// 登录拦截器
	angular.module('common.services').factory('authInterceptor', authInterceptor);
	authInterceptor.$inject = ['$q', '$window', 'appSettings'];

	function authInterceptor($q, $window, appSettings) {
		var authInterceptorServiceFactory = {};
	    var _request = function(config) {
	        config.headers = config.headers || {};
	        var token;
	        var temp = $window.localStorage.getItem(appSettings.PROFILE_KEY);
	        if (temp) {
	            var profile = JSON.parse(temp);
	            if (profile.access_token) {
	                token = profile.access_token;
	            }
	        }
	        if (token) {
	            config.headers.Authorization = 'Bearer ' + token;
	        }
	        return config;
	    };

		var _responseError = function (rejection) {
			if (rejection.status === 401) {
				//alert("您的登录已经失效，请重新登录");
				$window.localStorage.removeItem(appSettings.PROFILE_KEY);
			}
			return $q.reject(rejection);
		}

		authInterceptorServiceFactory.request = _request;
		authInterceptorServiceFactory.responseError = _responseError;
		return authInterceptorServiceFactory;
	};

}) ();