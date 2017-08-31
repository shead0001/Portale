define([
  'angular',
  'ib'
], function(angular, ib) {

  angular.module('ib').config([
    '$urlRouterProvider',
    function($urlRouterProvider) {

      // implementazione autonavigazione verso state caricati in lazy
      $urlRouterProvider.otherwise(function($injector, $location) {
        var $state = ib.state;
        var $rootScope = ib.rootScope;

        if ($location.$$url === '') {
          return '/home';
        }

        // generazione array di state verso cui navigare
        var routeSteps = $location.$$url.split('/');
        if (routeSteps[0] === '') {
          routeSteps.shift();
        }

        // attivazione autonavigazione
        if (routeSteps.length > 1) {
          $rootScope.$on('$stateChangeSuccess', function routeIn(event, toState) {
            if (routeSteps.length > 0) {
              var next = toState.name + '.' + routeSteps.shift();
              if ($state.get(next)) {
                $state.go(next);
                return;
              }
            }
            // rimozione event listener
            $rootScope.$off('$stateChangeSuccess', routeIn);
          });
        }

        // avvio prima navigazione come da specifiche $urlRouterProvider.otherwise
        if ($state.get(routeSteps[0] || '') && routeSteps[0] !== 'login') {
          return routeSteps.shift();
        } else {
          return '/home';
        }

      });

    }]);

});
