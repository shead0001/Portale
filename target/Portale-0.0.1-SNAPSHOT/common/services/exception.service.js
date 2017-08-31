define([
  'angular',
  'ib',
  'common/services/exception.service.js'
], function(angular, ib) {

  angular.module('ib').factory('$exceptionNormalizer', [
    'env',
    'session',
    'cache',
    '$language',
    function(env, session, cache, $language) {
      /**
       * Normalizza un oggetto o tipo di dato generico restituendo un istanza di Error.
       * @function $exceptionNormalizer
       * @param {*} exception Oggetto generico che verrà normalizzato in Error.
       * @memberOf ng.services
       */
      return function(exception) {
        if (exception && exception.constructor !== Error) {
          var _exception;
          if (typeof exception === 'string') {
            _exception = new Error(exception);
          } else if (typeof exception === 'object') {
            if (typeof exception.message === 'string') {
              _exception = new Error($language.getMessage('Si è verificato un errore nel client'));
              _exception.details = exception.message;
            } else if (exception.data != null && Array.isArray(exception.data.errors)) {
              if (exception.data.errors.length === 1) {
                _exception = new Error(exception.data.errors[0].message);
                exception = exception.data.errors[0];
              } else {
                _exception = new Error($language.getMessage('Si sono verificati degli errori nel server'));
                _exception.message += ':\n';
                _exception.details = '';
                exception.data.errors.forEach(function(error) {
                  _exception.message += ' - ' + error.message + '\n';
                  _exception.details += error.message + '<br/>' + error.details + '<br/><br/>';
                });
              }
            } else if (typeof exception.data === 'string') {
              _exception = new Error(exception.data);
            } else if (exception.status != null && exception.statusText != null) {
              _exception = new Error(
                $language.getMessage('Si è verificato un errore nella comunicazione con il server')
              );
              _exception.details = exception.status + ' ' + exception.statusText;
            } else {
              _exception = new Error($language.getMessage('Si è verificato un errore'));
            }
            angular.extend(_exception, exception);
            _exception.inner = exception;
          }
          exception = _exception;
        }
        exception.state = exception.state || {};
        angular.extend(exception.state, {
          env: angular.copy(env),
          session: angular.copy(session),
          cache: angular.copy(cache)
        });
        return exception;
      };
    }]);

  angular.module('ib').factory('$exceptionHandler', [
    function() {
      /**
       * Gestisce un errore internamente segnalando in console informazioni utili al debugging.
       * @function $exceptionHandler
       * @param {Error} exception Errore che verrà utilizzato per il logging.
       * @param {string} cause Motivo di generazione dell'errore (opzionale, generato dagli internal di Angular).
       * @memberOf ng.services
       */
      return function(exception, cause) {
        if (typeof cause === 'string') {
          exception.message += ' (caused by "' + cause + '")';
          exception.cause = cause;
        }
        console.error(exception);
        return exception;
      };
    }]);

  angular.module('ib').factory('$exceptionNotifier', [
    '$uibModal',
    '$exceptionNormalizer',
    '$rootScope',
    '$identity',
    '$timeout',
    function($uibModal, $exceptionNormalizer, $rootScope, $identity, $timeout) {

      var exceptionQueue = [];
      var currentModal;

      /**
       * Segnala un errore all'utente tramite modale bootstrap.
       * @function $exceptionNotifier
       * @param {Error} exception Errore che verrà utilizzato per la notifica.
       * @memberOf ng.services
       */
      return function(exceptionToNotify) {
        exceptionQueue.push(exceptionToNotify = $exceptionNormalizer(exceptionToNotify));

        function processExceptionQueue() {
          var exception = exceptionQueue.shift();
          if (!exception) {
            return;
          }

          $(document).trigger('exception', exception);
          $rootScope.$broadcast('exception', exception);

          console.error(exception);

          currentModal = $uibModal.open({
            templateUrl: 'common/static/html/errore.html',
            controller: [
              '$scope',
              '$uibModalInstance',
              function($scope, $uibModalInstance) {

                $uibModalInstance.opened.then(function() {
                  ib.shortcuts.add({
                    mask: 'Ctrl+Alt+E',
                    handler: function() {
                      $scope.collapseDetails = !$scope.collapseDetails;
                      $scope.$digest();
                    },
                    list: 'error_dialog'
                  });
                  ib.shortcuts.start('error_dialog');
                });

                $uibModalInstance.closed.then(function() {
                  if (exception.action === 'relogin') {
                    $identity.logout();
                    if (exceptionQueue.length > 0) {
                      exceptionQueue = [];
                    }
                  }
                  ib.shortcuts.stop('error_dialog');
                  ib.shortcuts.remove({
                    mask: 'Ctrl+Alt+E',
                    list: 'error_dialog'
                  });
                  currentModal = null;
                  $timeout(processExceptionQueue);
                });

                $scope.error = exception;

                $scope.collapseDetails = true;

                $scope.ok = function() {
                  $uibModalInstance.close(null);
                };

              }]
          });

        }

        if (!currentModal) {
          processExceptionQueue();
        }

        return exceptionToNotify;
      };
    }
  ]);

  window.requirejs.onError = function(error) {
    console.error(error);
    if (ib.injector) {
      ib.injector.get('$exceptionNotifier')(ib.injector.get('$exceptionHandler')(error));
    }
  };

});
