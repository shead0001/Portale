define([
  'angular',
  'ib'
], function(angular) {

  angular.module('ib').filter('newlines', function() {
    return function(text) {
      return text.replace(/\n/g, '<br/>');
    };
  });

});
