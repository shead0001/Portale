define([
  'angular',
  'ib'
], function(angular) {

  angular.module('ib').directive('uicBreadcrumb', [
    function() {

      return {
        restrict: 'A',
        replace: true,
        templateUrl: 'common/static/html/breadcrumb.html'
      };

    }
  ]);

});
