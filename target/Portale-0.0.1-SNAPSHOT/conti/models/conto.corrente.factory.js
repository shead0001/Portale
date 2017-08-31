define([
  'angular',
  'ib',
  'contocorrente/schemas/conto.corrente.schema.js'
], function(angular) {

  angular.module('ib').factory('RicaricaTelefonica', [function() {

    var RicaricaTelefonica = function(obj) {

      this.idOperatore = obj.idOperatore;
      this.taglio = obj.taglio;
      this.messIva = obj.messIva;
      this.idRapporto = obj.idRapporto;
      this.cellulare = obj.cellulare;
      this.numeroOperazione = obj.numeroOperazione;

    };

    return RicaricaTelefonica;

  }]);

  angular.module('ib').factory('OperatoreRicaricaTelefonica', [function() {

    var OperatoreRicaricaTelefonica = function(obj) {

      this.idOperatore = obj.idOperatore;
      this.nome = obj.nome;

    };

    return OperatoreRicaricaTelefonica;

  }]);

});
