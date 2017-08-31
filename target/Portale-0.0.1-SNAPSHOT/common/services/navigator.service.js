define([
  'angular',
  'ib'
], function(angular, ib) {

  angular.module('ib').run(function() {

    if (ib.mock.rest) {
      ib.injector.get('$httpMock').when('GET', ':menu/rest/menu/menuItem').respond(200, {
        'result': [
          {
            'codice': '6343',
            'id': 'EBF6MO000000000',
            'label': 'Conti di Pagamento',
            'items': [
              {
                'codice': '6344',
                'id': 'EBF6MO000000001',
                'label': 'Saldo'
              },
              {
                'codice': '6345',
                'id': 'EBF6MO000000002',
                'label': 'Lista Movimenti'
              },
              {
                'codice': '6346',
                'id': 'EBF6MO000000003',
                'label': 'Lista Bonifici'
              },
              {
                'codice': '6347',
                'id': 'EBF6MO000000004',
                'label': 'Bonifici'
              },
              {
                'codice': '6348',
                'id': 'EBF6MO000000005',
                'label': 'Giroconto'
              },
              {
                'codice': '6349',
                'id': 'EBF6MO000000006',
                'label': 'Ricarica telefonica'
              },
              {
                'codice': '6387',
                'id': 'EBF6MO000000030',
                'label': 'Inserimento Mav Rav'
              },
              {
                'codice': '6419',
                'id': 'EBF6MO000000040',
                'label': 'Lista vincoli'
              },
              {
                'codice': '6523',
                'id': 'EBF6MO000000066',
                'label': 'Carta di debito'
              }
            ]
          },
          {
            'codice': '6428',
            'id': 'EBF6MO000000046',
            'label': 'Carte',
            'items': [
              {
                'codice': '6429',
                'id': 'EBF6MO000000047',
                'label': 'Dettaglio Carta'
              },
              {
                'codice': '6430',
                'id': 'EBF6MO000000048',
                'label': 'Movimenti Carta'
              },
              {
                'codice': '6520',
                'id': 'EBF6MO000000063',
                'label': 'Anticipo contante'
              },
              {
                'codice': '6521',
                'id': 'EBF6MO000000064',
                'label': 'Ricarica Telefonica'
              },
              {
                'codice': '6522',
                'id': 'EBF6MO000000065',
                'label': 'Carta Servizi'
              }
            ]
          },
          {
            'codice': '340',
            'id': 'EBF6MO000000060',
            'label': 'Prestito',
            'items': [
              {
                'codice': '6517',
                'id': 'EBF6MO000000061',
                'label': 'Resoconto Finanziamenti'
              }
            ]
          },
          {
            'codice': '6360',
            'id': 'EBF6MO000000017',
            'label': 'Servizi',
            'items': [
              {
                'codice': '6441',
                'id': 'EBF6MO000000056',
                'label': 'Dati anagrafici'
              },
              {
                'codice': '6362',
                'id': 'EBF6MO000000019',
                'label': 'Cambia password Accesso'
              },
              {
                'codice': '6363',
                'id': 'EBF6MO000000020',
                'label': 'Cambia password Dispositiva'
              },
              {
                'codice': '6442',
                'id': 'EBF6MO000000057',
                'label': 'Consultazione Limiti'
              },
              {
                'codice': '6444',
                'id': 'EBF6MO000000059',
                'label': 'Rubrica Beneficiari'
              }
            ]
          },
          {
            'codice': '6424',
            'id': 'EBF6MO000000043',
            'label': 'Comunicazioni',
            'items': [
              {
                'codice': '6361',
                'id': 'EBF6MO000000018',
                'label': 'Inbox'
              },
              {
                'codice': '6425',
                'id': 'EBF6MO000000044',
                'label': 'Consultazione documenti'
              }
            ]
          },
          {
            'codice': '6386',
            'id': 'EBF6MO000000029',
            'label': 'Assistenza'
          }
        ]
      });
    }

  });

  angular.module('ib').service('$navigator', [
    '$q',
    '$http',
    '$rootScope',
    function($q, $http, $rootScope) {

      var service = {};

      var matrix = {
        12: {
          title: 'Conto&Carta',
          icon: 'fa-cc'
        },
        6484: {
          title: 'Home page conti',
          route: 'conti'
        },
        40: {
          title: 'Informazioni conto'
        },
        42: {
          title: 'Coordinate',
          route: 'coordinateconto'
        },
        41: {
          title: 'Saldo',
          route: 'conti'
        },
        43: {
          title: 'Movimenti',
          route: 'listamovimenti'
        },
        208: {
          title: 'Condizioni',
          route: ''
        },
        209: {
          title: 'Condizioni sul cc',
          route: ''
        },
        250: {
          title: 'Estratto conto',
          route: 'estrattoconto'
        },
        192: {
          title: 'Dispositive differite',
          route: 'dispositivedifferite'
        },
        47: {
          title: 'Bonifici e giroconti'
        },
        48: {
          title: 'Bonifico',
          route: 'bonifico'
        },
        49: {
          title: 'Bonifico SEPA',
          route: 'bonifico.sepa'
        },
        50: {
          title: 'Bonifico Periodico',
          route: 'bonifico.periodico'
        },
        /* 51: {
           title: 'Ristrutturazione',
           route: 'bonifico.sepa'
         },
         52: {
           title: 'Risp. energetico',
           route: 'bonifico.sepa'
         },
         50: {
           title: 'Periodico',
           route: 'bonifico.periodico'
         },
         */
        6420: {
           title: 'Bonifico interno',
           route: 'bonifico.interno'
         },
        54: {
          title: 'Giroconto',
          route: 'giroconto'
        },
        55: {
          title: 'Giroconto',
          route: 'giroconto'
        },
        56: {
          title: 'Giroconto periodico',
          route: 'girocontoperiodico'
        },
        187: {
          title: 'Elenco bonifici',
          route: 'elencobonifici'
        },
        57: {
          title: 'Elenco bonifici periodici',
          route: ''
        },
        59: {
          title: 'Rubrica beneficiari',
          route: 'rubricacontatti.home({section: "bonifico"})'
        },
        6454: {
          title: 'Ricarica conto'
        },
        6499: {
          title: 'Alimentaz. automatica',
          route: ''
        },
        6575: {
          title: 'Bollettino Postale',
          route: ''
        },
        60: {
          title: 'Pagamenti'
        },
        78: {
          title: 'Ricarica telefonica',
          route: 'ricaricatelefonica'
        },
        69: {
          title: 'Bollettini postali',
          route: 'bollettinipostali'
        },
        218: {
          title: 'Bianco',
          route: 'bollettinipostali.biancostep1'
        },
        219: {
          title: 'Premarcato',
          route: 'bollettinipostali.premarcatostep1'
        },
        68: {
          title: 'Pagamento MAV/RAV',
          route: 'pagamentomavrav'
        },
        229: {
          title: 'Bollettino bancario',
          route: ''
        },
        75: {
          title: 'Domiciliazioni utenze',
          route: ''
        },
        6557: {
          title: 'inserimento mandato Y0',
          route: ''
        },
        222: {
          title: 'Elenco bollettini postali',
          route: 'elencobollettinipostali'
        },
        6319: {
          title: 'Elenco MAV/RAV/Bollettini bancari',
          route: ''
        },
        76: {
          title: 'Elenco Utenze',
          route: ''
        },
        6438: {
          title: 'Canone RAI',
          route: ''
        },
        6527: {
          title: 'Bollo ACI',
          route: ''
        },
        85: {
          title: 'Prelievi'
        },
        186: {
          title: 'Prenotazione prelievo',
          route: ''
        },
        6455: {
          title: 'Money Transfer'
        },
        6530: {
          title: 'Effettua Bonifico',
          route: ''
        },
        6529: {
          title: 'Controlla/revoca un bonifico',
          route: ''
        },
        6456: {
          title: 'Richiesta servizi'
        },
        231: {
          title: 'Accredito stipendio',
          route: ''
        },
        6541: {
          title: 'Accredito pensione',
          route: ''
        },
        6515: {
          title: 'Trasferimento utenze',
          route: ''
        },
        6519: {
          title: 'Chiusura conto',
          route: ''
        },
        321: {
          title: 'Avvisi',
          icon: 'fa-inbox',
          route: 'profilo.avvisi'
        },
        6450: {
          title: 'Carta di debito'
        },
        6512: {
          title: 'Elenco carte di debito',
          route: ''
        },
        6516: {
          title: 'Sicurezza online',
          route: ''
        },
        6446: {
          title: 'E-Wallet'
        },
        6487: {
          title: 'home page e-wallet',
          route: ''
        },
        6513: {
          title: 'Associa modal. pagamento',
          route: ''
        },
        6514: {
          title: 'Lista movimenti e-wallet',
          route: ''
        },
        107: {
          title: 'Carta',
          icon: 'fa-credit-card'
        },
        6485: {
          title: 'Home page carte',
          route: 'carte'
        },
        6451: {
          title: 'Carta di credito'
        },
        6492: {
          title: 'Movimenti in corso',
          route: 'movimenticarte'
        },
        6496: {
          title: 'Ricarica Telefonica',
          route: 'ricaricatelefonicacarte'
        },
        6488: {
          title: 'Anticipo contante',
          route: ''
        },
        6511: {
          title: 'Estratto conto',
          route: 'estrattoconto'
        },
        6501: {
          title: 'Modifica invio EC',
          route: ''
        },
        6497: {
          title: 'Attivazione SMS',
          route: ''
        },
        6493: {
          title: 'Sicurezza Online',
          route: ''
        },
        6502: {
          title: 'Aperture di credito',
          icon: 'fa-money'
        },
        6463: {
          title: 'Lista movimenti',
          route: ''
        },
        6503: {
          title: 'Homepage apertura di credito',
          route: 'aperturacredito'
        },
        6504: {
          title: 'Erogazione diretta',
          route: ''
        },
        6505: {
          title: 'Modalità invio EC',
          route: ''
        },
        46: {
          title: 'Estratto conto',
          route: 'estrattoconto'
        },
        6536: {
          title: 'Modalità pagamento apertura di credito',
          route: ''
        },
        6526: {
          title: 'Trasparenza',
          route: ''
        },
        6538: {
          title: 'Bollettino Postale/Codice SISAL',
          route: ''
        },
        15: {
          title: 'Altri Servizi',
          icon: 'fa-cog'
        },
        169: {
          title: 'Dati personali e contatti'
        },
        155: {
          title: 'Dati anagrafici',
          route: 'profilo.show'
        },
        164: {
          title: 'Sicurezza'
        },
        190: {
          title: 'Modifica Password',
          route: 'profilo.modificaPassword'
        },
        176: {
          title: 'Accesso',
          route: ''
        },
        216: {
          title: 'Limiti di importo',
          route: 'profilo.limitiImporto'
        },
        283: {
          title: 'Comunicazioni'
        },
        161: {
          title: 'Inbox',
          route: ''
        },
        6457: {
          title: 'Rendicontazione'
        },
        237: {
          title: 'Consultazione documenti',
          route: ''
        },
        238: {
          title: 'Impostazione servizi',
          route: ''
        },
        6545: {
          title: 'Firma Elettronica'
        },
        6546: {
          title: 'Rig.Cod.Ut.Compass Key',
          route: ''
        },
        6547: {
          title: 'Rigenerazione OTP Firma',
          route: 'profilo.rigenerazioneOTP'
        },
        6563: {
          title: 'Condizioni del servizio',
          route: ''
        },
        340: {
          title: 'Prestito',
          icon: 'fa-usd'
        },
        6486: {
          title: 'Home page prestiti',
          route: 'prestito'
        },
        6491: {
          title: 'Resoconto prestiti',
          route: 'resocontoprestito'
        },
        6489: {
          title: 'Piano rimborso',
          route: 'rimborso'
        },
        6490: {
          title: 'Modalità Pagamento',
          route: 'modalitapagamento'
        },
        CODE1: {
          title: 'Login',
          route: 'login'
        },
        CODE2: {
          title: 'Login Pin',
          route: 'login.pin'
        },
        CODE3: {
          title: 'Login Otp',
          route: 'login.otp'
        },
        CODE4: {
          title: 'Imposta Password',
          route: 'login.impostaPassword'
        },
        CODE5: {
          title: 'Modifica Password',
          route: 'login.modificaPassword'
        },
        CODE6: {
          title: 'SEPA - Step1',
          route: 'bonifico.sepa.step1'
        },
        CODE7: {
          title: 'Periodico - Step1',
          route: 'bonifico.periodico.step1'
        },
        CODE8: {
          title: 'SEPA - Step2',
          route: 'bonifico.sepa.step2'
        },
        CODE9: {
          title: 'Periodico - Step2',
          route: 'bonifico.periodico.step2'
        },
        CODE10: {
          title: 'Profilo',
          route: 'profilo'
        },
        CODE11: {
          title: 'Carta di credito',
          route: 'carte.home'
        },
        CODE12: {
          title: 'Ricarica - Step1',
          route: 'ricaricatelefonica.step1'
        },
        CODE13: {
          title: 'Ricarica - Step2',
          route: 'ricaricatelefonica.step2'
        },
        CODE14: {
          title: 'Giroconto - Step1',
          route: 'giroconto.step1'
        },
        CODE15: {
          title: 'Lista Dispositive Differite',
          route: 'dispositivedifferite.listadispositivedifferite'
        },
        CODE16: {
          title: 'Dispositive Differite Dettaglio',
          route: 'dispositivedifferite.dispositivedifferitedettaglio'
        },
        CODE17: {
          title: 'Resoconto',
          route: 'resocontoprestito.resoconto'
        },
        CODE18: {
          title: 'Modalità Pagamento - Step1',
          route: 'modalitapagamento.step1'
        },
        CODE19: {
          title: 'Modifica Limiti',
          route: 'profilo.modificaLimiti'
        },
        CODE20: {
          title: 'Modifica Indirizzo',
          route: 'profilo.editIndirizzo'
        },
        CODE21: {
          title: 'Modifica Recapiti',
          route: 'profilo.editRecapiti'
        },
        CODE22: {
          title: 'Ricarica - Fine',
          route: 'ricaricatelefonica.fine'
        },
        CODE23: {
          title: 'Bollettino Postale Premarcato - Step2',
          route: 'bollettinipostali.premarcatostep2'
        },
        CODE24: {
          title: 'Bollettino Postale Bianco - Step2',
          route: 'bollettinipostali.biancostep2'
        },
        CODE25: {
          title: 'Bollettini Postali - Fine',
          route: 'bollettinipostali.biancostep3'
        },
        CODE26: {
          title: 'SEPA - Fine',
          route: 'bonifico.sepa.fine'
        },
        CODE27: {
          title: 'Periodico - Fine',
          route: 'bonifico.periodico.fine'
        },
        CODE28: {
          title: 'Dettaglio Elenco Bonifici',
          route: 'elencobonifici.dettaglio'
        },
        CODE29: {
          title: 'Elenco',
          route: 'elencobonifici.elenco'
        },
        CODE30: {
          title: 'Aggiungi Contatto',
          route: 'rubricacontatti.add'
        },
        CODE31: {
          title: 'Rubrica Contatti',
          route: 'rubricacontatti'
        },
        CODE32: {
          title: 'Rubrica Contatti',
          route: 'rubricacontatti.home'
        },
        CODE33: {
          title: 'Apertura Credito - Step1',
          route: 'aperturacredito.modinvioec'
        },
        CODE34: {
          title: 'Apertura Credito - Step2',
          route: 'aperturacredito.modinvioec2'
        },
        CODE35: {
          title: 'Apertura Credito - Step3',
          route: 'aperturacredito.modinvioec3'
        },
        CODE36: {
          title: 'Apertura Credito - Estratto Conto',
          route: 'aperturacredito.estrattoconto'
        },
        CODE37: {
          title: 'Apertura Credito - SMS',
          route: 'aperturacredito.sms'
        },
        CODE38: {
          title: 'Apertura Credito - SMS STEP2',
          route: 'aperturacredito.smsstep2'
        },
        CODE39: {
          title: 'Apertura Credito - SMS STEP3',
          route: 'aperturacredito.smsstep3'
        },
        CODE40: {
          title: 'Carte - STEP1',
          route: 'carte.modinvioec'
        },
        CODE41: {
          title: 'Carte - STEP2',
          route: 'carte.modinvioecstep2'
        },
        CODE42: {
          title: 'Carte - STEP3',
          route: 'carte.modinvioecstep3'
        },
        CODE43: {
          title: 'Carte - Anticipo',
          route: 'carte.anticipo'
        },
        CODE44: {
          title: 'Carte - Anticipo STEP2',
          route: 'carte.anticipostep2'
        },
        CODE45: {
          title: 'Carte - Anticipo STEP3',
          route: 'carte.anticipostep3'
        },
        CODE46: {
          title: 'Limiti - Conferma Modifica Limiti',
          route: 'profilo.confermaModificaLimiti'
        },
        CODE47: {
          title: 'MAV/RAV - STEP1',
          route: 'pagamentomavrav.step1'
        },
        CODE48: {
          title: 'MAV/RAV - STEP2',
          route: 'pagamentomavrav.step2'
        },
        CODE49: {
          title: 'Interno - Step1',
          route: 'bonifico.interno.step1'
        },
        CODE50: {
          title: 'Interno - Step2',
          route: 'bonifico.interno.step2'
        },
        CODE51: {
          title: 'Homepage apertura di credito',
          route: 'aperturacredito.home'
        },
        CODE52: {
          title: 'MAV/RAV - STEP3',
          route: 'pagamentomavrav.step3'
        },
        CODE53: {
          title: 'Bollettino Postale Premarcato - Step3',
          route: 'bollettinipostali.premarcatostep3'
        },
        CODE54: {
          title: 'Bollettino Postale Bianco - Step3',
          route: 'bollettinipostali.biancostep3'
        }
      };

      var states = {};

      service.createMenu = function(mmitem, ppItem) {
        ///console.log('me item', mmitem);
        function me2(item, parentItem) {
          // rootItem.forEach(function(item) {
          //console.log('item', item);
          var cod = item.codice;
          if (matrix.hasOwnProperty(cod)) {
            var new_item = angular.extend({}, matrix[cod]);
            if (parentItem) {
              parentItem.children.push(new_item);
            } else {
              service.items.push(new_item);
            }
            if (item.hasOwnProperty('items')) {
              new_item.children = [];
              item.items.forEach(function(subitem) {
                  //console.log('subitem', subitem);
                  var sub_cod = subitem.codice;
                  if (matrix.hasOwnProperty(sub_cod)) {
                    var new_subitem = angular.extend({}, matrix[sub_cod]);
                    if (subitem.hasOwnProperty('items')) {
                      //console.log('recursive ....');
                      me2(subitem, new_item);
                    }else {
                      new_item.children.push(new_subitem);
                    }
                  }
                });
            }
          }
          //});
          //console.log('new_item', new_item);
        }

        return me2(mmitem, ppItem);
      };

      service.load = function() {

        var deferred = $q.defer();

        $http.get(':menu/rest/menu/menuItem').then(function(res) {

          var root = res.data.result;

          root.forEach(function(mitem) {
            service.createMenu(mitem, null);
          });
          //console.log('***** items', service.items);
          /*root.forEach(function(item) {
            //console.log('item', item);
            var cod = item.codice;//item.id;
            if (matrix.hasOwnProperty(cod)) {
              var new_item = angular.extend({}, matrix[cod]);
              service.items.push(new_item);
              if (item.hasOwnProperty('items')) {
                new_item.children = [];
                item.items.forEach(function(subitem) {
                  //console.log('-- subitem', subitem);
                  var sub_cod = subitem.codice;//subitem.id;
                  if (matrix.hasOwnProperty(sub_cod)) {
                    var new_subitem = angular.extend({}, matrix[sub_cod]);
                    new_item.children.push(new_subitem);
                    if (subitem.hasOwnProperty('items')) {
                      new_subitem.children = [];
                      subitem.items.forEach(function(subsubitem) {
                        //console.log('-- --- subsubitem', subsubitem);
                        var sub_sub_cod = subsubitem.codice;
                        if (matrix.hasOwnProperty(sub_sub_cod)) {
                          //console.log('-- --- subsubitem sub_sub_cod', sub_sub_cod);
                          var new_subsubitem = angular.extend({}, matrix[sub_sub_cod]);
                          new_subitem.children.push(new_subsubitem);
                          if (subsubitem.hasOwnProperty('items')) {
                            new_subsubitem.children = [];
                            subsubitem.items.forEach(function(sub4item) {
                              var sub_4_cod = sub4item.codice;
                              if (matrix.hasOwnProperty(sub_4_cod)) {
                                var new_sub4item = angular.extend({}, matrix[sub_4_cod]);
                                new_subsubitem.children.push(new_sub4item);
                              }
                            });

                          }

                        }
                      });

                      console.log(new_item);
                    }
                  }
                });
              }
            }
          });*/

          deferred.resolve();
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;

      };

      $rootScope.$on('$identityLogin', function() {
        service.load().then(function() {
          $rootScope.$emit('$navigatorLoaded');
        });
      });

      service.items = [];

      $rootScope.$on('$stateChangeSuccess', function(event, toState/*, toParams, fromState, fromParams*/) {
        var parts = toState.name.split('.');
        var state = '';
        service.breadcrumb = [];
        parts.forEach(function(part, index) {
          if (index !== 0) {
            state += '.';
          }
          state += part;
          var step;
          if (!states.hasOwnProperty(state)) {
            angular.forEach(matrix, function(value) {
              if (value.route === state) {
                states[state] = value;
              }
            });
          }
          step = states[state];
          if (!step) {
            step = {
              title: state
            };
            console.warn('please add state "%s" to navigator matrix', state);
          }
          service.breadcrumb.push(step);
        });
      });

      service.breadcrumb = [];

      return service;

    }
  ]);

});
