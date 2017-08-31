define([
  'angular'
], function(angular) {

  angular.module('ib').filter('asteriscaCaratteri', [
    function() {
      return function(cellulare) {
        var celStar = cellulare;
        if (celStar.length > 8) {
          celStar = cellulare.substring(0, 3);
          celStar += '****' + cellulare.substring(8);
        }
        return celStar;
      };
    }
  ]);

});
