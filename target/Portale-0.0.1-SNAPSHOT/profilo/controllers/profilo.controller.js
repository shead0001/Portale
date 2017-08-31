define([
  'angular',
  'ib',
  'profilo/services/profilo.service.js',
  'common/services/otp.sms.service.js',
  /*'conti/services/conto.service.js',*/
  'login/services/login.service.js',
  'common/services/annulladispositiva.service.js'
], function(angular) {

  angular.module('ib').controller('profiloController', [
    '$scope',
    '$state',
    '$timeout',
    'profiloService',
    'contoService',
    'loginService',
    'otpSmsService',
    'annullaDispositivaService',
    'DTOptionsBuilder',
    '$jsonSchema',
    '$exceptionNotifier',
    function($scope, $state, $timeout,
              profiloService, contoService, loginService, otpSmsService, annullaDispositivaService,
              DTOptionsBuilder, $jsonSchema, $exceptionNotifier) {

      var self = this;
      self.idUtente = 1;
      self.contoSelected = 0;
      self.conti = [];
      self.limiti = [];
      self.limiteDaModificare = '';
      self.passwordReadOnly = true;
      self.nuovaPassword = '';
      self.confermaNuovaPassword = '';
      self.nuovaPasswordValue = '';
      self.confermaNuovaPasswordValue = '';
      self.vecchiaPassword = '';
      self.passwordDifferenti = false;
      self.codiceDispositivo = '';
      self.dtOptions = '';
      self.limiteModificato = false;
      self.recapitoModificato = false;
      self.residenzaModificata = false;

      self.avvisoDaModificare = null;
      self.avvisi = [];

      self.booleanSms = [];
      self.booleanMail = [];
      self.recapiti = [];
      self.email = [];
      self.descrizioniModificate = [];
      self.recapitoSelect = null;
      self.mailSelect = null;
      self.mailModificate = [];
      self.recapitiModificati = [];
      self.otp = false;
      self.telefonoNonOscurato = null;
      self.importo = [];
      self.limiteModificato = false;

      self.urlFEA = '';

      self.dtOptionsAvvisi = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withOption('responsive', {
        details: {
          type: 'column',
          target: 0
        }
      })
        .withOption('paging', false)
        .withOption('lengthChange', false)
        .withOption('searching', false)
        .withOption('bInfo', false)
        .withOption('ordering', false)
        .withOption('columnDefs', [
        {className: 'control', orderable: false, targets: 0}
      ])
        .withOption('oLanguage', {
        'sEmptyTable': 'Nessun dato presente nella tabella',
        'sInfo': 'Vista da _START_ a _END_ di _TOTAL_ elementi',
        'sInfoEmpty': 'Vista da 0 a 0 di 0 elementi',
        'sInfoFiltered': '',
        'sInfoPostFix': '',
        'sLengthMenu': '',
        'sLoadingRecords': 'Caricamento...',
        'sProcessing': 'Elaborazione...',
        'decimal': ',',
        'sZeroRecords': 'La ricerca non ha portato alcun risultato.'
      });

      self.recapito = '';
      /*********Tastierino di modifica ********/

      self.seed = '';

      self.maskTimeout = 200;
      self.maxPinLength = 5;

      self.tastierino = [];
      self.pin = [];

      self._emptyPin = [
        {id: '', src: 'common/static/img/login/blank.png'},
        {id: '', src: 'common/static/img/login/blank.png'},
        {id: '', src: 'common/static/img/login/blank.png'},
        {id: '', src: 'common/static/img/login/blank.png'},
        {id: '', src: 'common/static/img/login/blank.png'}
      ];
      self.recapitoDaModificare = {};
      self.indirizzoDaModificare = {};
      self.codiceCliente = '';
      self.giornoNascita = '';
      self.meseNascita = '';
      self.annoNascita = '';
      self.focus = '';
      self.passwordModificata = false;

      self.resetPin = function() {
        if (self.focus === 'nuova') {
          self.nuovaPassword = '';
          self.nuovaPasswordValue = '';
          self.passwordDifferenti = false;
        }
        if (self.focus === 'conferma') {
          self.confermaNuovaPassword = '';
          self.confermaNuovaPasswordValue = '';
          self.passwordDifferenti = false;
        }
      };

      var generaSeed = function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      };

      self.generaTastierino = function() {
        self.seed = generaSeed();
        loginService.generaTastierino(self.seed).then(function(tasti) {
          //FIXME: assicuriamoci che il server randomizzi le chiavi
          self.tastierino = tasti;
        }).catch(function(error) {
          $exceptionNotifier(error);
        });
      };

      self.aggiornaCodicePin = function(tasto) {
        if (self.focus === 'nuova') {
          self.nuovaPassword = self.nuovaPassword + '*';
          self.nuovaPasswordValue = self.nuovaPasswordValue + tasto.id;
          console.log('Value ', self.nuovaPasswordValue);
        }
        if (self.focus === 'conferma') {
          self.confermaNuovaPassword = self.confermaNuovaPassword + '*';
          self.confermaNuovaPasswordValue = self.confermaNuovaPasswordValue + tasto.id;

          console.log('Value ', self.confermaNuovaPasswordValue);
        }

      };

      self.setFocus = function(idText) {
        self.focus = idText;
      };

      self.modificaPassword = function() {

        profiloService.modificaPassword(self.vecchiaPassword, self.nuovaPasswordValue,
                                      self.codiceDispositivo, self.seed)
            .then(function() {
              self.passwordModificata = true;
              self.otp = false;
              self.nuovaPassword = '';
              self.nuovaPasswordValue = '';
              self.confermaNuovaPassword = '';
              self.confermaNuovaPasswordValue = '';
              self.vecchiaPassword = '';
              self.modificaPasswordForm.$setPristine();
            }).catch(function(errore) {
              self.otp = false;
              $exceptionNotifier(errore);
            });

      };

      /********End tastierino di modifica ********/

      profiloService.caricaAnagrafica().then(
        function(datiAnagrafici) {
          self.anagrafica = datiAnagrafici;
        }).catch(function(errore) {
        $exceptionNotifier(errore);
      });

      self.inizializzaLimiti = function() {

        self.dtOptions = DTOptionsBuilder.newOptions()
          .withPaginationType('full_numbers')
          .withOption('responsive', {
          details: {
            type: 'column',
            target: 0
          }
        })
          .withOption('paging', false)
          .withOption('lengthChange', false)
          .withOption('searching', false)
          .withOption('bInfo', false)
          .withOption('ordering', false)
          .withOption('columnDefs', [
          {className: 'control', orderable: false, targets: 0}
        ])
          .withOption('oLanguage', {
          'sEmptyTable': 'Nessun dato presente nella tabella',
          'sInfo': 'Vista da _START_ a _END_ di _TOTAL_ elementi',
          'sInfoEmpty': 'Vista da 0 a 0 di 0 elementi',
          'sInfoFiltered': '',
          'sInfoPostFix': '',
          'sLengthMenu': '',
          'sLoadingRecords': 'Caricamento...',
          'sProcessing': 'Elaborazione...',
          'decimal': ',',
          'sZeroRecords': 'La ricerca non ha portato alcun risultato.'
        });

        self.caricaLimiti();

      };

      self.caricaLimiti = function() {
        self.limiteModificato = false;
        profiloService.getLimiti().then(function(limitiResponse) {
          self.limiti = limitiResponse;
        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });
      };

      self.modificaLimite = function(limite) {
        console.log('self.modificaLimite = function(limite)');
        self.limiteDaModificare = limite;
        self.otp = false;
        $state.go('profilo.modificaLimiti');
      };

      self.verificaModificaLimiti = function() {
        console.log('LIMITE DA MODIFICARE ****', self.limiteDaModificare);
        profiloService.verificaModificaLimiti(self.limiteDaModificare).then(function(lim) {
          self.limite = lim;
          $state.go('profilo.confermaModificaLimiti');
        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });
      };
      self.confermaModificaLimiti = function() {
        console.log(' SONO IN confermaModificaLimiti');
        profiloService.confermaModificaLimiti(self.limite.key, self.codiceDispositivo).then(function(lim) {
          self.limite = lim;
          self.limiteModificato = true;
          self.otp = false;
        }).catch(function(errore) {
          self.otp = false;
          $exceptionNotifier(errore);
        });
      };
      self.visualizzalimiti = function() {
        self.limiteModificato = false;
        $state.go('profilo.limitiImporto');
      };

      self.initAvvisi = function() {

        self.listaConti = [];
        self.contoAddebito = null;
        self.indiceContoDefault = 0;
        self.contiCaricati = false;
        self.otp = false;
        self.mail = [];
        self.sms = [];
        self.email = [];
        self.recapiti = [];
        self.booleanSms = [];
        self.booleanMail = [];
        self.mailModificate = [];
        self.recapitiModificati = [];
        self.descrizioniModificate = [];
        self.telefonoNonOscurato = [];
        self.importo = [];
        self.errorAsterisk = false;

        self.caricaListaConti();
      };

      self.caricaListaConti = function(contoPreselezionatoId) {

        contoService.lista().then(function(conti) {
          self.listaConti = conti;

          if (angular.isUndefined(contoPreselezionatoId)) {
            self.contoAddebito = self.listaConti[0];
          } else {
            for (var i = 0; i < conti.length; i++) {
              if (conti[i].idRapporto === contoPreselezionatoId) {
                self.contoAddebito = conti[i];
                self.indiceContoDefault = i;
                break;
              }
            }
          }
          self.caricaAvvisi();
          self.contiCaricati = true;

        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });
      };

      self.caricaAvvisi = function() {
        profiloService.caricaAvvisi(self.contoAddebito.idRapporto).then(function(avvisi) {
          self.avvisi = avvisi;
          self.avvisoDaModificare = self.avvisi;
          self.avvisi.forEach(
            function(avviso) {
              if (avviso.mailList.length !== 0) {
                self.mail.push('SI');
              }else {
                self.mail.push('NO');
              }
              if (avviso.telefonoOscuratoList.length !== 0) {
                self.sms.push('SI');
              }else {
                self.sms.push('NO');
              }
            }
          );
        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });
      };

      self.modificaAvvisi = function(avvisi) {
        self.avvisoDaModificare = avvisi;
        self.avvisoDaModificare.forEach(
          function(avv, index) {
            if (avv.mailList.length !== 0) {
              self.booleanMail.push(true);
            }else {
              self.booleanMail.push(false);
            }
            if (avv.telefonoList.length !== 0) {
              self.booleanSms.push(true);
            }else {
              self.booleanSms.push(false);
            }

            if (avv.tipocond === 'IMPOMIN') {
              var descrizioneModificata = avv.descrizioneCondizione.replace(avv.importo + '.00', '');
              self.descrizioniModificate.push(descrizioneModificata);

              self.importo[index] = avv.importo;
            }
          }
        );

        self.avvisoDaModificare[0].listaSmsDisponibili.forEach(
          function(telefoni) {
            self.recapiti.push(telefoni.recapitoOscurato);
          }
        );
        self.avvisoDaModificare[0].listaMailDisponibili.forEach(
          function(email) {
            self.email.push(email.recapito);
          }
        );

        self.recapitoSelect = self.recapiti[0];
        self.mailSelect = self.email[0];

        $state.go('profilo.modificaAvvisi');

      };

      self.confermaModifica = function() {
        self.booleanMail.forEach(function(mailBool) {
          if (mailBool === true) {
            self.mailModificate.push(self.mailSelect);
          } else if (mailBool === false) {
            self.mailModificate.push(null);
          }
        });

        self.booleanSms.forEach(function(smsBool) {
          if (smsBool === true) {
            self.recapitiModificati.push(self.recapitoSelect);
          } else if (smsBool === false) {
            self.recapitiModificati.push(null);
          }
        });

        self.avvisoDaModificare.forEach(function(avv, index) {
          //Modifica mail e telefono
          avv.mailList = [];
          avv.mailList.push(self.mailModificate[index]);
          avv.telefonoOscuratoList = [];
          avv.telefonoOscuratoList.push(self.recapitiModificati[index]);
          avv.telefonoList = [];
          self.decodeTelefono(self.recapitiModificati[index]);
          avv.telefonoList.push(self.telefonoNonOscurato[index]);

          //Modifica Importo
          if (avv.tipocond === 'IMPOMIN') {
            avv.descrizioneCondizione = self.descrizioniModificate[index] + self.importo[index] + '.00';
            avv.condizione = self.importo[index];
            avv.importo = self.importo[index];
          }
          if (self.booleanMail[index] === true) {
            avv.listaEmailValorizzata = true;
          }

          if (self.booleanSms[index] === true) {
            avv.listaTelefoniValorizzata = true;
          }
        }
                                       );

        profiloService.modificaAvvisi(self.avvisoDaModificare).then(function() {
          $state.go('profilo.avvisi');
        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });

        self.otp = false;
      };

      self.mostraOtp = function() {
        self.otp = true;
      };

      self.mostraOtpModificaRecapiti = function() {
        if (self.formModificaRecapiti.cellulare.$dirty !== false) {
          if (self.formModificaRecapiti.cellulare.$modelValue.indexOf('*') !== -1) {
            self.errorAsterisk = true;
            return;
          } else {
            self.errorAsterisk = false;
          self.otp = true;}

        }else {
          self.otp = true;
        }
      };

      self.mostraOtpModificaPassword = function() {
        if (self.nuovaPasswordValue !== self.confermaNuovaPasswordValue) {
          self.passwordDifferenti = true;
        }else {
          self.passwordDifferenti = false;
          self.otp = true;
        }
      };

      self.decodeTelefono = function(telefonoOscurato) {
        self.avvisoDaModificare[0].listaSmsDisponibili.forEach(function(telefono) {
          if (telefonoOscurato === telefono.recapitoOscurato) {
            self.telefonoNonOscurato.push(telefono.recapito);
          }else {
            self.telefonoNonOscurato.push(null);
          }
        });
      };

      self.carouselChange = function(index) {
        if (angular.isDefined(index)) {
          $timeout(function() {
            self.resetRisultati();
            self.caricaAvvisi();
          });
        }
      };

      self.resetRisultati = function() {
        self.avvisi = [];
        self.booleanSms = [];
        self.booleanMail = [];
        self.recapiti = [];
        self.email = [];
        self.otp = false;
        self.mail = [];
        self.sms = [];
        self.recapiti = [];
        self.booleanSms = [];
        self.booleanMail = [];
        self.mailModificate = [];
        self.recapitiModificati = [];
        self.descrizioniModificate = [];
        self.telefonoNonOscurato = [];
        self.importo = [];

      };

      self.editRecapiti = function() {

        var celStar = self.anagrafica.recapito.cellulare;
        if (celStar.length > 8) {
          celStar = self.anagrafica.recapito.cellulare.substring(0, 3);
          celStar += '****' + self.anagrafica.recapito.cellulare.substring(8);
        }
        self.recapitoModificato = false;
        self.residenzaModificata = false;

        self.recapitoDaModificare = {};
        angular.copy(self.anagrafica.recapito, self.recapitoDaModificare);
        console.log('celStar', celStar);
        self.recapitoDaModificare.cellulare = celStar;
        console.log(' self.recapitoDaModificare.cellulare ', self.recapitoDaModificare.cellulare);

        self.otp = false;
        console.log('  self.recapitoDaModificare ', self.recapitoDaModificare);
        $state.go('profilo.editRecapiti');
      };
      self.editIndirizzo = function() {

        self.recapitoModificato = false;
        self.residenzaModificata = false;

        self.indirizzoDaModificare = {};
        angular.copy(self.anagrafica.residenza, self.indirizzoDaModificare);
        self.otp = false;
        console.log('  self. indirizzoDaModificare ', self.indirizzoDaModificare);
        $state.go('profilo.editIndirizzo');
      };

      self.modificaIndirizzi = function() {

        console.log('MODIIFCA RESIDENZA');
        console.log('self.codiceDispositivo ', self.codiceDispositivo);

        self.recapitoModificato = false;
        self.residenzaModificata = false;
        profiloService.modificaIndirizzi(self.indirizzoDaModificare, self.codiceDispositivo).then(function() {
          self.residenzaModificata = true;
          self.anagrafica.residenza = self.indirizzoDaModificare;
          $state.go('profilo');
        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });
      };

      self.modificaRecapiti = function() {
        console.log('MODIIFCA RECAPITI');

        self.recapitoModificato = false;
        self.residenzaModificata = false;
        var rec = {};
        angular.copy(self.recapitoDaModificare, rec);
        if (self.formModificaRecapiti.telefono.$dirty === false) {
          rec.telefono = '';
        }
        if (self.formModificaRecapiti.cellulare.$dirty === false) {
          rec.cellulare = '';
        }
        if (self.formModificaRecapiti.email.$dirty === false) {
          rec.email = '';
        }
        console.log('pre chiamata servizio in modificaRecapiti');
        profiloService.modificaRecapiti(rec, self.codiceDispositivo).then(function() {
            self.recapitoModificato = true;
            self.otp = false;
            self.anagrafica.recapito = self.recapitoDaModificare;
            $state.go('profilo.show');

          }).catch(function(errore) {
            self.otp = false;
            $exceptionNotifier(errore);
          });
      };

      self.richiediFirma = function() {
        // self.token = profiloService.richiediToken();

        profiloService.richiediUrlFea().then(function(url) {
          self.urlFEA = url;
        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });
      };

      self.annullaModificaLimiti = function() {
        self.otp = false;
        annullaDispositivaService.annullaDispositiva('LIMITI', self.limite.key).then(function() {
          console.log('Servizio di annulla ok');
          $state.go('profilo.limitiImporto');
        }).catch(function(errore) {
            self.otp = false;
            $exceptionNotifier(errore);
          });

      };
      self.annullaModificaPassword = function() {
        if (self.otp) {
          self.otp = false;
          self.passwordModificata = false;
          self.otp = false;
          self.nuovaPassword = '';
          self.nuovaPasswordValue = '';
          self.confermaNuovaPassword = '';
          self.confermaNuovaPasswordValue = '';
          self.vecchiaPassword = '';
          self.modificaPasswordForm.$setPristine();
        }else {
          self.otp = false;
          $state.go('home');
        }

      };
      self.cellDecodificato = function() {
        self.celDecodificato = self.recapitoDaModificare.cellulare;
        $state.go('profilo.limitiImporto');
      };
      /*****END CONTROLLER****/

    }]);

});
