define([
  'angular',
  'ib'
], function(angular, ib) {

  // definizione dell'interceptor $http per la definizione timeout globale
  angular.module('ib').factory('timeoutInterceptor', [function() {
    return {
      request: function(config) {

        config.timeout = config.timeout || ib.settings.http.timeout;

        return config;
      }
    };
  }]);

  // attivazione globale degli interceptors
  angular.module('ib').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('timeoutInterceptor');
  }]);

});
