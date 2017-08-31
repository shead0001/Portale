define([
  'angular',
  'ib'
], function(angular) {
  angular.module('ib').directive('moveNextOnMaxlength', function() {
    return {
      restrict: 'A',
      link: function($scope, element) {
        element.on('input', function(/*e*/) {
          if (element.val().length === parseInt(element.attr('maxlength'))) {
            var $nextElement = element.parent().next().find('input');
            if ($nextElement.length) {
              $nextElement[0].focus();
            }
          }
        });
      }
    };
  });

});
