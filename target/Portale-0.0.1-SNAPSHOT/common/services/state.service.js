define([
  'angular',
  'ib'
], function(angular, ib) {

  angular.module('ib').run([
    '$rootScope',
    '$state',
    function($rootScope) {

      var emptyAcl = {
        'from': {
          //'allow': [],
          //'deny': []
        },
        'to': {
          //'allow': [],
          //'deny': []
        }
      };

      // gestisco l'inizio della navigazione per aggiungere supporto ACL
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        // assicuro che gli state coinvolti abbiano la struttura dati corretta per gli ACL
        if (!toState.acl || !toState.acl._ready) {
          toState.acl = angular.extend({}, emptyAcl, toState.acl);
          toState.acl._ready = true;
        }
        if (!fromState.acl || !fromState.acl._ready) {
          fromState.acl = angular.extend({}, emptyAcl, fromState.acl);
          fromState.acl._ready = true;
        }

        // verifica l'ok
        function isOK(aclStates, name) {
          if (Array.isArray(aclStates.deny)) {
            if (aclStates.deny.indexOf(name) > -1) {
              return false;
            } else if (Array.isArray(aclStates.allow)) {
              return (aclStates.allow.indexOf(name) > -1);
            }
          } else {
            if (Array.isArray(aclStates.allow)) {
              return (aclStates.allow.indexOf(name) > -1);
            }
          }
          return true;
        }

        var toAcl = toState.acl;
        var fromAcl = fromState.acl;

        // controllo sia per lo stato di provenienza che la destinazione
        if (!isOK(fromAcl.to, toState.name) || !isOK(toAcl.from, fromState.name)) {
          event.preventDefault();
          var message = 'moving from "' + fromState.name + '" to "' + toState.name + '" not allowed from ACL';
          $rootScope.$broadcast('$stateChangeError', toState, toParams, fromState, fromParams, new Error(message));
        }

      });

      // intercetto il completamento della navigazione
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState/*, fromParams*/) {
        var $state = ib.state;
        var $location = ib.location;

        // eseguo autoroute
        if (toState.autoroute != null) {
          $state.go(toState.autoroute);
        }

        // elimino lo step nella history (con l'html5mode il provider $location gestisce direttamente le API history)
        if (fromState.autoroute != null) {
          $location.replace();
        }

        // reset della scroll position
        window.scrollTo(0, 0);

        // chiusura dell'eventuale menu aperto
        $('.overlay[data-sidebar-overlay]').click();

      });

    }
  ]);

});
