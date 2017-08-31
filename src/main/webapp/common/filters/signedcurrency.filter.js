define([
  'angular',
  'util',
  'ib'
], function(angular, util) {

  angular.module('ib').filter('signedCurrency', [
    '$filter',
    function($filter) {
      return function(importo, valuta, cifreDecimali) {
        var result = $filter('currency')(importo, valuta, cifreDecimali);
        result = util.valueOrNd(result);
        if (importo > 0) {
          result = '+' + result;
        }
        return result;
      };
    }
  ]);
});
