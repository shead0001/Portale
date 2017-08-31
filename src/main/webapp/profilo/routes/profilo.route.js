define([
  'angular',
  'ib'
], function(angular) {

  // definizione route globali (comuni), principalmente pagine statiche
  angular.module('ib').config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('profilo.show', {
      url: '/mostraProfilo',
      templateUrl: 'profilo/static/html/profilo.show.html'
    });

    $stateProvider.state('profilo.editIndirizzo', {
      url: '/modificaIndirizzo',
      templateUrl: 'profilo/static/html/profilo.edit.indirizzo.html'
    });

    $stateProvider.state('profilo.editRecapiti', {
      url: '/modificaRecapiti',
      templateUrl: 'profilo/static/html/profilo.edit.recapiti.html'
    });

    $stateProvider.state('messaggiInEntrata.inbox', {
      url: '/messaggiInArrivo',
      templateUrl: 'profilo/static/html/messaggiInEntrata.inbox.html'
    });
    $stateProvider.state('messaggiInEntrata.archiviati', {
      url: '/messaggiArchiviati',
      templateUrl: 'profilo/static/html/messaggiInEntrata.archiviati.html'
    });
    $stateProvider.state('profilo.modificaPassword', {
      url: '/modificaPassword',
      templateUrl: 'profilo/static/html/modificaPassword.html'
    });

    $stateProvider.state('profilo.limitiImporto', {
      url: '/limitiImporto',
      templateUrl: 'profilo/static/html/limitiImporto.html'
    });
    $stateProvider.state('profilo.avvisi', {
      url: '/avvisi',
      templateUrl: 'profilo/static/html/avvisi.html'
    });
    $stateProvider.state('profilo.modificaAvvisi', {
      url: '/modificaAvvisi',
      templateUrl: 'profilo/static/html/modificaAvvisi.html',
      acl: {
        from: {
          allow: [
            'profilo',
            'profilo.avvisi'
          ]
        }
      }
    });

    $stateProvider.state('profilo.messaggiInEntrata', {
      url: '/messaggiInEntrata',
      templateUrl: 'profilo/static/html/messaggiInEntrata.html'
    });
    $stateProvider.state('profilo.modificaLimiti', {
      url: '/modificaLimiti',
      templateUrl: 'profilo/static/html/modificaLimiti.html',
      acl: {
        from: {
          allow: [
             'profilo.limitiImporto',
             'profilo.confermaModificaLimiti'
          ]
        }
      }
    });
    $stateProvider.state('profilo.confermaModificaLimiti', {
      url: '/confermaModificaLimiti',
      templateUrl: 'profilo/static/html/confermaModificaLimiti.html',
      acl: {
        from: {
          allow: [
            'profilo.modificaLimiti'
          ]
        }
      }
    });
    $stateProvider.state('profilo.consultazioneDocumenti', {
      url: '/consultazioneDocumenti',
      templateUrl: 'profilo/static/html/consultazioneDocumenti.html'
    });
    $stateProvider.state('profilo.impostazioneServizi', {
      url: '/impostazioneServizi',
      templateUrl: 'profilo/static/html/impostazioneServizi.html'
    });
    $stateProvider.state('profilo.rigenerazioneCompassKey', {
      url: '/rigenerazioneCompassKey',
      templateUrl: 'profilo/static/html/rigenerazioneCompassKey.html'
    });

    $stateProvider.state('profilo.rigenerazioneOTP', {
      url: '/rigenerazioneOTP',
      templateUrl: 'profilo/static/html/rigenerazioneOTP.html'
    });
    $stateProvider.state('profilo.condizioneServizi', {
      url: '/condizioneServizi',
      templateUrl: 'profilo/static/html/condizioneServizi.html'
    });
  }]);

});
