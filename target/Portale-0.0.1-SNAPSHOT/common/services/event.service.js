/*eslint no-loop-func: 0*/
define([
  'angular',
  'ib'
], function(angular) {

  /**
   * Espone l'oggetto di helper per la gestione degli eventi con associazione agli state di routing.
   * @namespace $eventManager
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('$eventManager', ['$rootScope', function($rootScope) {

    var service = {};

    // memorizza gli oggetti di configurazione di eventi e stati
    var store = {
      staging: {
        /*
          'stateName': [
              {
                eventName
                listener
              }
          ]
        */
      },
      mounted: {
        /*'stateName': {
            {
              eventName
              listener
            }
        }*/
      }
    };

    /**
     * Registra un event listener e lo associa ad uno state di routing.
     * @memberOf ng.services.$eventManager
     * @throws {Error} Genera eccezione se i parametri non rispondono alle specifiche di tipo.
     * @param   {string} eventName   Nome dell'evento a cui appendere il listener.
     * @param   {function} listener  Funzione listener che sarà eseguita all'emissione dell'evento.
     * @param   {string} stateName   Nome dello state di routing a cui associare l'event listener.
     * @param   {function} autoDispose Se true, l'event listener viene rimosso completamente alla navigazione
     *                                 all'esterno e non disattivato/riattivato.
     * @returns {function} Funzione $eventManager.unregister con incorporati dati
     *                     per la rimozione del listener dallo stack.
     */
    service.register = function(eventName, listener, stateName, autoDispose) {

      console.log('register', eventName, stateName);

      if (arguments.length === 2) {
        return $rootScope.$on(eventName, listener);
      }

      if (typeof eventName !== 'string' ||
          typeof listener !== 'function' ||
          typeof stateName !== 'string' ||
          (autoDispose) ? (typeof autoDispose !== 'boolean') : false
         ) {
        throw new Error('wrong parameters passed in $eventManager.register for event "' + eventName + '"');
      }

      var listenerStateObject = {
        listener: listener,
        eventName: eventName
      };
      if (autoDispose) {
        listenerStateObject.autoDispose = true;
      }

      store.mounted[stateName] = store.mounted[stateName] || [];

      store.mounted[stateName].push(listenerStateObject);

      $rootScope.$on(eventName, listener);

      return service.unregister.bind(service, eventName, listener, stateName);

    };

    /**
     * Attiva un event listener per uno state di routing.
     * @memberOf ng.services.$eventManager
     * @param {string} eventName Nome dell'evento a cui è stato appeso il listener.
     * @param {function} listener Funzione listener che è stata appesa all'evento.
     * @param {string} stateName Nome dello stato a cui è stato associato il listener.
     */
    service.enable = function(eventName, listener, stateName) {

      console.log('enable', eventName, stateName);

      if (typeof eventName !== 'string' ||
          typeof listener !== 'function' ||
          typeof stateName !== 'string') {
        throw new Error('wrong parameters passed in $eventManager.unregister for event "' + eventName + '"');
      }

      var listenerStateObjectToEnable;

      if (store.staging[stateName]) {
        store.staging[stateName] = store.staging[stateName].filter(function(listenerStateObject) {
          if (listenerStateObject.listener === listener && listenerStateObject.eventName === eventName) {
            listenerStateObjectToEnable = listenerStateObject;
            return false;
          }
          return true;
        });
      }

      if (listenerStateObjectToEnable) {
        store.mounted[stateName] = store.mounted[stateName] || [];
        store.mounted[stateName].push(listenerStateObjectToEnable);
      }

      $rootScope.$on(eventName, listener);

    };

    /**
     * Disabilita un event listener per uno state di routing.
     * L'event listener viene mantenuto nello store interno per riattivazione successiva.
     * @memberOf ng.services.$eventManager
     * @param {string} eventName Nome dell'evento a cui è stato appeso il listener.
     * @param {function} listener Funzione listener che è stata appesa all'evento.
     * @param {string} stateName Nome dello stato a cui è stato associato il listener.
     */
    service.disable = function(eventName, listener, stateName) {

      console.log('disable', eventName, stateName);

      if (typeof eventName !== 'string' ||
          typeof listener !== 'function' ||
          typeof stateName !== 'string') {
        throw new Error('wrong parameters passed in $eventManager.unregister for event "' + eventName + '"');
      }

      var listenerStateObjectToDisable;

      if (store.mounted[stateName]) {
        store.mounted[stateName] = store.mounted[stateName].filter(function(listenerStateObject) {
          if (listenerStateObject.listener === listener && listenerStateObject.eventName === eventName) {
            listenerStateObjectToDisable = listenerStateObject;
            return false;
          }
          return true;
        });
      }

      if (listenerStateObjectToDisable) {
        store.staging[stateName] = store.staging[stateName] || [];

        store.staging[stateName].push(listenerStateObjectToDisable);
      }

      $rootScope.$off(eventName, listener);

    };

    /**
     * Rimuove un event listener da un evento e ripulisce i riferimento dallo store interno del servizio $eventManager.
     * @memberOf ng.services.$eventManager
     * @param {string} eventName Nome dell'evento a cui è stato appeso il listener.
     * @param {function} listener Funzione listener che è stata appesa all'evento.
     * @param {string} stateName Nome dello stato a cui è stato associato il listener.
     */
    service.unregister = function(eventName, listener, stateName) {

      console.log('unregister', eventName, stateName);

      if (arguments.length === 2) {
        return $rootScope.$off(eventName, listener);
      }

      if (typeof eventName !== 'string' ||
          typeof listener !== 'function' ||
          typeof stateName !== 'string') {
        throw new Error('wrong parameters passed in $eventManager.unregister for event "' + eventName + '"');
      }

      function remove(substore) {
        if (substore[stateName]) {
          substore[stateName] = substore[stateName].filter(function(listenerStateObject) {
            if (listenerStateObject.listener === listener && listenerStateObject.eventName === eventName) {
              return false;
            }
            return true;
          });
        }
      }

      remove(store.mounted);
      remove(store.staging);

      return $rootScope.$off(eventName, listener);

    };

    // implementa la gestione automatica di attivazione e disattivazione automatica
    // degli event listener alla navigazione tra state di routing
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

      var stateChangeSuccessQueue = [];
      var nameSplit;
      var currentName;

      if (fromState.name !== '') {
        nameSplit = fromState.name.split('.');
        currentName = nameSplit.shift();
        do {
          if (store.mounted.hasOwnProperty(currentName) && toState.name.indexOf(currentName) !== 0) {
            store.mounted[currentName].forEach(function(listenerStateObject) {
              if (listenerStateObject.autoDispose) {
                service.unregister(listenerStateObject.eventName, listenerStateObject.listener, currentName);
              } else {
                service.disable(listenerStateObject.eventName, listenerStateObject.listener, currentName);
              }
              if (listenerStateObject.eventName === '$stateChangeSuccess') {
                stateChangeSuccessQueue.push(listenerStateObject.listener);
              }
            });
          }
          if (nameSplit.length === 0) {
            break;
          }
          currentName += ('.' + nameSplit.shift());
        } while (true);
      }

      nameSplit = toState.name.split('.');
      currentName = nameSplit.shift();
      do {
        if (store.staging.hasOwnProperty(currentName)) {
          store.staging[currentName].forEach(function(listenerStateObject) {
            service.enable(listenerStateObject.eventName, listenerStateObject.listener, currentName);
            if (listenerStateObject.eventName === '$stateChangeSuccess') {
              stateChangeSuccessQueue.push(listenerStateObject.listener);
            }
          });
        }
        if (nameSplit.length === 0) {
          break;
        }
        currentName += ('.' + nameSplit.shift());
      } while (true);

      stateChangeSuccessQueue.forEach(function(listener) {
        listener(event, toState, toParams, fromState, fromParams);
      });

    });

    return service;

  }]);

});
