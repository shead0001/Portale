define([
  'angular'
], function(angular) {

  angular.module('ib').filter('valueIfNegative', [
    function() {
      return function(input) {
        if (input === -1) {
          return 'illimitato';
        } else {
          return input;
        }

      };
    }
  ]);

});
