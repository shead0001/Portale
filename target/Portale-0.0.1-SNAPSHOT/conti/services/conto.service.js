define([
  'angular',
    'ib',
  'conti/models/conto.factory.js'
], function(angular, ib) {

  /**
   * Espone il service per contattare i servizi di conto.
   * @namespace contoService
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('contoService', [
    '$q',
    '$http',
    'Conto',
    '$jsonSchema',
    function($q, $http, Conto, $jsonSchema) {

      if (ib.mock.rest) {
        //Conti
        ib.injector.get('$httpMock').when('GET', /^:conti\/rest\/conto\/listaConti.*$/).respond(200, {
          result: [
            {
              idRapporto: 'XXXXXXX1',
              intestatario: 'Mario Bianchi',
              name: 'Conto 1',
              iban: 'IT00I0000000000000000000001',
              swift: 'BPPIITRRXXX',
              dataApertura: '2015-11-18',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 14440.54,
              saldoDisponibile: 677.90,
              sommePrenotate: -290.50,
              dataSaldo: '2016-01-18T12:36:41',
              status: 'In essere',
              descrizione: ''
            },
            {
              idRapporto: 'XXXXXXX2',
              intestatario: 'Mario Rossi',
              name: 'Conto 2',
              iban: 'IT00I0000000000000000000002',
              swift: 'BPPIITRPXXX',
              dataApertura: '2015-07-09',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 400.00,
              saldoDisponibile: 200.12,
              sommePrenotate: -3162.39,
              dataSaldo: '2015-11-01T18:01:09',
              status: 'Altro',
              descrizione: ''
            },
            {
              idRapporto: 'XXXXXXX3',
              intestatario: 'Mario Rossi',
              name: 'Conto 3',
              iban: 'IT00I0000000000000000000003',
              swift: 'BPPIITRZXXX',
              dataApertura: '2014-03-19',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 1400.00,
              saldoDisponibile: 1200.12,
              sommePrenotate: -290.32,
              dataSaldo: '2015-07-23T01:41:01',
              status: 'In essere',
              descrizione: ''
            },
            {
              idRapporto: 'XXXXXXX4',
              intestatario: 'CASAROTTO FRANCESCA,BOTTE SARA',
              name: 'Conto 4',
              iban: 'IT00I0000000000000000000004',
              swift: 'BPPIITRZXXX',
              dataApertura: '2014-03-19',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 1400.00,
              saldoDisponibile: 1200.12,
              sommePrenotate: -290.32,
              dataSaldo: '2015-07-23T01:41:01',
              status: 'In essere',
              descrizione: '',
              cointestatari: [
                {
                  cdg: 25744,
                  denominazione: 'CASAROTTO FRANCESCA,BOTTE SARA'
                },
                {
                  cdg: 8717362,
                  denominazione: 'CASAROTTO FRANCESCA'
                },
                {
                  cdg: 14605072,
                  denominazione: 'BOTTE SARA'
                }
              ]
            }
          ]});
        ib.injector.get('$httpMock').when('GET', /^:conti\/rest\/conto\/listaContiCompleta.*$/).respond(200, {
          result: [
            {
              idRapporto: 'XXXXXXX1',
              intestatario: 'Mario Bianchi',
              name: 'Conto 1',
              iban: 'IT00I0000000000000000000001',
              swift: 'BPPIITRRXXX',
              dataApertura: '2015-11-18',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 14440.54,
              saldoDisponibile: 677.90,
              sommePrenotate: -290.50,
              dataSaldo: '2016-01-18T12:36:41',
              status: 'In essere',
              descrizione: '',
              cointestatari: [
                {
                  cdg: 25744,
                  denominazione: 'Mario Bianchi'
                }
              ]
            },
            {
              idRapporto: 'XXXXXXX2',
              intestatario: 'Mario Rossi',
              name: 'Conto 2',
              iban: 'IT00I0000000000000000000002',
              swift: 'BPPIITRPXXX',
              dataApertura: '2015-07-09',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 400.00,
              saldoDisponibile: 200.12,
              sommePrenotate: -3162.39,
              dataSaldo: '2015-11-01T18:01:09',
              status: 'Altro',
              descrizione: '',
              cointestatari: [
                {
                  cdg: 25744,
                  denominazione: 'Mario Rossi'
                }
              ]
            },
            {
              idRapporto: 'XXXXXXX3',
              intestatario: 'Mario Rossi',
              name: 'Conto 3',
              iban: 'IT00I0000000000000000000003',
              swift: 'BPPIITRZXXX',
              dataApertura: '2014-03-19',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 1400.00,
              saldoDisponibile: 1200.12,
              sommePrenotate: -290.32,
              dataSaldo: '2015-07-23T01:41:01',
              status: 'In essere',
              descrizione: '',
              cointestatari: [
                {
                  cdg: 25744,
                  denominazione: 'Mario Rossi'
                }
              ]
            },
            {
              idRapporto: 'XXXXXXX4',
              intestatario: 'CASAROTTO FRANCESCA,BOTTE SARA',
              name: 'Conto 4',
              iban: 'IT00I0000000000000000000004',
              swift: 'BPPIITRZXXX',
              dataApertura: '2014-03-19',
              tipo: 'TIPO_RAPP_CONTO_CORRENTE',
              saldoContabile: 1400.00,
              saldoDisponibile: 1200.12,
              sommePrenotate: -290.32,
              dataSaldo: '2015-07-23T01:41:01',
              status: 'In essere',
              descrizione: '',
              cointestatari: [
                {
                  cdg: 25744,
                  denominazione: 'CASAROTTO FRANCESCA,BOTTE SARA'
                },
                {
                  cdg: 8717362,
                  denominazione: 'CASAROTTO FRANCESCA'
                },
                {
                  cdg: 14605072,
                  denominazione: 'BOTTE SARA'
                }
              ]
            }
          ]});

        //Saldi
        ib.injector.get('$httpMock').when('GET', ':conti/rest/prv/conti/XXXXXXX1/saldi').respond(200, {
          result: {
            idRapporto: 'XXXXXXX3',
            name: 'Conto 3',
            data: [
              1554,
              11200,
              13000,
              1554,
              16700,
              11000
            ]
          }
        });
        ib.injector.get('$httpMock').when('GET', /^:conti\/rest\/conto\/listaSaldi\?idRapporto=.+?$/).respond(200, {
          result: {
            idConto: 'Conto',
            name: 'Nome del conto',
            data:
            [
              {
                data: 1455454694691,
                saldo: 5714.277452138607
              },
              {
                data: 1454849894691,
                saldo: 577.4800066334151
              },
              {
                data: 1454245094691,
                saldo: 4660.936956520174
              },
              {
                data: 1453640294691,
                saldo: 6168.083247884617
              },
              {
                data: 1453035494691,
                saldo: 7586.4637884816975
              }
            ]
          }
        });

        //Somme prenotate
        ib.injector.get('$httpMock').when('GET', /^:conti\/rest\/conto\/sommePrenotate\?idRapporto=.+?$/).respond(200, {
          result: [
            {
              idSommaPrenotata: '1',
              dataDisponibilita: 1450393200000,
              dataMovimento: 1447801200000,
              scadenza: '2016-02-18',
              causale: 'Vostra disposizione',
              divisa: 'EUR',
              importo: -250
            },
            {
              idSommaPrenotata: '2',
              dataDisponibilita: 1450393200000,
              dataMovimento: 1447801200000,
              scadenza: '2016-02-01',
              causale: 'Pagamento tramite POS',
              divisa: 'EUR',
              importo: -32.18
            },
            {
              idSommaPrenotata: '3',
              dataDisponibilita: 1450393200000,
              dataMovimento: 1447801200000,
              scadenza: '2016-01-01',
              causale: 'Commis/Provvig/Spese',
              divisa: 'EUR',
              importo: -8.32
            }
          ]});

        ib.injector.get('$httpMock')
          .when('GET', /^:conti\/rest\/conto\/trendSaldi\?/)
          .respond(200, {
          result: {
            idRapporto: 'Conto00001',
            name: 'Conto nome',
            data: [
              {
                data: 1435708800000,
                saldo: 2653.189643103312,
                saldoMedio: 5444.666515061916
              },
              {
                data: 1438387200000,
                saldo: 5320.844917354088,
                saldoMedio: 5498.2905082149755
              },
              {
                data: 1441065600000,
                saldo: 7546.527379229925,
                saldoMedio: 6963.494671247118
              },
              {
                data: 1443657600000,
                saldo: 971.0815339952295,
                saldoMedio: 6430.124295431327
              },
              {
                data: 1446339600000,
                saldo: 3507.4096686135667,
                saldoMedio: 8805.610615541409
              },
              {
                data: 1448931600000,
                saldo: 3841.2346388572373,
                saldoMedio: 7604.300136612124
              }
            ]
          }
        });

        ib.injector.get('$httpMock').when('GET', ':rest/rest/prv/conti/XXXXXXX2/sommePrenotate').respond(200, {
          result: [
            {
              idSommaPrenotata: '4',
              decorrenza: '2016-01-22',
              scadenza: '2016-02-25',
              causale: 'Vostra disposizione',
              divisa: 'EUR',
              importo: -2990.21
            },
            {
              idSommaPrenotata: '5',
              decorrenza: '2015-10-28',
              scadenza: '2016-01-01',
              causale: 'Pagamento online',
              divisa: 'EUR',
              importo: -172.18
            }
          ]});

        ib.injector.get('$httpMock').when('GET', ':rest/rest/prv/conti/XXXXXXX3/sommePrenotate').respond(200, {
          result: [
            {
              idSommaPrenotata: '6',
              decorrenza: '2016-01-21',
              scadenza: '2016-02-27',
              causale: 'Tassa sulla casa',
              divisa: 'EUR',
              importo: -290.32
            }
          ]});
        ib.injector.get('$httpMock').when('GET', ':rest/rest/prv/conti/001-330-0015099/sommePrenotate').respond(200, {
          result: [
            {
              idSommaPrenotata: '6',
              decorrenza: '2016-01-21',
              scadenza: '2016-02-27',
              causale: 'Tassa sulla casa',
              divisa: 'EUR',
              importo: -290.32
            }
          ]});
        ib.injector.get('$httpMock').when('GET', ':rest/rest/prv/conti/099-330-0010105/sommePrenotate').respond(200, {
          result: [
            {
              idSommaPrenotata: '6',
              decorrenza: '2016-01-21',
              scadenza: '2016-02-27',
              causale: 'Tassa sulla casa',
              divisa: 'EUR',
              importo: -290.32
            }
          ]});
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
      service.lista = function(tipoConto, tipoFiltro) {
        var deferred = $q.defer();

        //TODO: implementare cache
        $http.get(':conti/rest/conto/listaConti', {
          params: {
            tipo: tipoConto,
            tipoFiltro: tipoFiltro
          }
        }).then(function(res) {
          var conti = [];
          if (Array.isArray(res.data.result) === true) {
            res.data.result.forEach(function(restConto) {
              var contoValido = $jsonSchema.validate(restConto, 'Conto');
              if (contoValido === true) {
                conti.push(new Conto(restConto));
              } else {
                deferred.reject(contoValido);
              }
            });
            deferred.resolve(conti);
          }
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      /**
       * Restituisce la lista dei conti completa.
       * @function listaContiCompleta
       * @memberOf ng.services.contoService
       * @param {String} tipoConto Il tipo di conto.
       * @param {String} tipoFiltro Il tipo di filtro.
       * @type {Promise}
       */
      service.listaContiCompleta = function(tipoConto, tipoFiltro) {
        var deferred = $q.defer();

        //TODO: implementare cache
        $http.get(':conti/rest/conto/listaContiCompleta', {
          params: {
            tipo: tipoConto,
            tipoFiltro: tipoFiltro
          }
        }).then(function(res) {
          var conti = [];
          if (Array.isArray(res.data.result) === true) {
            res.data.result.forEach(function(restConto) {
              var contoValido = $jsonSchema.validate(restConto, 'Conto');
              if (contoValido === true) {
                conti.push(new Conto(restConto));
              } else {
                deferred.reject(contoValido);
              }
            });
            deferred.resolve(conti);
          }
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      /**
       * Restituisce la lista dei saldi.
       * @function listaSaldi
       * @memberOf ng.services.contoService
       * @param {String|Number} idRapporto Id del rapporto.
       * @param {String|Number} numeroMesi Il numero di mesi.
       * @type {Promise}
       */
      service.listaSaldi = function(idRapporto, numeroMesi) {
        var deferred = $q.defer();
        /*':rest/rest/prv/conti/' + idRapporto + '/saldi'*/
        //TODO: implementare cache
        //http://127.0.0.1:9081/puc2/rest/conto/saldo?idRapporto=001-330-0000018
        $http.get(':conti/rest/conto/listaSaldi', {
          params: {
            idRapporto: idRapporto,
            numeroMesi: numeroMesi
          }
        }).then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      /**
       * Restituisce la lista delle somme prenotate.
       * @function listaSommePrenotate
       * @memberOf ng.services.contoService
       * @type {Promise}
       */
      service.listaSommePrenotate = function(idRapporto) {
        var deferred = $q.defer();

        //TODO: implementare cache
        //alert("idRapporto:" + idRapporto);
        $http.get(':conti/rest/conto/sommePrenotate', {
          params: {
            idRapporto: idRapporto
          }
        })
          .then(function(res) {
          deferred.resolve(res.data.result);
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      /* .when('GET', /^:conti\/rest\/conto\/trendSaldi\?idRapporto=.+?\&start=.+?\&end=.+?\&timeFrame=.+?$/)
       * */
      /**
       * Restituisce l'andamento dei saldi per periodo e per tipologia di finestra tempolare (Mese, Settimana).
       * @function trendSaldi
       * @memberOf ng.services.contoService
       * @param {String|Number} idRapporto Id del rapporto.
       * @param {String|Number} start data inizio periodo di valutazione (ddmmyyy).
       * @param {String|Number} end data fine periodo di valutazione (ddmmyyy).
       * @param {String|Number} timeFrame tipologia periodo di valutazione ('Mese', 'Settimana').
       * @type {Promise}
       */
      service.trendSaldi = function(idRapporto, start, end, timeFrame) {
        var deferred = $q.defer();
        //TODO: implementare cache
        $http.get(':conti/rest/conto/trendSaldi', {
          params: {
            idRapporto: idRapporto,
            start: start,
            end: end,
            timeFrame: timeFrame
          }
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
