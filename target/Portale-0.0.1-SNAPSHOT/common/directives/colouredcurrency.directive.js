define([
  'angular',
  'ib',
  'common/filters/signedcurrency.filter.js'
], function(angular) {

  angular.module('ib').directive('uicColouredCurrency', [
    function() {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          amount: '=',
          currencyVal: '@',
          fractionDigit: '@'
        },
        template: '<span class="{{style}}"><span ng-hide="true" class="originalFloatAmount">' +
        '{{amount}}</span>{{amount | signedCurrency \: currencyVal \: fractionDigit}}</span>',
        link: function($scope) {
          $scope.$watch('amount', function() {
            $scope.style = 'green';
            if ($scope.amount < 0) {
              $scope.style = 'red';
            }
            if (angular.isUndefined($scope.amount) || $scope.amount == null) {
              $scope.style = '';
            }
          });
        }
      };
    }
  ]);
});
