define([
    'angular',
    'ib',
    'acquisizionire/models/acquisizionire.factory.js'
], function (angular, ib) {

  /**
   * Espone il service per contattare i servizi di conto.
   * @namespace contoService
   * @memberOf ng.services
   * @type {Object}
   */
    angular.module('ib').service('acquisizionireService', [
        '$q',
        '$http',
        'Acquisizionire',
        '$jsonSchema',
        function ($q, $http, Acquisizionire, $jsonSchema) {

            if (ib.mock.rest) {
                //Conti
                ib.injector.get('$httpMock').when('GET', /^:acquisizionire\/rest\/batchRedditiContabilita.*$/).respond(200, {
                    result: [
                    ]
                });

                ib.injector.get('$httpMock').when('POST', /^:acquisizionire\/rest\/batchRedditiContabilita.*$/).respond(200, {
                    result: [
                    ]
                });
       
            }
        

            var service = {};

              /**
               * Restituisce la lista dei conti.
               * @function lista
               * @memberOf ng.services.contoService
               * @param {String} tipoConto Il tipo di conto.
               * @param {String} tipoFiltro Il tipo di filtro.
               * @type {Promise}
               */
            service.listaAcquisizionire = function (tipoConto, tipoFiltro) {
                var deferred = $q.defer();

                
                $http.get(':acquisizionire/rest/batchRedditiContabilita', {
                    params: {
                        tipo: tipoConto,
                        tipoFiltro: tipoFiltro
                    }
                }).then(function (res) {

                }).catch(function(errore) {
                    deferred.reject(errore);
                });

                return deferred.promise;
            };

            
            service.uploadFileToUrl  = function (file) {
                var fd = new FormData();
                fd.append('file', file);
                var deferred = $q.defer();

                $http.post(':acquisizionire/rest/batchRedditiContabilita', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function (res) {
                    deferred.resolve(res.data.result);
                }).catch(function (errore) {
                    deferred.reject(errore);
                });

                return deferred.promise;
            };
            	return service;
        }]);

});
