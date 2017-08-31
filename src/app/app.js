'use strict';

agGrid.initialiseAgGridWithAngular1(angular); //dave

angular.module('LegacyWebApi', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  
  //dave -start
  'common.services',
  'cgBusy',
  'ng-sweet-alert',
  'cgPrompt',
  'angular-loading-bar',
  'cfp.hotkeys',
  'angular.filter',
  'ui.grid',
  'agGrid',
  //dave -end

  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'Legacy.features' //dave
]);

// interceptors
angular.module('LegacyWebApi').config(configApp);

function configApp($httpProvider, toastrConfig) {
  //interceptors
  $httpProvider.interceptors.push('authInterceptor');
  //toastr
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,
    newestOnTop: false,
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body',
    allowHtml: true,
    "closeButton": true,
    "debug": false,
    "progressBar": true,
    "showDuration": "1000",
    "hideDuration": "3000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  });
}

angular.module('LegacyWebApi').value('cgBusyDefaults', {
  message: '处理中，请稍候......',
  backdrop: true,
  //templateUrl: '/app/shared/angular-busy/angular-busy-template.html',
  delay: 300,
  minDuration: 700,
  // wrapperClass: 'my-class my-class2'
});