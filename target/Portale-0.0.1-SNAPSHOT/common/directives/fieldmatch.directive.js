define([
  'angular'
], function(angular) {

  /**
   * Direttiva per il confronto di due campi di input
   * setta validity mismatch se il confronto è false
   * @type {attribute}
   * @namespace uic-field-match
   * @memberOf ng.directives
   */
  angular.module('ib').directive('uicFieldMatch', [
    '$parse',
    function($parse) {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {

          scope.$watch(function() {
            return $parse(attrs.uicFieldMatch)(scope) === ctrl.$modelValue;
          }, function(currentValue) {
            //console.log('currentValue', currentValue);
            ctrl.$setValidity('mismatch', currentValue);
          });
        }

      };
    }]);
});
