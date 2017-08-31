define([
  'angular',
  'ib'
], function(angular) {

  /**
   * Espone l'oggetto di helper per la gestione di elementi UI.
   * @namespace $ui
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('$ui', [function() {

    var service = {};

    service.loader = {};

    /**
     * Mostra il loader animato globale.
     * @memberOf ng.services.$ui
     */
    service.loader.show = function() {
      var loaderScope = $('body > div[ng-http-loader]').data('$isolateScope');

      loaderScope.showLoader = true;
      loaderScope.$digest();
    };

    /**
     * Nasconde il loader animato globale.
     * @memberOf ng.services.$ui
     */
    service.loader.hide = function() {
      var loaderScope = $('body > div[ng-http-loader]').data('$isolateScope');

      loaderScope.showLoader = false;
      loaderScope.$digest();
    };

    return service;

  }]);

});
