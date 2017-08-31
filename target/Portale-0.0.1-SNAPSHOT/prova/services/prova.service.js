define([
    'angular',
    'ib',
    'prova/models/prova.factory.js'
], function (angular, ib) {

  /**
   * Espone il service per contattare i servizi di conto.
   * @namespace contoService
   * @memberOf ng.services
   * @type {Object}
   */
    angular.module('ib').service('provaService', [
        '$q',
        '$http',
        'Prova',
        '$jsonSchema',
        function ($q, $http, Prova, $jsonSchema) {

            if (ib.mock.rest) {
                //Conti
                ib.injector.get('$httpMock').when('GET', /^:prova\/rest\/batchRedditiContabilita.*$/).respond(200, {
                    result: [
                    ]
                });

                ib.injector.get('$httpMock').when('POST', /^:prova\/rest\/batchRedditiContabilita.*$/).respond(200, {
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
            service.listaProva = function (tipoConto, tipoFiltro) {
                var deferred = $q.defer();

                
                $http.get(':prova/rest/batchRedditiContabilita', {
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

                $http.post(':prova/rest/batchRedditiContabilita', fd, {
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
