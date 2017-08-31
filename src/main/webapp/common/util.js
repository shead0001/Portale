define([
  'uri/URI'
], function(uriParser) {

  /**
   * Polls an escape function. Once the escape function returns true, executes a run function.
   * @function waitUntil
   * @memberOf global
   * @param {Function} escapeFunction A function that will be repeatedly executed and should return
   * true when the run function should be called.
   * @param {number} checkDelay Number of milliseconds to wait before checking the escape function
   * again.
   * @returns {{then: Function}} The run function should be registered via the then method.
   */
  window.waitUntil = function(escapeFunction, checkDelay) {
    var _runFunction;

    var interval = setInterval(function() {
      if (escapeFunction()) {
        clearInterval(interval);

        if (_runFunction) {
          _runFunction();
        }
      }
    }, checkDelay || 1);

    return {
      then: function(runFunction) {
        _runFunction = runFunction;
      }
    };
  };

  /**
   * Recursively Object.freeze() on objects.
   * @function deepFreeze
   * @memberOf global.Object
   * @param o {*} - The object to freeze recursively.
   * @returns {*} - Returns the object freezed.
   */
  Object.deepFreeze = function deepFreeze(o) {
    Object.freeze(o);

    Object.getOwnPropertyNames(o).forEach(function(prop) {
      if (o.hasOwnProperty(prop) &&
          o[prop] !== null &&
          (typeof o[prop] === 'object' || typeof o[prop] === 'function') && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
    });

    return o;
  };

  var util = {};

  util.getLastMonths = function(startDate, count) {
    var months = [];
    var reverse = (count < 0);
    if (count < 0) {
      count = (-count);
    }
    var month = startDate.getMonth();
    do {
      months.push(month);
      if (reverse) {
        month = (month === 0) ? 11 : (--month);
      } else {
        month = (month === 11) ? 0 : (++month);
      }
    } while (--count);
    if (reverse) {
      months.reverse();
    }
    return months;
  };

  /**
   * Get last date months.
   * @function getLastDateMonths
   * @memberOf global.Object
   * @param startDate {Date} - The start date object.
   * @param count {Number} - The count of the months.
   * @returns {Array} - Returns an array with the last count months as Date.
   */
  util.getLastDateMonths = function(startDate, count) {
    var dates = [];
    for (var i = count; i > 0; i--) {
      var copiedDate = new Date(startDate.getTime());
      copiedDate.setMonth(copiedDate.getMonth() - i);
      copiedDate.setDate(1);
      copiedDate.setHours(0);
      copiedDate.setMinutes(0);
      copiedDate.setSeconds(0);
      copiedDate.setMilliseconds(0);
      dates.push(copiedDate);
    }
    return dates;
  };

  /**
   * Get last day of the month.
   * @function lastDayOfTheMonth
   * @memberOf global.Object
   * @param date {Date} - The date object.
   * @returns {Date} - Returns a Date object with the last day of the month.
   */
  util.lastDayOfTheMonth = function(date) {
    var lastDayOfTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    lastDayOfTheMonth.setMilliseconds(-1);
    return lastDayOfTheMonth;
  };

  util.traverse = function(o, process_func, process_filter, depth_filter) {
    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        if (process_filter == null ||
            (typeof process_filter === 'function' && process_filter(i)) ||
            (typeof process_filter === 'object' && process_filter.constructor === RegExp && process_filter.test(i))) {
          process_func.apply(this, [i, o[i], o]);
        }
        if (o[i] !== null && typeof o[i] === 'object') {
          if (depth_filter == null ||
              (typeof depth_filter === 'string' && depth_filter === i) ||
              (typeof depth_filter === 'object' && depth_filter.constructor === RegExp && depth_filter.test(i))) {
            util.traverse(o[i], process_func, process_filter, depth_filter);
          }
        }
      }
    }
  };

  util.isLabelVisible = function() {
    //TODO: evaluate using jQuery
    return (window.innerWidth > 450);
  };

  /**
   * Risolve un URL secondo una mappa di risoluzione passata come parametro.
   * @function resolveUri
   * @param url {string} - L'URL da risolvere.
   * @param map {Object} - La mappa di risoluzione come array associativo {prefix:value}.
   * @returns {string} - L'URL risolto.
   * La funzione segnala su console eventuali errori (prefisso non configurato) o warning (utilizzo di URL assoluti).
   */
  util.resolveUri = function(url, map) {
    if (url[0] === ':') {
      return url.replace(util.resolveUri.regexp.map, function($0, $1) {
        if (map.hasOwnProperty($1)) {
          return map[$1];
        } else {
          console.error('$.ajax: unable to override url "%s" (missing in map)', $0);
          return $0;
        }
      });
    } else if (util.resolveUri.regexp.absolute.test(url) && !(util.resolveUri.regexp.absolute.lastIndex = 0)) {
      console.warn('$.ajax: avoid absolute url "%s" that can cause problems across environments', url);
    }
    return url;
  };
  util.resolveUri.regexp = {
    map: /^:(.*?)(?=[\/\\])/,
    absolute: /^(?:\/|[a-zA-Z]+?:\/\/)/
  };

  /**
   * Scompone un URL in un array di stringhe composto da host, segmenti della path, segmenti query (ordinate).
   * @param   {string} url L'URL da scomporre.
   * @returns {string[]} Un array con i segmenti generati scomponendo l'URL.
   */
  util.splitUrlWithOrderedQuery = function(url) {
    var result = [];

    if (typeof url === 'string' && url !== '') {
      var uriObject = uriParser(url);

      result.push(uriObject.host());
      result = result.concat(
        uriObject.segment(),
        uriObject.query().split('&').sort()
      );

      if (result[0] === '') {
        result.shift();
      }
      if (result[result.length - 1] === '') {
        result.pop();
      }
    }

    return result;
  };

  /**
   * Restituisce il valore se la variabile è valorizzata, "N.D." in caso contrario.
   * @param   {string} variable La variabile da controllare.
   * @returns {Any} La variabile stessa se essa è valorizzata, "N.D." in caso contrario.
   */
  util.valueOrNd = function(variable) {
    return variable == null ? 'N.D.' : variable;
  };

  /**
   * Restituisce la data nel formato ggmmyyy.
   * @param   {date} date La data da convertire nel formato di output.
   * @returns {string} La data nel formato atteso.
   */
  util.dateToGGMMYYYY = function(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return '' + day + month + year;
  };

  return util;
});
