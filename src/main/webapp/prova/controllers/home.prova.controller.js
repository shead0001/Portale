define([
  'angular',
  'util',
  'ib',
  'prova/services/prova.service.js'
], function(angular, util, ib) {

  angular.module('ib').controller('homeProvaController', [
    '$q',
    'provaService',
    '$timeout',
    '$locale',
    '$filter',
    '$translate',
    '$exceptionNotifier',
	'$scope',
	'$state',
    function($q, provaService, $timeout, $locale, $filter, $translate, $exceptionNotifier, $scope, $state) {

      var self = this;

      self.tipoRedditoEsente = 'S';
	  self.fase = 'I';



      self.aggiorna = function() {
		  
      };

      var languageChanged = function() {
      };
      ib.rootScope.$on('$languageChanged', languageChanged);

      ib.rootScope.$on('$stateChangeStart', function() {
        ib.rootScope.$off('$languageChanged', languageChanged);
      });

      self.aggiorna();
		
		self.uploadFile = function() {
                var file = $scope.myFile;
			
			if ( file == null) {
          		var messaggioFileNulll = 'Selezionare un File';
          		$exceptionNotifier(new Error(messaggioFileNulll));
          		return;
        	}

               
               console.log(self.saldoTotaleContabile );
               console.dir(file);
			if(self.tipoRedditoEsente == 'S')
				{
					provaService.uploadFileToUrl(file).then(function(res) {
                    var result = res;
                	}).catch(function(errore) { $exceptionNotifier(errore); });
				}
			else
				{
					provaService.uploadFileToUrl(file).then(function(res) {
                    var result = res;
                	}).catch(function(errore) { $exceptionNotifier(errore); });
				}
			self.fase = 'R';
            //$state.go('home');
      };
		
	self.nuovaOperazione = function() {
        self.tipoRedditoEsente = 'S';
	  	self.fase = 'I';
        self.aggiorna();
        
      };
	self.goHome = function() {
		$state.go('home');
      };

    }
  ]);

});
