define([
  'angular',
  'ib',
  'conti/schemas/conto.schema.js'
], function(angular) {

  angular.module('ib').factory('Conto', [function() {

    var Conto = function(obj) {
      this.idRapporto = obj.idRapporto;
      this.intestatario = obj.intestatario;
      this.name = obj.name;
      this.iban = obj.iban;
      this.swift = obj.swift;
      this.dataApertura = obj.dataApertura;
      this.tipo = obj.tipo;
      this.saldoContabile = obj.saldoContabile;
      this.saldoDisponibile = obj.saldoDisponibile;
      this.sommePrenotate = obj.sommePrenotate;
      this.dataSaldo = obj.dataSaldo;
      this.status = obj.status;
      this.cointestatari = obj.cointestatari;
      this.numeroContoIban = obj.numeroContoIban;
    };

    return Conto;

  }]);

});
