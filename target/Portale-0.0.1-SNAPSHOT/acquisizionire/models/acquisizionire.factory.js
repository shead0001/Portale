define([
  'angular',
  'ib',
  'acquisizionire/schemas/acquisizionire.schema.js'
], function(angular) {

  angular.module('ib').factory('Acquisizionire', [function() {

    var Acquisizionire = function(obj) {
      this.idRapporto = obj.idRapporto;
    };

    return Acquisizionire;

  }]);

});
