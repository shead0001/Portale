define([
  'angular',
  'ib',
  'home/schemas/home.schema.js'
], function(angular, ib) {

  angular.module('ib').service('situazioneService', [
    '$q',
    '$http',
    '$jsonSchema',
    function($q, $http, $jsonSchema) {
      ib.injector.get('$httpMock').when('GET', ':home/rest/home/prodottiCliente').respond(200, {
        result: {
          numeroCarte: 1,
          numeroConti: 1,
          numeroFidi: 1,
          numeroPrestiti: 1,
          contiEntrate: 3000,
          contiUscite: 964.07,
          contiUltimoMese: 35.93,
          carteTotFido: 4000,
          carteTotDispo: 3964.07,
          carteTotSaldo: 35.93,
          carteTotUtilizzi: 3700,
          apertureCredTotFido: 1500,
          apertureCredTotDispo: 2876.98,
          apertureCredTotSaldo: 1376.98,
          apertureCredTotUtilizzi: 2400,
          prestitiTotFinanziato: 13701.66,
          prestitiTotRata: 234.89,
          prestitiTotSaldo: 13388.73,
          prestitiTotDebitoResiduo: 12214.28,
          carte: [{
            bin: '',
            bloccoCod: '',
            bloccoDes: '',
            cellulare: '',
            contoCSE: '',
            dataRiepilogo: 1458575278000,
            dataScadenza: '12/2016',
            desMarketing: 'Carta Viva',
            dispo: 1231.32,
            dispoPrincipale: 1000.32,
            dispoSecondaria: 31.00,
            fido: 3000,
            fidoPrincipale: 3000,
            fidoSecondaria: 1000,
            frequenzaPagamento: 'Un mese',
            iban: 'CJJ324342172IT21374',
            immagineTipo: 'DEFAULT.jpg',
            impSogliaAut: 2313.00,
            intestazione: 'Riccardo Federici',
            modInvioEC: 'Modalità di invio',
            modPagamento: 'Modalità di pagamento',
            numPratica: '3233132',
            pan: '321323213',
            panFull: '3231321123',
            prodotto: 'Prodotto',
            saldo: 2313.32,
            statoCod: 'Stato cod',
            statoDes: 'Attivata',
            utilizzi: 937.92
          }],
          aperture: [],
          prestiti: []
        }
      });
      var service = {};

      service.prodottiCliente = function() {
        var deferred = $q.defer();
        $http.get(':home/rest/home/prodottiCliente').then(function(res) {
          var valid = $jsonSchema.validate(res.data.result, 'Home');
          if (valid === true) {
            deferred.resolve(res.data.result);
          }else {
            deferred.reject(valid);
          }
        }).catch(function(errore) {
          deferred.reject(errore);
        });
        return deferred.promise;
      };

      return service;

    }]);

});
