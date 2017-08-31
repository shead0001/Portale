define([
  'angular',
  'ib',
  'util'
], function(angular, ib, util) {

  /**
   * Espone l'oggetto di helper per la gestione dell'albero della cache.
   * @namespace $cacheManager
   * @memberOf ng.services
   * @type {Object}
   */
  angular.module('ib').service('$cacheManager', [
    'cache',
    function(cache) {

      var service = {};

      /**
       * Salva un valore nell'albero della cache.
       * @function set
       * @memberOf ng.services.$cacheManager
       * @param   {string} path L'URL o una chiave separata da "/" che specifica il percorso in cui salvare il valore.
       * @param   {*} value Il valore da salvare nell'albero della cache.
       * @param   {number} expire Eventuale intervallo in millisecondi dopo il quale invalidare lo stato nella cache.
       * @returns {number|string|boolean|array|object} Il valore salvato nella cache.
       */
      service.set = function(path, value, expire) {
        var tree = util.splitUrlWithOrderedQuery(path);
        var object = cache;
        var length = tree.length;
        var i;

        if (length > 0) {
          for (i = 0; i < length; i++) {
            object = object[tree[i]] = object[tree[i]] || {};
          }
          object._value = value;
          object._birth = Date.now();
          if (typeof expire === 'number') {
            object._death = Date.now() + expire;
          }
        }

        return value;
      };

      /**
       * Recupera un valore dall'albero della cache.<br/>
       * Nel caso in cui per il valore sia stato precedentemente impostato un timeout di scadenza
       * e il valore sia scaduto, la funzione ritorna undefined e distrugge le informazioni relative
       * al valore mantenendo però il relativo ramo dell'albero della cache.
       * @function get
       * @memberOf ng.services.$cacheManager
       * @param   {string} path L'URL o una chiave separata da "/" che specifica il percorso da cui estrarre il valore.
       * @returns {number|string|boolean|array|object} Il valore disponibile nella cache o undefined in caso
       *                                               il valore sia scaduto o non presente in cache.
       */
      service.get = function(path) {
        var tree = util.splitUrlWithOrderedQuery(path);
        var object = cache;
        var length = tree.length;
        var i;

        if (length > 0) {
          for (i = 0; i < length; i++) {
            object = object[tree[i]] = object[tree[i]] || {};
          }
          if (typeof object._death === 'number' && object._death < Date.now()) {
            delete object._value;
            delete object._birth;
            delete object._death;
          }
          return object._value;
        }

        return undefined;
      };

      /**
       * Invalida e distrugge un ramo dall'albero della cache.
       * @function unset
       * @memberOf ng.services.$cacheManager
       * @param   {string} path L'URL o una chiave separata da "/" che specifica il percorso da distruggere.
       * @returns {boolean} Restituisce true se il ramo dell'albero è stato distrutto.
       */
      service.unset = function(path) {
        var tree = util.splitUrlWithOrderedQuery(path);
        var object = cache;
        var length = tree.length;
        var i;

        if (length > 0) {
          for (i = 0; i < length - 1; i++) {
            object = object[tree[i]] = object[tree[i]] || {};
          }
          return delete object[tree[i]];
        }

        return true;
      };

      /**
       * Invalida e distrugge l'intero albero della cache.
       * @function clean
       * @memberOf ng.services.$cacheManager
       * @returns {boolean} Restituisce true se tutti i percorsi dell'albero sono stati distrutti.
       */
      service.clean = function() {
        var cleaned = true;
        Object.keys(cache).forEach(function(property) {
          try {
            delete cache[property];
          } catch (e) {
            cleaned = false;
            console.warn('unable to clean cache property "%s"', property);
          }
        });

        return cleaned;

      };

      return service;

    }
  ]);

});
