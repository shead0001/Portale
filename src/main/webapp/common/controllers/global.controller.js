define([
  'angular',
  'ib',
  'util'
], function(angular, ib, util) {

  angular.module('ib').controller('globalController', [function() {
    this.ib = ib;
    this.util = util;
    this.regexp = {
      cellulare: /^((\+|00)?39)?3\d{2}\d{6,7}$/
    };
    this.formatData = 'dd/MM/yyyy';
    this.formatDataMeseAnno = 'MM/yyyy';
    this.formatDataMeseTestoAnno = 'MMMM yyyy';
    this.formatDataOra = 'dd/MM/yyyy HH:mm:ss';
  }]);

});
