define([
  'angular',
  'ib'
], function(angular) {

  /**
   * Espone il servizio di helper per la gestione multilingua (disponibile solo dopo il bootstrap).
   * @namespace $language
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('$language', [
    '$q',
    '$rootScope',
    '$translate',
    'tmhDynamicLocale',
    function($q, $rootScope, $translate, tmhDynamicLocale) {

      var service = {};

      // consente di evitare il primo emit dell'evento $languageChanged durante l'inizializzazione dell'applicazione
      var _initialized = false;

      /**
       * Consente di definire dei messaggi di servizio che sono già tradotti all'avvio dell'applicazione
       * (per utilizzo all'interno di funzioni sincrone).
       * @name _messageStore
       * @memberOf ng.services.$language
       */
      var _messageStore = {
        'Si sono verificati degli errori nel server': null,
        'Si è verificato un errore': null,
        'Si è verificato un errore nella comunicazione con il server': null,
        'Si è verificato un errore nel client': null
      };

      // esegue la traduzione dei messaggi statici
      var _refreshMessageStore = function() {
        return $translate(Object.keys(_messageStore)).then(function(dict) {
          _messageStore = dict;
        });
      };

      /**
       * Imposta e salva la lingua corrente. Emette l'evento $languageChanged.
       * @function set
       * @memberOf ng.services.$language
       */
      service.set = function(lang) {
        return $q.all([
          $translate.use(lang),
          tmhDynamicLocale.set(lang),
          (function() {
            var deferred = $q.defer();
            require(
              ['common/lib/bootstrap-datepicker/locales/bootstrap-datepicker.' + lang + '.min.js'],
              function() {
                deferred.resolve();
              });
            return deferred.promise;
          })(),
          _refreshMessageStore()
        ]).then(function() {
          return $translate.refresh().then(function() {
            localStorage.setItem('lang', lang);
            service.current = lang;
            if (_initialized) {
              /**
               * Segnala il cambiamento della lingua.
               *
               * @event $languageChanged
               * @memberOf ng.services.$language
               * @type {object}
               * @property {string} lang Codice lingua selezionata a livello applicativo.
               */
              $rootScope.$emit('$languageChanged', {lang: lang});
            } else {
              _initialized = true;
            }
          });
        });
      };

      /**
       * Lingua selezionata nell'applicazione.
       * @name current
       * @memberOf ng.services.$language
       * @type {string}
       */
      service.current = localStorage.getItem('lang') || 'it';

      /**
       * Restituisce il testo dei messaggi di servizio tradotti all'avvio dell'applicazione
       * (per utilizzo all'interno di funzioni sincrone).
       * @returns {string} Ritorna il messaggio nella lingua corrente.
       */
      service.getMessage = function(message) {
        return _messageStore[message];
      };

      // assicuro che i messaggi statici siano tradotti
      $rootScope.$on('$languageChanged', function() {
        _refreshMessageStore();
      });

      return service;

    }
  ]);

});
