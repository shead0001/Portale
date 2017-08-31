define([
  'angular',
  'ib',
  'profilo/routes/profilo.route.js'
], function(angular, ib) {

  // definizione route globali (comuni), principalmente pagine statiche
  angular.module('ib').config(['$stateProvider', function($stateProvider) {
    /**
       * Pagina iniziale.
       * @name #/home
       * @type {home}
       * @memberOf ng.routes
       */
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'home/static/html/home.html',
      resolve: {
        wait: function() {
          return ib.subapp.load('home');
        }
      }
    });

      
    /**
       * Pagina iniziale.
       * @name #/prova
       * @type {prova}
       * @memberOf ng.routes
       */
    $stateProvider.state('prova', {
      url: '/prova',
      templateUrl: 'prova/static/html/prova.html',
      resolve: {
        wait: function() {
          return ib.subapp.load('prova');
        }
      }
    });   
	  
    /**
       * Pagina iniziale.
       * @name #/prova
       * @type {prova}
       * @memberOf ng.routes
       */
    $stateProvider.state('acquisizionire', {
      url: '/acquisizionire',
      templateUrl: 'acquisizionire/static/html/acquisizionire.html',
      resolve: {
        wait: function() {
          return ib.subapp.load('acquisizionire');
        }
      }
    });   	  
   
    /**
       * Pagina di errore generico "non implementato".
       * @name #/501
       * @type {501}
       * @memberOf ng.routes
       */
    $stateProvider.state('501', {
      url: '/501',
      templateUrl: 'common/static/html/501.html'
    });



  }]);

});
