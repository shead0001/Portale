define([
  'angular',
  'ib'
], function(angular, ib) {

  angular.module('ib').service('annullaDispositivaService', [
    '$q',
    '$http',
    function($q, $http) {

      if (ib.mock.rest) {

        ib.injector.get('$httpMock').
        when('POST', ':annullaDispositiva/rest/annulladispositiva/annullaDispositiva').respond(200,
                                                                                               {
          result:
          {
            esito: 'OK'
          }
        });

      }

      var service = {};

      service.annullaDispositiva = function(key) {
        console.log('in service annullaDispositivaService');
        var deferred = $q.defer();

        $http.post(':annullaDispositiva/rest/annulladispositiva/annullaDispositiva', {
          key: key
        }).then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });
        return deferred.promise;
      };

      return service;

    }]);
});
