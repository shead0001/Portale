define([
  'angular',
  'ib'
], function(angular) {

  /**
   * Espone il servizio di helper per la gestione del componente tutorial (disponibile solo dopo il bootstrap).
   * @namespace $tutorial
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('$tutorial', [
    '$rootScope',
    function($rootScope) {

      var service = {};

      // memorizza lo stato di attivazione del tutorial (privato)
      var _active = false;

      /**
       * Avvia il tutorial.
       * @function start
       * @memberOf ng.services.$tutorial
       */
      service.start = function() {
        if (_active === false) {
          /**
           * Segnala l'imminente avvio del tutorial (l'interfaccia non ha ancora subito variazioni).
           *
           * @event $tutorialBefore
           * @memberOf ng.services.$tutorial
           */
          $rootScope.$emit('$tutorialBefore');
          window.bootstro.start('.bootstro', {
            nextButton: '<button class="btn btn-custom btn-mini bootstro-next-btn" title="Avanti">' +
            '<i class="fa fa-angle-double-right"></i></button>',
            prevButton: '<button class="btn btn-custom btn-mini bootstro-prev-btn" title="Indietro">' +
            '<i class="fa fa-angle-double-left"></i></button>',
            finishButton: '<button class="btn btn-custom btn-mini bootstro-finish-btn" title="Chiudi">' +
            'Ok! Ho capito.</button>',
            onExit: function(params) {
              /**
               * Segnala la chiusura del tutorial interattivo.
               *
               * @event $tutorialStop
               * @memberOf ng.services.$tutorial
               * @type {object}
               * @property {string} idx Indice dell'ultimo step visualizzato.
               */
              $rootScope.$emit('$tutorialStop', params);
              _active = false;
            },
            /**
             * Segnala il completamento di tutti gli step del tutorial interattivo.
             *
             * @event $tutorialComplete
             * @memberOf ng.services.$tutorial
             * @type {object}
             * @property {string} idx Indice dell'ultimo step visualizzato.
             */
            onComplete: function(params) {
              $rootScope.$emit('$tutorialComplete', params);
            },
            /**
             * Segnala la navigazione dell'utente tra step del tutorial interattivo.
             *
             * @event $tutorialStep
             * @memberOf ng.services.$tutorial
             * @type {object}
             * @property {string} idx Indice dello step visualizzato attualmente.
             * @property {string} direction Stringa indicante la direzione di navigazione (next o prev).
             */
            onStep: function(params) {
              $rootScope.$emit('$tutorialStep', params);
            }
          });
          /**
           * Segnala l'avvio del tutorial interattivo.
           *
           * @event $tutorialStart
           * @memberOf ng.services.$tutorial
           */
          $rootScope.$emit('$tutorialStart');
          _active = true;
        }
      };

      /**
       * Ferma il tutorial.
       * @function stop
       * @memberOf ng.services.$tutorial
       */
      service.stop = function() {
        if (_active === true) {
          window.bootstro.stop();
          _active = false;
        }
      };

      /**
       * Restituisce lo stato attuale di attivazione del tutorial (read only). [Non si può utilizzare per il bind.]
       * @name active
       * @memberOf ng.services.$tutorial
       * @type {string}
       */
      Object.defineProperty(service, 'active', {
        get: function() {
          return _active;
        }
      });

      return service;

    }
  ]);

  angular.module('ib').run([
    '$rootScope',
    '$tutorial',
    '$state',
    function($rootScope, $tutorial) {

      $rootScope.$on('$stateChangeStart', function(/*event, toState, toParams, fromState, fromParams*/) {

        if ($tutorial.active === true) {
          $tutorial.stop();
        }

      });
    }
  ]);

});
