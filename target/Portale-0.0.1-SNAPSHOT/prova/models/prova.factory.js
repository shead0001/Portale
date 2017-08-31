define([
  'angular',
  'ib',
  'prova/schemas/prova.schema.js'
], function(angular) {

  angular.module('ib').factory('Prova', [function() {

    var Prova = function(obj) {
      this.idRapporto = obj.idRapporto;
    };

    return Prova;

  }]);

});
