define([
  'angular',
  'ib'
], function(angular, ib) {

  angular.module('ib').service('ricercheAnagraficaService', [
    '$q',
    '$http',
    function($q, $http) {

      if (ib.mock.rest) {

        ib.injector.get('$httpMock').when('GET',
                      /^:ricercheanagrafica\/rest\/ricercheanagrafiche\/listaNazioni\?nazione=.+?$/).respond(200, {
          result: [
            {
              'codice': 'IT',
              'descrizione': 'ITALIA'
            },
            {
              'codice': 'DE',
              'descrizione': 'GERMANIA'
            },
            {
              'codice': 'DD',
              'descrizione': 'GERMANIA EST'
            }
          ]});

        ib.injector.get('$httpMock').when('GET',
                  /^:ricercheanagrafica\/rest\/ricercheanagrafiche\/nazionePerCodice\?codnazione=.+?$/).respond(200, {
      result: [
            {
              'codice': 'IT',
              'descrizione': 'ITALIA'
            }
          ]});

        ib.injector.get('$httpMock').when('GET',
                      /^:ricercheanagrafica\/rest\/ricercheanagrafiche\/listaProvince\?provincia=.+?$/).respond(200, {
          result: [
            {
              'codice': 'CL',
              'descrizione': 'CALTANISSETTA'
            },
            {
              'codice': 'CT',
              'descrizione': 'CATANIA'
            },
            {
              'codice': 'EN',
              'descrizione': 'ENNA'
            }
          ]});

        ib.injector.get('$httpMock').when('GET',
                      /^:ricercheanagrafica\/rest\/ricercheanagrafiche\/listaCap.+?$/).respond(200, {
          result: [
            {
              'codice': '95100',
              'descrizione': 'Catania'
            }
          ]});

        ib.injector.get('$httpMock').when('GET',
                      /^:ricercheanagrafica\/rest\/ricercheanagrafiche\/listaComuni\?comune=.+?$/).respond(200, {
          result: [
            'CATANIA',
            'SAN GIOVANNI LA PUNTA',
            'SAN GREGORIO',
            'S. AGATA LI BATTIATI',
            'SAN GIOVANNI GALERMO',
            'ACIREALE'
          ]});
      }

      var service = {};

      service.listaNazioni = function(prefix) {
        var deferred = $q.defer();

        //TODO: implementare cache

        $http.get(':ricercheanagrafica/rest/ricercheanagrafiche/listaNazioni', {
          params: {
            nazione: prefix
          }
        }).then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      service.nazionePerCodice = function(codnazione) {
        var deferred = $q.defer();

        //TODO: implementare cache

        $http.get(':ricercheanagrafica/rest/ricercheanagrafiche/nazionePerCodice', {
          params: {
            codnazione: codnazione
          }
        }).then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      service.listaProvince = function(prefix) {

        var deferred = $q.defer();

        //TODO: implementare cache

        var paramProvincia;
        if (prefix) {
          paramProvincia = prefix;
        } else {
          paramProvincia = '*';
        }
        $http.get(':ricercheanagrafica/rest/ricercheanagrafiche/listaProvince', {
          params: {
            provincia: paramProvincia
          }
        }).then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      service.listaComuni = function(prov, com) {
        var deferred = $q.defer();
        var paramProvincia = null;
        if (prov) {
          paramProvincia = prov.codice;
        } else {
          paramProvincia = '*';
        }

        $http.get(':ricercheanagrafica/rest/ricercheanagrafiche/listaComuni', {
          params: {
            provincia: paramProvincia,
            comune: com
          }
        }).then(function(res) {
          //deferred.resolve(res.data.result);
          deferred.resolve(
            res.data.result.map(function(item) {
              return item.trim();
            })
          );
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      service.listaCap = function(prov, com) {
        var deferred = $q.defer();
        var paramProvincia = null;
        if (prov) {
          paramProvincia = prov.codice;
        } else {
          paramProvincia = '*';
        }

        $http.get(':ricercheanagrafica/rest/ricercheanagrafiche/listaCap', {
          params: {
            provincia: paramProvincia,
            comune: com
          }
        }).then(function(res) {
          //deferred.resolve(res.data.result);
          deferred.resolve(
            res.data.result
            /*
            res.data.result.map(function(item) {
              return item.trim();
            })
          */);
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      return service;

    }]);
});
