define([
  'angular',
  'ib',
  'common/schemas/otp.schema.js'
], function(angular) {

  angular.module('ib').factory('Nazione', [function() {

    var Nazione = function(obj) {
      this.codice = obj.codice;
      this.descrizione = obj.descrizione;
    };

    return Nazione;

  }]);

  angular.module('ib').factory('Provincia', [function() {

    var Provincia = function(obj) {
      this.codice = obj.codice;
      this.descrizione = obj.descrizione;
    };

    return Provincia;

  }]);

  angular.module('ib').factory('CAP', [function() {

    var CAP = function(obj) {
      this.codice = obj.codice;
      this.descrizione = obj.descrizione;
    };

    return CAP;

  }]);

});
