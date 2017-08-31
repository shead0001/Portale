define([
  'angular',
  'ib'
], function(angular) {

  /**
   * Espone l'oggetto di helper per la gestione del lazy loading di intere micro-applicazioni.
   * @namespace $subapp
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('$subapp', [
    '$rootScope',
    '$translate',
    '$translatePartialLoader',
    '$ocLazyLoad',
    function($rootScope, $translate, $translatePartialLoader, $ocLazyLoad) {

      var service = {};

      /**
       * Carica lamicro-applicazione specificata attraverso requirejs e la relativa soluzione delle dipendenze.
       * @param   {string} subapp Nome del modulo da caricare (identico al nome della cartella in /src/)
       * @returns {Promise} Promise risolta al completo caricamento di tutti le dipendenze di modulo
       *                    e l'esecuzione dell'entrypoint subapp/module.js.
       * @memberOf ng.services.$subapp
       */
      service.load = function(subapp) {

        if (subapp !== 'common') {
          var subappStateMatcher = new RegExp('^' + subapp + '\\b');

          // registra evento per attivazione/disattivazione del dizionario (performance)
          //TODO: disattivare listener nel caso di implementazione di un reale unload di subapp
          $rootScope.$on('$stateChangeStart', function(evt, toState/*, toParams, fromState, fromParams*/) {
            if (subappStateMatcher.test(toState.name) === false) {
              $translatePartialLoader.deletePart(subapp);
            } else {
              $translatePartialLoader.addPart(subapp);
            }
            return $translate.refresh();
          });
        }

        // registrazione dizionario i18n di subapp (l'effettivo caricamento avviene durante il prossimo $translate)
        $translatePartialLoader.addPart(subapp);
        return $translate.refresh().then(function() {
          // avvia lazy load
          return $ocLazyLoad.load(subapp + '/module');
        });

      };

      return service;

    }
  ]);

});
