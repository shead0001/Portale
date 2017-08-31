define([
  'angular',
  'ib',
  'profilo/models/profilo.factory.js'
], function(angular, ib) {
  /**
     * Espone il service per la gestione del profilo.
     * @namespace profiloService
     * @memberOf ng.services
     * @type {Object}
     */
  angular.module('ib').service('profiloService', [
    '$q',
    '$http',
    'Anagrafica',
    'Residenza',
    'Recapiti',
    'Servizio',
    'Limite',
    'Tasto',
    'Password',
    'Conto',
    'Avviso',
    '$jsonSchema',
    function($q, $http, Anagrafica, Residenza, Recapiti,
              Servizio, Limite, Tasto, Password, Conto, Avviso, $jsonSchema) {

      if (ib.mock.rest) {

        ib.injector.get('$httpMock').when('GET', ':anagrafica/rest/anagraficacompass/recuperaAnagrafica').respond(
          200,
          {
            result:
            {
              tipoAnagrafica: 'F',
              cognome: 'CASAROTTO',
              nome: 'FRANCESCA',
              dataNascita: 242776800000,
              luogoNascita: 'VICENZA',
              provNascita: 'VI',
              nazioneNascita: '086',
              cittadinanza: 'ITA',
              sesso: 'F',
              codiceFiscale: 'CSRFNC77P51L840V',
              ragSociale: 'CASAROTTO FRANCESCA',
              partitaIVA: '',
              residenza:
              {
                indirizzo: 'VIA CALDERA 21',
                cap: 20153,
                comune: 'MILANO',
                provincia: 'MI',
                nazione: '086'
              },
              recapito:
              {
                telefono: '02 7213261',
                cellulare: '333 7352054',
                email: 'francesca@compass.it'
              },
              documento:
              {
                tipoDoc: 'CAR',
                numeroDoc: 'AK4801514',
                numeroDoc2: '',
                luogoRilasio: 'MILANO',
                provinciaRilascio: 'MI',
                ufficioRilascio: 'COM',
                dataRilascio: 1441922400000,
                dataScadenza: 1757541600000
              }
            }
          });

        ib.injector.get('$httpMock').when('POST', /^:profilo\/rest\/profilo\/modificaPassword\?.+$/)
           .respond(function(method, url, data/*, headers, params*/) {
          data = JSON.parse(data);
          return [200, {
            result:
            {
              esito: true
            }
          }];
        });

        ib.injector.get('$httpMock').when('POST', ':anagrafica/rest/anagraficacompass/modificaRecapiti')
          .respond(function(method, url, data/*, headers, params*/) {
          data = JSON.parse(data);
          return [200, {
            telefono: data.telefono,
            cellulare: data.cellulare,
            email: data.email,
            codiceDispositivo: data.codiceDispositivo
          }];
        });

        ib.injector.get('$httpMock').when('POST', ':anagrafica/rest/anagraficacompass/modificaResidenza')
          .respond(function(method, url, data/*, headers, params*/) {
          data = JSON.parse(data);
          return [200, {
            indirizzo: data.indirizzo,
            cap: data.cap,
            comune: data.comune,
            provincia: data.provincia,
            nazione: data.nazione,
            codiceDispositivo: data.codiceDispositivo
          }];
        });

        ib.injector.get('$httpMock').when('POST', ':rest/rest/prv/servizi/serviziAttivi')
          .respond(
          function(method, url, data/*, headers, params*/) {
            data = JSON.parse(data);
            return [200, [
              {
                idServizio: 1,
                iban: 'IT17 X060 5502 1000 0000 1234 567 ',
                intestatario: 'VALENTINA CAPOCCIA'

              },
              {
                idServizio: 2,
                iban: 'IT17 X060 5502 1000 0000 1234 765 ',
                intestatario: 'VALENTINA CAPOCCIA'

              },
              {
                idServizio: 3,
                iban: 'IT17 X060 5502 1000 0000 1234 000 ',
                intestatario: 'VALENTINA CAPOCCIA'

              }
            ]
                   ];
          }
        );

        ib.injector.get('$httpMock').when('GET', ':limiti/rest/limiti/caricaLimiti').respond(200,
                                                                                             {
          result:
          [
            {
              descrizioneGruppo: 'Bonifici Internet',
              codiceGruppo: 'G001',
              singolaOperLimite: 5000,
              singolaOperUtilizzato: null,
              singolaOperResiduo: null,
              pagamentiMensiliLimite: 20000,
              pagamentiMensiliUtilizzato: 10,
              pagamentiMensiliResiduo: 19990,
              pagamentiGiornalLimite: 5000,
              pagamentiGiornalUtilizzato: 0,
              pagamentiGiornalResiduo: 5000,
              numeroOperGiornLimite: -1,
              numeroOperGiornUtilizzato: 0,
              numeroOperGiornlResiduo: null,
              propostaSingolaOperLimite: null,
              propostaPagamentiMensiliLimite: null,
              propostaPagamentiGiornalLimite: null,
              propostaNumeroOperGiornLimite: null,
              propostaSingolaOperResiduo: null,
              propostaPagamentiMensiliResiduo: null,
              propostaPagamentiGiornalResiduo: null,
              propostaNumeroOperGiornResiduo: null,
              codiceDispositivo: ''

            }
          ]
        });

        ib.injector.get('$httpMock').when('POST', ':limiti/rest/limiti/verificaModificaLimiti')
          .respond(
          function(method, url, data/*, headers, params*/) {
            data = JSON.parse(data);
            return [200, {
              result:
              {
                descrizioneGruppo: 'Bonifici Internet',
                codiceGruppo: 'G001',
                singolaOperLimite: 5000,
                singolaOperUtilizzato: null,
                singolaOperResiduo: null,
                pagamentiMensiliLimite: 20000,
                pagamentiMensiliUtilizzato: 10,
                pagamentiMensiliResiduo: 19990,
                pagamentiGiornalLimite: 5000,
                pagamentiGiornalUtilizzato: 0,
                pagamentiGiornalResiduo: 5000,
                numeroOperGiornLimite: -1,
                numeroOperGiornUtilizzato: 0,
                numeroOperGiornlResiduo: null,
                propostaSingolaOperLimite: null,
                propostaPagamentiMensiliLimite: null,
                propostaPagamentiGiornalLimite: null,
                propostaNumeroOperGiornLimite: null,
                propostaSingolaOperResiduo: null,
                propostaPagamentiMensiliResiduo: null,
                propostaPagamentiGiornalResiduo: null,
                propostaNumeroOperGiornResiduo: null,
                codiceDispositivo: '',
                key: ''

              }
            }
                   ];
          }
        );
        ib.injector.get('$httpMock').when('POST', ':limiti/rest/limiti/confermaModificaLimiti')
          .respond(
          function(method, url, data/*, headers, params*/) {
            data = JSON.parse(data);
            return [200, {
              result:
              {
                descrizioneGruppo: 'Bonifici Internet',
                codiceGruppo: 'G001',
                singolaOperLimite: 5000,
                singolaOperUtilizzato: null,
                singolaOperResiduo: null,
                pagamentiMensiliLimite: 20000,
                pagamentiMensiliUtilizzato: 10,
                pagamentiMensiliResiduo: 19990,
                pagamentiGiornalLimite: 5000,
                pagamentiGiornalUtilizzato: 0,
                pagamentiGiornalResiduo: 5000,
                numeroOperGiornLimite: -1,
                numeroOperGiornUtilizzato: 0,
                numeroOperGiornlResiduo: null,
                propostaSingolaOperLimite: null,
                propostaPagamentiMensiliLimite: null,
                propostaPagamentiGiornalLimite: null,
                propostaNumeroOperGiornLimite: null,
                propostaSingolaOperResiduo: null,
                propostaPagamentiMensiliResiduo: null,
                propostaPagamentiGiornalResiduo: null,
                propostaNumeroOperGiornResiduo: null,
                codiceDispositivo: '',
                key: ''
              }
            }
                   ];
          }
        );

        ib.injector.get('$httpMock').when('GET',
                                          /^:avvisi\/rest\/avviso\/recuperaAvvisi\?idRapporto=.+?$/).respond(200, {
          result:
          [
            {
              descrizioneCondizione: 'descrizioneCondizione 700.00',
              mailList: ['a@a.it'],
              telefonoList: ['12345']
            },
            {
              descrizioneCondizione: 'descrizioneCondizione 500.00',
              mailList: [''],
              telefonoList: ['']
            }
          ]
        });

        ib.injector.get('$httpMock').when('POST', ':avvisi/rest/avviso/modificaAvvisi')
          .respond(function(method, url, data/*, headers, params*/) {
          data = JSON.parse(data);
          return [200, {

          }];
        });

        ib.injector.get('$httpMock').when('GET', ':profilo/rest/fea/richiediURL').respond(
          200,
          {
            FEAEnterUrl: 'url'
          });

      }

      var service = {};

      /**
  * Recupera l'anagrafica dell'utente connesso.
  * @function caricaAnagrafica
  * @memberOf ng.services.profiloService
  * @type {Promise}
  */
      service.caricaAnagrafica = function() {
        var deferred = $q.defer();

        $http.get(':anagrafica/rest/anagraficacompass/recuperaAnagrafica').then(function(res) {
          var anagraficaValidation = $jsonSchema.validate(res.data.result, 'Anagrafica');
          if (anagraficaValidation === true) {
            deferred.resolve(new Anagrafica(res.data.result));
          } else {
            deferred.reject(anagraficaValidation);
          }
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };
      /**
        * Modifica la password dell'utente connesso.
        * @function modificaPassword
        * @memberOf ng.services.profiloService
        * @type {Promise}
        */
      service.modificaPassword = function(vecchiaPswd, nuovaPswd, codiceDispositivo, seed) {
        console.log(' seed', seed);

        var deferred = $q.defer();
        $http.post(':profilo/rest/profilo/modificaPassword', {
          vecchiaPswd: vecchiaPswd,
          nuovaPswd: nuovaPswd,
          codiceDispositivo: codiceDispositivo
        }, {
          params: {
            seed: seed
          }
        }
        ).then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };
      /**
       * Modifica i recapiti dell'utente connesso.
       * @function modificaRecapiti
       * @memberOf ng.services.profiloService
       * @type {Promise}
       */
      service.modificaRecapiti = function(recapitiModificati, codiceDispositivo) {
        console.log(' modificaRecapiti SERVICE');

        var deferred = $q.defer();
        recapitiModificati.codiceDispositivo = codiceDispositivo;
        console.log('Sono in service -> modifica recapiti ', recapitiModificati);

        $http.post(':anagrafica/rest/anagraficacompass/modificaRecapiti', recapitiModificati).then(function(res) {
          if (res.data.result === 'OK') {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };
      /**
       * Modifica l'indirizzo di residenza dell'utente connesso.
       * @function modificaIndirizzi
       * @memberOf ng.services.profiloService
       * @type {Promise}
       */
      service.modificaIndirizzi = function(residenzaModificata, codiceDispositivo) {
        var res = residenzaModificata;
        console.log('residenza modificata', residenzaModificata);
        res.codiceDispositivo = codiceDispositivo;
        console.log('Sono in service -> modifica recapiti ', res);

        var deferred = $q.defer();
        $http.post(':anagrafica/rest/anagraficacompass/modificaResidenza', res).then(function(residenzaResponse) {
          if (residenzaResponse.data.result === 'OK') {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      /**
       * Carica gli avvisi legati dell'utente connesso.
       * @function caricaavvisi
       * @memberOf ng.services.profiloService
       * @type {Promise}
       */
      service.caricaAvvisi = function(id) {
        var deferred = $q.defer();

        $http.get(':avvisi/rest/avviso/recuperaAvvisi', {
          params: {
            idRapporto: id
          }
        }).then(
          function(res) {
            var avvisi = [];
            res.data.result.forEach(
              function(avviso) {
                //    var avvisoValidato = $jsonSchema.validate(avviso, 'Avviso');
                //   if (avvisoValidato === true) {
                avvisi.push(new Avviso(avviso));
                /*     }else {
                       deferred.reject(avvisi);
                     }*/

              }
            );

            deferred.resolve(avvisi);
          }
        ).catch(
          function(errore) {
            deferred.reject(errore);
          }
        );

        return deferred.promise;
      };

      /**
     * Modifica gli avvisi.
     * @function modificaAvvisi
     * @memberOf ng.services.profiloService
     * @type {Promise}
     */
      service.modificaAvvisi = function(avvisiModificati) {
        var deferred = $q.defer();
        var avvisi = {
          listaAvvisi: avvisiModificati
        };

        $http.post(':avvisi/rest/avviso/modificaAvvisi', avvisi).then(
          function() {
            //var avvisi = [];

            deferred.resolve(avvisi);
          }
        ).catch(
          function(errore) {
            deferred.reject(errore);
          }
        );

        return deferred.promise;
      };

      /**
       * Recupera i limiti dei servizi legati all'utente connesso.
       * @function getLimiti
       * @memberOf ng.services.profiloService
       * @type {Promise}
       */
      service.getLimiti = function() {
        console.log('ENTRO IN  service.getLimiti');
        var deferred = $q.defer();
        $http.get(':limiti/rest/limiti/caricaLimiti').then(
          function(res) {
            var limiti = [];
            if (Array.isArray(res.data.result) === true) {
              console.log('LIMITI *** ', res.data.result);

              res.data.result.forEach(
                function(limite) {
                  console.log('Limite', limite);
                  var limiteValidate = $jsonSchema.validate(limite, 'Limite');
                  console.log('RISULTATO DELLA VALIDAZIONE DI Limite', limiteValidate);

                  if (limiteValidate === true) {
                    limiti.push(new Limite(limite));
                  } else {deferred.reject(limiti);}
                }
              );
              deferred.resolve(limiti);
            }
          }
        ).catch(
          function(errore) {
            deferred.reject(errore);
          }
        );

        return deferred.promise;
      };
      /**
       * Verifica la correttezza della modifica dei limiti dei servizi legati all'utente connesso.
       * @function verificaModificaLimiti
       * @memberOf ng.services.profiloService
       * @type {Promise}
       */
      service.verificaModificaLimiti = function(limiteModificato) {
        var deferred = $q.defer();
        console.log('Limite modificato ->', limiteModificato);
        $http.post(':limiti/rest/limiti/verificaModificaLimiti', {
          descrizioneGruppo: limiteModificato.descrizioneGruppo,
          codiceGruppo: limiteModificato.codiceGruppo,
          singolaOperLimite: limiteModificato.singolaOperLimite,
          singolaOperUtilizzato: limiteModificato.singolaOperUtilizzato,
          singolaOperResiduo: limiteModificato.singolaOperUtilizzato,
          pagamentiMensiliLimite: limiteModificato.pagamentiMensiliLimite,
          pagamentiMensiliUtilizzato: limiteModificato.pagamentiMensiliUtilizzato,
          pagamentiMensiliResiduo: limiteModificato.pagamentiMensiliResiduo,
          pagamentiGiornalLimite: limiteModificato.pagamentiGiornalUtilizzato,
          pagamentiGiornalUtilizzato: limiteModificato.pagamentiGiornalUtilizzato,
          pagamentiGiornalResiduo: limiteModificato.pagamentiGiornalResiduo,
          numeroOperGiornLimite: limiteModificato.numeroOperGiornLimite,
          numeroOperGiornUtilizzato: limiteModificato.numeroOperGiornUtilizzato,
          numeroOperGiornlResiduo: limiteModificato.numeroOperGiornlResiduo,
          propostaSingolaOperLimite: limiteModificato.propostaSingolaOperLimite,
          propostaPagamentiMensiliLimite: limiteModificato.propostaPagamentiMensiliLimite,
          propostaPagamentiGiornalLimite: limiteModificato.propostaPagamentiGiornalLimite,
          propostaNumeroOperGiornLimite: limiteModificato.propostaNumeroOperGiornLimite,
          propostaSingolaOperResiduo: limiteModificato.propostaSingolaOperResiduo,
          propostaPagamentiMensiliResiduo: limiteModificato.propostaPagamentiMensiliResiduo,
          propostaPagamentiGiornalResiduo: limiteModificato.propostaPagamentiGiornalResiduo,
          propostaNumeroOperGiornResiduo: limiteModificato.propostaNumeroOperGiornResiduo
        }).then(function(res) {
          deferred.resolve(new Limite(res.data.result));
        }).catch(function(errore) {
          deferred.reject(errore);
        });
        return deferred.promise;
      };
      service.confermaModificaLimiti = function(key, codiceDispositivo) {
        var deferred = $q.defer();

        $http.post(':limiti/rest/limiti/confermaModificaLimiti', {
          key: key,
          codiceDispositivo: codiceDispositivo
        }).then(function(res) {
          deferred.resolve(new Limite(res.data.result));
        }).catch(function(errore) {
          deferred.reject(errore);
        });
        return deferred.promise;
      };

      /*    service.richiediToken = function() {
            return ib.injector.get('session').token;
          };*/

      service.richiediUrlFea = function() {
        var deferred = $q.defer();
        $http.get(':profilo/rest/fea/richiediURL').then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });
        return deferred.promise;
      };

      return service;
    }

  ]);
});
