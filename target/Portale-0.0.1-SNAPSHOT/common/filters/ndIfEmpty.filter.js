define([
  'angular',
  'ib',
  'util'
], function(angular, ib, util) {

  angular.module('ib').filter('ndIfEmpty', [
    function() {
      return function(input) {
        return util.valueOrNd(input);
      };
    }
  ]);

});
