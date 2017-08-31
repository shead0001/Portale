// implementazione URL dinamici in $http.()
define([
  'angular',
  'util',
  'ib'
], function(angular, util, ib) {

  // definizione dell'interceptor $http per gli URI dinamici secondo prefisso :xxx
  angular.module('ib').factory('dynamicRESTInterceptor', ['env', function(env) {
    return {
      request: function(config) {
        config.url = util.resolveUri(config.url, env.restmap);
        return config;
      }
    };
  }]);

  // attivazione globale dell'interceptor per gli URI dinamici
  angular.module('ib').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('dynamicRESTInterceptor');
  }]);

  if (ib.mock.rest) {
    // definizione dell'interceptor $http per il passthrough catchll
    angular.module('ib').factory('passthroughRESTInterceptor', ['$q', function($q) {
      //var $httpBackendPattern = /^Error: Unexpected request: .*\nNo more request expected\n\s*at \$httpBackend \(/;
      return {
        responseError: function(rejection) {
          //TODO: passthrough
          //if ($httpBackendPattern.test(rejection.stack)) {
          //}
          return $q.reject(rejection);
        }
      };
    }]);

    // attivazione globale dell'interceptor per il passthrough catchll
    angular.module('ib').config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('passthroughRESTInterceptor');
    }]);
  }

});
