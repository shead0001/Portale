define('ib', [
  'angular',
  'require',
  'util',
  'env'
], function(angular, require, util) {

  /**
   * Modulo globale per l'accesso all'applicazione angular e oggetti relativi globali.
   * @namespace ib
   * @memberOf require
   */
  var ib = {};

  /**
   * Stato modalità di sviluppo (inizializzata all'avvio dell'applicazione).
   * <br>L'attivazione gestisce:
   * <br>  * esposizione oggetto ib su oggetto globale (window)
   * <br>  * attivazione/disattivazione console output
   * @name develop
   * @memberOf require.ib
   * @type {boolean}
   */
  ib.develop = false;

  /**
   * Espone la base URI dell'applicazione.
   * @name baseUrl
   * @memberOf require.ib
   * @type {string}
   */
  ib.baseUrl = $('base').attr('href');

  /**
   * Configurazione servizi applicativi.
   */
  ib.settings = {
    /**
     * Configurazione servizi relativi alla gestione del token di sessione.
     */
    token: {
      /**
       * Consente di definire il timeout entro cui mantenere il token in storage (supporto refresh).
       */
      expire: 3000
    },
    /**
     * Configurazione servizi relativi alle chiamate HTTP.
     */
    http: {
      /**
       * Consente di definire il timeout globale per le richieste HTTP eseguite tramite il servizio $http.
       */
      timeout: 180 * 1000
    }
  };

  /**
   * Configurazione modalità di mock (inizializzata all'avvio dell'applicazione).
   * @namespace mock
   * @memberOf require.ib
   * @type {Object}
   */
  ib.mock = {
    /**
     * Stato attivazione modalità di mock per servizi applicativi REST.
     * @name rest
     * @memberOf require.ib.mock
     * @type {boolean}
     */
    rest: true,
    /**
     * Consente di disattivare programmaticamente il mock per specifici prefissi degli URI dinamici
     * @name passthrough
     * @memberOf require.ib.mock
     * @type {object}
     */
    passthrough: {},
    /**
     * Latenza di rete simulata in modalità di mock per servizi applicativi REST.
     * @name latency
     * @memberOf require.ib.mock
     * @type {integer}
     */
    latency: 0,

    memwatch: {
      enable: true,
      intervals: {
        watchdog: 15000,
        gc: 5000
      },
      conditions: {
        growth: 10,
        allowed: 0.005
      }
    }

  };


  // override delle funzioni di console per disattivazione programmatica tramite ib.develop
  /*if (!ib.develop) {
    (function(console) {
      console._native = {};
      ['debug', 'log', 'info', 'dir', 'warn', 'error'].forEach(function(level) {
        console._native[level] = console[level];
        console[level] = function() {
          if (ib.develop) {
            console._native[level].apply(console, arguments);
          }
        };
      });
    })(console);
  }*/

  /**
   * Dipendenze angular da iniettare alla definizione del modulo
   * @type {string[]}
   */
  var deps = [
    'config',
    'ngAnimate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ngSanitize',
    'highcharts-ng',
    'tmh.dynamicLocale',
    'ng.httpLoader',
    'datatables',
    'ngMessages',
    'ui.select'
  ];
  if (ib.mock.rest) {
    deps.push('ngMockE2E');
  }

  /**
   * Modulo angular.module('ib') globale.
   * @namespace ib
   * @memberOf ng.modules
   */
  var app = angular.module('ib', deps);

  /**
   * Modulo globale angular.module('ib') inizializzato all'avvio.
   * @name module
   * @memberOf require.ib
   * @type {object}
   */
  ib.module = app;

  /**
   * Costante angular per lo storage temporaneo dei dati di sessione.
   * @namespace session
   * @memberOf ng.constants.ib
   * @type {Object}
   */
  ib.module.constant('session', {

    /**
     * Token utilizzato per le comunicazioni stateless con il server.
     * <br> Viene memorizzato nel localStorage per persistenza lato client.
     * @name token
     * @memberOf ng.constants.ib.session
     * @type {string}
     */
    token: (window.localStorage) ? localStorage.getItem('token') : undefined

  });

  /**
   * Costante angular per lo storage temporaneo dei dati applicativi.
   * <br> La gestione è demandata alle differenti implementazioni dei service.
   * @namespace cache
   * @memberOf ng.constants.ib
   * @type {Object}
   */
  ib.module.constant('cache', {});

  // definizione gestore traduzione circolare (è possibile mantenere lingua primaria come chiave)
  ib.module.factory('circularTranslationHandler', function() {
    return function(translationID/*, uses*/) {
      return translationID;
    };
  });

  // configurazione iniziale del modulo angular
  ib.module.config([
    'env',
    '$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    '$translateProvider',
    '$locationProvider',
    '$translatePartialLoaderProvider',
    'tmhDynamicLocaleProvider',
    'httpMethodInterceptorProvider',
    function(env, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider,
              $translateProvider, $locationProvider, $translatePartialLoaderProvider,
              tmhDynamicLocaleProvider, httpMethodInterceptorProvider) {

      // caricamento configurazione passthrough da configurazione di ambiente
      ib.mock.passthrough = env.passthrough;

      // configurazione translate con supporto dizionari parziali
      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/i18n/{lang}.json'
      });

      // attivazione gestore traduzione circolare
      $translateProvider.useMissingTranslationHandler('circularTranslationHandler');

      // attivazione sanitizer per sicurezza sulla malicious injection
      $translateProvider.useSanitizeValueStrategy('escape');

      // configurazione lazy loader (in base a modalità di debug)
      $ocLazyLoadProvider.config({
        //debug: ib.develop,
        //events: ib.develop
      });

      // configurazione percorso file i18n per locale dinamico
      tmhDynamicLocaleProvider.localeLocationPattern('common/lib/angular/i18n/angular-locale_{{locale}}.js');

      // attivazione loader per chiamate http (corrente e ogni chiave del restmap)
      // httpMethodInterceptorProvider non riceve la richiesta risolta dagli URI dinamici
      httpMethodInterceptorProvider.whitelistDomain(location.hostname);
      Object.keys(env.restmap).forEach(function(name) {
        httpMethodInterceptorProvider.whitelistDomain(name);
        //httpMethodInterceptorProvider.whitelistDomain(env.restmap[name]);
      });

      // attivazione del supporto pushState per URI assoluti
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
        rewriteLinks: true
      });
    }]);

  if (ib.mock.rest) {
    // implementazione supporto REST dinamici nel mock $httpBackend
    ib.module.service('$httpMock', ['env', function(env) {
      var proxy = {};
      var fake_return = {respond: function() {}};
      proxy.when = function(method, url, data, headers, keys) {
        var $httpBackend = ib.injector.get('$httpBackend');
        var prefix = null;
        var mock_url = url;
        if (typeof mock_url === 'string') {
          prefix = (mock_url.match(util.resolveUri.regexp.map) || [])[1];
          mock_url = util.resolveUri(mock_url, env.restmap);
        } else if (typeof mock_url === 'object' && mock_url && mock_url.constructor === RegExp) {
          var cusp = false;
          if (mock_url.source[0] === '^') {
            cusp = true;
          }
          var inner_source = mock_url.source.substring((cusp) ? 1 : 0);
          prefix = (inner_source.match(util.resolveUri.regexp.map) || [])[1];
          var source = util.resolveUri(inner_source, env.restmap);
          var flags = ((mock_url.global === true) ? 'g' : '') +
              ((mock_url.multiline === true) ? 'm' : '') +
              ((mock_url.ignoreCase === true) ? 'i' : '');
          mock_url = new RegExp(((cusp) ? '^' : '') + source, flags);
        }
        if (prefix && ib.mock.passthrough[prefix] === true) {
          $httpBackend.when(method, mock_url).passThrough();
          return fake_return;
        } else {
          return $httpBackend.when(method, mock_url, data, headers, keys);
        }
      };
      return proxy;
    }]);

    // implementazione simulazione latenza di rete nei mock HTTP
    ib.module.config(['$provide', function($provide) {
      $provide.decorator('$httpBackend', ['$delegate', function($delegate) {
        var proxy = function(method, url, data, callback, headers, timeout, withCredential, responseType) {
          var interceptor = function() {
            var _this = this;
            var _arguments = arguments;
            setTimeout(function() {
              callback.apply(_this, _arguments);
            }, ib.mock.latency);
          };
          return $delegate.call(this, method, url, data, interceptor, headers, timeout, withCredential, responseType);
        };
        for (var key in $delegate) {
          proxy[key] = $delegate[key];
        }
        return proxy;
      }]);
    }]);
  }

  // exposing global app instances and initializing objects
  ib.module.run([
    '$q',
    '$injector',
    'env',
    '$ocLazyLoad',
    '$rootScope',
    'tmhDynamicLocale',
    '$language',
    '$state',
    '$subapp',
    '$tutorial',
    '$identity',
    '$navigator',
    '$location',
    function($q, $injector, env, $ocLazyLoad, $rootScope, tmhDynamicLocale,
              $language, $state, $subapp, $tutorial, $identity, $navigator, $location) {


      // esposizione oggetti angular globali
      /**
       * Espone l'injector globale del modulo 'ib'.
       * @name injector
       * @memberOf require.ib
       * @type {Object}
       * @see {@link https://docs.angularjs.org/api/auto/service/$injector}
       */
      ib.injector = $injector;

      // attivazione passthrough per http backend su chiamate non REST
      if (ib.mock.rest) {
        ib.injector.get('$httpBackend').when('GET', function(uri) {
          if (uri.indexOf('/rest/') === -1) {
            return true;
          }
          return false;
        }).passThrough();
      }

      /**
       * Espone il plugin jQuery per la gestione degli shortcut per la tastiera.
       * @name shortcuts
       * @memberOf require.ib
       * @see {@link http://www.stepanreznikov.com/js-shortcuts/}
       */
      ib.shortcuts = $.Shortcuts;
      ib.shortcuts.start();

      /**
       * Espone il servizio di lazy load globale del modulo 'ib'.
       * @name lazyLoad
       * @memberOf require.ib
       * @type {ng.services.$ocLazyLoad}
       * @see {@link https://oclazyload.readme.io/docs/oclazyload-service}
       */
      ib.lazyLoad = $ocLazyLoad;

      /**
       * Espone il rootScope di globale del modulo 'ib' (disponibile solo dopo il bootstrap).
       * @namespace rootScope
       * @memberOf require.ib
       * @type {Object}
       * @see {@link https://docs.angularjs.org/api/ng/service/$rootScope}
       */
      ib.rootScope = $rootScope;

      /**
       * Implementa il metodo $off per rimuovere un listener da un evento.
       * @function $off
       * @memberOf require.ib.rootScope
       * @param {string} eventName Nome dell'evento da cui rimuovere il listener.
       * @param {function} fn Funzione listener precedentemente allo stack di propagazione dell'evento.
       * @see {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope#on}
       */
      $rootScope.constructor.prototype.$off = function(eventName, fn) {
        if (this.$$listeners) {
          var eventArray = this.$$listeners[eventName];
          if (eventArray) {
            var index = eventArray.indexOf(fn);
            if (index > -1) {
              eventArray.splice(index, 1);
            }
          }
        }
      };

      /**
       * Espone il servizio $translate globale del modulo 'ib' (disponibile solo dopo il bootstrap).
       * @name translate
       * @memberOf require.ib
       * @type {Object}
       * @see {@link https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate}
       */
      ib.translate = $injector.get('$translate');

      /**
       * Espone il servizio $locale globale del modulo 'ib' (disponibile solo dopo il bootstrap).
       * @name locale
       * @memberOf require.ib
       * @type {Object}
       * @see {@link https://docs.angularjs.org/api/ng/service/$locale}
       */
      ib.locale = $injector.get('$locale');

      /**
       * Espone l'oggetto di helper per la gestione del lazy loading di intere micro-applicazioni.
       * @name subapp
       * @memberOf require.ib
       * @type {Object}
       * @see {@link ng.services.$subapp}
       */
      ib.subapp = $subapp;

      /**
       * Espone l'oggetto di helper per la gestione multilingua (disponibile solo dopo il bootstrap).
       * @name language
       * @memberOf require.ib
       * @type {Object}
       * @see {@link ng.services.$language}
       */
      ib.language = $language;

      // impostazione lingua predefinita
      ib.language.set(localStorage.getItem('lang') || 'it');


        /**
         * Espone lo state corrente del router.
         * @name state
         * @memberOf require.ib
         * @type {Object}
         * @see {@link http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state}
         */
        ib.state = $state;


      /**
         * Espone l'oggetto di helper per la gestione del tutorial (disponibile solo dopo il bootstrap).
         * @name tutorial
         * @memberOf require.ib
         * @type {Object}
         * @see {@link ng.services.$tutorial}
         */
      ib.tutorial = $tutorial;

      /**
         * Espone l'oggetto di helper per la gestione della login utente (disponibile solo dopo il bootstrap).
         * @name identity
         * @memberOf require.ib
         * @type {Object}
         * @see {@link ng.services.$identity}
         */
      ib.identity = $identity;

      /**
         * Espone l'oggetto di helper per la gestione dell'albero di navigazione (disponibile solo dopo il bootstrap).
         * @name navigator
         * @memberOf require.ib
         * @type {Object}
         * @see {@link ng.services.$navigator}
         */
      ib.navigator = $navigator;

      /**
         * Espone il servizio $location.
         * @name location
         * @memberOf require.ib
         * @type {Object}
         * @see {@link https://docs.angularjs.org/guide/$location}
         */
      ib.location = $location;

      return ib.subapp.load('common');

    }]);


    angular.element(document.body).ready(function() {

      var start = function() {

        $('#appcache-loader').hide();

        // recupero servizio generico $http per prime chiamate REST di inizializzazione (non include interceptors)
        //var $http = angular.bootstrap(null, []).get('$http');

        // caricamento dipendenze comuni di applicazione
        require([
          'common/directives/fieldmatch.directive.js',
          'common/directives/breadcrumb.directive.js',
          'common/directives/sidebar.directive.js',
          'common/controllers/global.controller.js',
          'common/services/jsonschema.service.js',
          'common/services/token.interceptor.js',
          'common/services/rest.interceptor.js',
          'common/services/timeout.interceptor.js',
          'common/services/cache.service.js',
          'common/services/identity.service.js',
          'common/services/navigator.service.js',
          'common/services/language.service.js',
          'common/services/subapp.service.js',
          'common/services/tutorial.service.js',
          'common/services/state.service.js',
          'common/services/exception.service.js',
          'common/services/event.service.js',
          'common/services/ui.service.js',
          'common/services/ricercheAnagrafica.service.js',
          'common/routes/global.route.js',
          'common/routes/lazy.route.js'
        ], function() {
          angular.bootstrap(document.body, ['ib'], {strictDi: true});
        });

      };

      // assicuro la corretta invalidazione appcache e ricarico l'applicazione quando la nuova versione è scaricata
      var appcache = window.applicationCache;
      if (appcache && appcache.status !== appcache.IDLE && appcache.status !== appcache.UNCACHED) {
        if (appcache.status === appcache.UPDATEREADY) {
          return location.reload();
        }
        $(appcache).on('progress', function(e) {
          e = e.originalEvent;
          $('#appcache-loader-progress').text(Math.round(e.loaded / e.total * 100) + '%');
        });
        $(appcache).on('updateready', function() {
          location.reload();
        });
        $(appcache).on('cached', function() {
          location.reload();
        });
        $(appcache).on('noupdate', function() {
          start();
        });
      } else {
        start();
      }

    });

    // rimozione token per forzare relogin alla riapertura del browser
    $(window).on('beforeunload', function() {
      if (window.localStorage) {
        localStorage.setItem('tabs', ((parseInt(localStorage.getItem('tabs')) || 1) - 1));
        if (parseInt(localStorage.getItem('tabs')) === 0) {
          localStorage.setItem('expireToken', Date.now() + ib.settings.token.expire);
        }
      }
    });


  return ib;

});
