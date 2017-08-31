define([
  'angular',
  'ib'
], function(angular) {

  angular.module('ib').directive('uiSrefIf', [
    '$compile',
    function($compile) {
      return {
        link: function($scope, $element, $attrs) {

          var uiSref = $attrs.uiSref;
          var uiSrefIf = $attrs.uiSrefIf;

          $element.removeAttr('ui-sref-if');
          $element.removeAttr('ui-sref');

          $scope.$watch(
            function() {
              return $scope.$eval(uiSrefIf);
            },
            function(bool) {
              if (bool) {
                $element.attr('ui-sref', uiSref);
              } else {
                $element.removeAttr('ui-sref');
                $element.removeAttr('href');
              }
              $compile($element)($scope);
            }
          );
        }
      };
    }
  ]);
});
