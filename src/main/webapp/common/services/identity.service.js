define([
  'angular',
  'ib'
], function(angular, ib) {

  angular.module('ib').run([
    function() {
      if (ib.mock.rest) {
        ib.injector.get('$httpMock').when('GET', ':login/rest/utente/ping').respond(200, {
          result: {
            token: 'AAASDFGHJKLòàsdfgtgb2345v',
            nomeUtente: 'Valentina',
            cognomeUtente: 'Capoccia',
            dataUltimoAccesso: '22/01/2016',
            ruolo: 'LOGINOK'
          }
        });
        ib.injector.get('$httpMock').when('GET', ':login/rest/utente/logout').respond(200, {
          result: {
            esito: 'ok'
          }
        });
        ib.injector.get('$httpMock').when('POST', /^:login\/rest\/utente\/loginAutomatica$/).respond(200, {
          result: {
            token: 'AAASDFGHJKLòàsdfgtgb2345v',
            nomeUtente: 'Valentina',
            cognomeUtente: 'Capoccia',
            dataUltimoAccesso: '22/01/2016'
          }
        });
        ib.injector.get('$httpMock').when('POST', /^:login\/rest\/utente\/login\?seed=.+$/).respond(200, {
          result: {
            token: 'AAASDFGHJKLòàsdfgtgb2345v',
            nomeUtente: 'Valentina',
            cognomeUtente: 'Capoccia',
            dataUltimoAccesso: '22/01/2016',
            ruolo: 'LOGINOK'
          }
        });
      }
    }
  ]);

  // attivo il supporto per l'autoredirect verso la pagina di login qualora l'utente non sia autenticato
  angular.module('ib').run([
    '$rootScope',
    '$location',
    '$urlRouter',
    '$timeout',
    '$identity',
    function($rootScope, $location, $urlRouter, $timeout, $identity) {

      // monitoro/blocco la navigazione mantenendo l'url iniziale da visualizzare dopo il login
      $rootScope.$on('$locationChangeStart', function(e) {
        var url = $location.url();
        // intervengo (e blocco la navigazione) solo se l'utente non è autenticato ma consento
        // il caricamento delle pagine di login
        if (!$identity.isAuthenticated && url.indexOf('/login') !== 0) {
          // avvio il processo di validazione della login
          $identity.validateLogin().then(function() {
            // ad autenticazione completata riporto l'utente sull'url inizialmente richiesto o su /home
            var redirect = (url.indexOf('/login') !== 0) ? url : ('/home');
            $location.url(redirect);
            $urlRouter.sync();
          });
          // annullo la navigazione
          e.preventDefault();
        }
      });

    }
  ]);

  /**
   * Espone l'oggetto di helper per la gestione dell'identity e dell'autenticazione utente.
   * @namespace $identity
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('$identity', [
    '$rootScope',
    '$location',
    '$timeout',
    '$q',
    '$http',
    'session',
    '$state',
    function($rootScope, $location, $timeout, $q, $http, session, $state) {

      var service = {};

      /**
       * Gestisce l'esito restituito dal server durante la login o la verifica della sessione con token.
       * @memberOf ng.services.$identity
       * @param {object} data Dati parziali o completi restituiti dal sistema di login come
       *                      previsto da API.
       */
      service.handleLogin = function(data) {
        console.log('DATI DI HANDLE', data);
        console.log('********* RUOLO HANDLE***********', data.ruolo);

        // memoizza i dati di sessione nella variabile session di angular
        session.token = data.token || session.token;
        service.ruolo = data.ruolo || service.ruolo;
        service.profiloNome = data.nomeUtente || service.profiloNome;
        service.profiloCognome = data.cognomeUtente || service.profiloCognome;
        service.dataUltimoAccesso = (data.dataUltimoAccesso) ?
          new Date(data.dataUltimoAccesso) : service.dataUltimoAccesso;

        // memorizza nel localstorage del browser il token per consentire la condivisione della sessione tra finestre
        if (window.localStorage) {
          localStorage.setItem('token', session.token);
        }

        // verifica lo stato di login attuale (step ovvero ruolo)
        /*switch (service.ruolo) {
          case 'SETPSW':
            $state.go('login.impostaPassword');
            break;
          case 'CHANGEPSW':
            $state.go('login.modificaPassword');
            break;
          case 'CHECKOTP':
            $state.go('login.otp');
            break;
          case 'LOGINOK':
            // segnala e memorizza l'effettivo login effettuato
            service.isAuthenticated = true;
            $rootScope.$emit('$identityLogin');
            break;
          default:
            console.error('supporto per ruolo %s non implementato', service.ruolo);
            break;
        }*/
            service.isAuthenticated = true;
            $rootScope.$emit('$identityLogin');

      };

      /**
       * Assicura che l'utente abbia eseguito completamente il processo di login. Nel caso di token memorizzato
       * precedentemente, verifica e ripristina la sessione autenticata in modo trasparente all'utente.
       * @memberOf ng.services.$identity
       * @returns {Promise} Ritorna una promise che viene risolta al solo completamento del processo di login.
       */
      service.validateLogin = function() {

        // creo una promise che risolverò al solo completamento dell'autenticazione
        // (attraverso l'emit dell'evento $idendityLogin)
        var deferred = $q.defer();
        var resolve = function() {
          $rootScope.$off('$identityLogin', resolve);
          deferred.resolve();
        };
        $rootScope.$on('$identityLogin', resolve);
        /*
        // se non ho un token salvato precedentemente faccio redirect su pagina login
        if (!session.token) {
          $location.url('/login');
        } else {
          // provo a verificare che il token sia ancora valido per la login
          $http.get(':login/rest/utente/ping').then(function(res) {
            // gestisco i dati ricevuti dal server
            service.handleLogin(res.data.result);
          }).catch(function() {
            //distruggo il token e faccio redirect su pagina login
            session.token = null;
            if (window.localStorage) {
              localStorage.removeItem('token');
            }
            $location.url('/login');
          });
        }*/
          
        $http.get(':login/rest/utente/ping').then(function(res) {
            // gestisco i dati ricevuti dal server
            service.handleLogin(res.data.result);
          }).catch(function() {
            //distruggo il token e faccio redirect su pagina login
            session.token = null;
            if (window.localStorage) {
              localStorage.removeItem('token');
            }
            $location.url('/login');
          });

        return deferred.promise;

      };

      /**
       * Inoltra la richiesta di login al server in ase ai parametri di autenticazione immessi dall'utente.
       * @memberOf ng.services.$identity
       * @param   {string} codiceCliente Codice utente nel formato specificato nelle API.
       * @param   {string} dataNascita   Data di nascita dell'utente nel formato DD/MM/YYYY
       * @param   {string} pin           Codice di accesso numerico a 5 cifre.
       * @param   {string} seed          Codice randomico generato per garantire la sicurezza nella generazione del pin.
       * @returns {Promise} Restituisce una promise che si risolve nel momento in cui il server ha restituito un'esito.
       *                    Non assicura il completamento del processo di login.
       */
      service.executeLogin = function(codiceCliente, dataNascita, pin, seed) {
        console.log('SONO IN IDENTITY SERVICE');
        var deferred = $q.defer();
        console.log('SEED', seed);

        // richiedo l'esecuzione della login utente (il parametro seed è randomico)
        $http.post(':login/rest/utente/login', {
          codiceCliente: codiceCliente,
          dataNascita: dataNascita,
          pin: pin
        }, {
          params: {
            seed: seed
          }
        }).then(function(res) {
          // gestisco i dati ricevuti dal server
          service.handleLogin(res.data.result);
          deferred.resolve();
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      service.executeLoginAutomaticamente = function(codiceCliente) {
        console.log('SONO IN IDENTITY SERVICE login automaticamente ', codiceCliente);
        var deferred = $q.defer();
        var dataNascita;
        var pin;
        if (codiceCliente === '8717362-27') {
          dataNascita = '11091977';
          pin = '54321';

        }
        if (codiceCliente === '5708377-02') {
          dataNascita = '05041965';
          pin = '12345';

        }
        if (codiceCliente === '10182165502') {
          dataNascita = '31031971';
          pin = '54321';

        }
        if (codiceCliente === '3096572-03') {
          dataNascita = '08051967';
          pin = '12345';

        }
        if (codiceCliente === '3656165-02') {
          dataNascita = '08051967';
          pin = '12345';

        }
        console.log('data nascita ', dataNascita);

        $http.post(':login/rest/utente/loginAutomatica', {
          codiceCliente: codiceCliente,
          dataNascita: dataNascita,
          pin: pin
        }).then(function(res) {
          console.log('sono in res ', res.data.result);
          service.handleLogin(res.data.result);
          deferred.resolve();
        }).catch(function(errore) {
          deferred.reject(errore);
        });

        return deferred.promise;
      };

      /**
       * Esegue il logout sia lato server (best effort) che lato client e procede al riavvio dell'applicazione.
       * @memberOf ng.services.$identity
       * @returns {Promise} Restituisce una promise che si risolve immediatamente prima il
       *                    ricaricamento dell'applicazione e dopo la distruzione del token.
       */
      service.logout = function() {
        var deferred = $q.defer();

        // esegue effettivamente il login lato client
        var executeLogout = function() {
          service.isAuthenticated = false;
          $rootScope.$emit('$identityLogout');

          if (window.localStorage) {
            localStorage.removeItem('token');
          }
          session.token = null;
          deferred.resolve();

          // ricarico l'applicazione
          location.href = ib.baseUrl;
        };

        // segnala la richiesta di logout al server e blocca la navigazione
        $http.get(':login/rest/utente/logout').then(executeLogout).catch(executeLogout);
        service.isAuthenticated = false;

        return deferred.promise;
      };

      /**
       * Stato di autenticazione dell'utente. È true se il processo di login è stato completato con successo.
       * @memberOf ng.services.$identity
       */
      service.isAuthenticated = false;

      // forza il ridisegno di eventuali proprietà di scope angular variate durante la login
      $rootScope.$on('$identityLogin', function() {
        $timeout(function() {
          $rootScope.$digest();
        });
      });

      return service;

    }
  ]);

});
