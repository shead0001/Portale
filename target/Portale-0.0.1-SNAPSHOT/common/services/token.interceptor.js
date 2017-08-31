define([
  'angular',
  'ib'
], function(angular) {

  // definizione dell'interceptor $http per la gestione dell'header "Token"
  angular.module('ib').factory('tokenInterceptor', ['session', function(session) {
    return {
      request: function(config) {

        // se esiste il token lo aggiungo all'header
        if (session.token) {
          config.headers['Token'] = session.token;
        }

        return config;
      },
      response: function(response) {

        // se il server mi ha restituito un header "Token" sostituisco il token per le successive chiamate
        /*var updated_token = response.headers('Token');
        if (updated_token) {
          if (window.localStorage) {
            localStorage.setItem('token', updated_token);
          }
          session.token = updated_token;
        }*/

        return response;
      }
    };
  }]);

  // attivazione globale degli interceptors
  angular.module('ib').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
  }]);

});
