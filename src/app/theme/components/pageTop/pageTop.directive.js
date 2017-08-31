/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      scope: {},
      controller: PageTopController,
      controllerAs: 'vm'
    };
  }

  function PageTopController(accountSvc, tools) {
    var vm = this;
    vm.signOut = function () {
      tools.clearProfile();
      accountSvc.logout.logoutUser(null).$promise.then(function (data) {
        tools.clearProfile();
      });
      window.location.href = "/";
    };
  }
})();