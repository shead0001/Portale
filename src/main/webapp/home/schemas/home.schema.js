define([
  'ib',
  'common/services/jsonschema.service.js'
], function(ib) {
  ib.injector.get('$jsonSchema').register('Home', {
    'id': 'home',
    'type': 'object',
    'properties': {
      'numeroCarte': {
        'type': 'number'
      },
      'numeroConti': {
        'type': 'number'
      },
      'numeroFidi': {
        'type': 'number'
      },
      'numeroPrestiti': {
        'type': 'number'
      },
      'contiEntrate': {
        'type': 'number'
      },
      'contiUscite': {
        'type': 'number'
      },
      'contiUltimoMese': {
        'type': 'number'
      },
      'carteTotFido': {
        'type': 'number'
      },
      'carteTotDispo': {
        'type': 'number'
      },
      'carteTotSaldo': {
        'type': 'number'
      },
      'carteTotUtilizzi': {
        'type': 'number'
      },
      'apertureCredTotFido': {
        'type': 'number'
      },
      'apertureCredTotDispo': {
        'type': 'number'
      },
      'pertureCredTotSaldo': {
        'type': 'number'
      },
      'apertureCredTotUtilizzi': {
        'type': 'number'
      },
      'prestitiTotFinanziato': {
        'type': 'number'
      },
      'prestitiTotRata': {
        'type': 'number'
      },
      'prestitiTotSaldo': {
        'type': 'number'
      },
      'prestitiTotDebitoResiduo': {
        'type': 'number'
      },
      'carte': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'avvisoAggEC': {'type': 'boolean'},
            'avvisoAutAcq': {'type': 'boolean'},
            'bin': {'type': 'string'},
            'bloccoCod': {'type': 'string'},
            'bloccoDes': {'type': 'string'},
            'cellulare': {'type': 'string'},
            'contoCSE': {'type': 'string'},
            'dataScadenza': {'type': 'string'},
            'desMarketing': {'type': 'string'},
            'dispo': {'type': 'number'},
            'dispoPrincipale': {'type': 'number'},
            'dispoSecondaria': {'type': 'number'},
            'fido': {'type': 'number'},
            'fidoPrincipale': {'type': 'number'},
            'fidoSecondaria': {'type': 'number'},
            'frequenzaPagamento': {'type': 'string'},
            'iban': {'type': 'string'},
            'impSogliaAut': {'type': 'number'},
            'intestazione': {'type': 'string'},
            'modInvioEC': {'type': 'string'},
            'modPagamento': {'type': 'string'},
            'numPratica': {'type': 'string'},
            'pan': {'type': 'string'},
            'panFull': {'type': 'string'},
            'prodotto': {'type': 'string'},
            'saldo': {'type': 'number'},
            'statoCod': {'type': 'string'},
            'statoDes': {'type': 'string'},
            'utilizzi': {'type': 'number'}
          }
        },
        'minItems': 0,
        'uniqueItems': true
      },
      'aperture': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'avvisoAggEC': {'type': 'boolean'},
            'avvisoAutAcq': {'type': 'boolean'},
            'bin': {'type': 'string'},
            'bloccoCod': {'type': 'string'},
            'bloccoDes': {'type': 'string'},
            'cellulare': {'type': 'string'},
            'contoCSE': {'type': 'string'},
            'dataScadenza': {'type': 'string'},
            'desMarketing': {'type': 'string'},
            'dispo': {'type': 'number'},
            'dispoPrincipale': {'type': 'number'},
            'dispoSecondaria': {'type': 'number'},
            'fido': {'type': 'number'},
            'fidoPrincipale': {'type': 'number'},
            'fidoSecondaria': {'type': 'number'},
            'frequenzaPagamento': {'type': 'string'},
            'iban': {'type': 'string'},
            'impSogliaAut': {'type': 'number'},
            'intestazione': {'type': 'string'},
            'modInvioEC': {'type': 'string'},
            'modPagamento': {'type': 'string'},
            'numPratica': {'type': 'string'},
            'pan': {'type': 'string'},
            'panFull': {'type': 'string'},
            'prodotto': {'type': 'string'},
            'saldo': {'type': 'number'},
            'statoCod': {'type': 'string'},
            'statoDes': {'type': 'string'},
            'utilizzi': {'type': 'number'}
          }
        },
        'minItems': 0,
        'uniqueItems': true
      },
      'prestiti': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'bloccoCod': {'type': 'string'},
            'bloccoDes': {'type': 'string'},
            'debitoResiduo': {'type': 'number'},
            'desMarketing': {'type': 'string'},
            'descIntestatario': {'type': 'string'},
            'finanziato': {'type': 'number'},
            'ibanPagamento': {'type': 'string'},
            'intermLocalita': {'type': 'string'},
            'intermProv': {'type': 'string'},
            'intermRagSociale': {'type': 'string'},
            'intermediario': {'type': 'string'},
            'modPagamento': {'type': 'string'},
            'numPratica': {'type': 'string'},
            'numRate': {'type': 'number'},
            'primaScadenza': {'type': 'number'},
            'rataInScadenza': {'type': 'number'},
            'saldo': {'type': 'number'},
            'statoCod': {'type': 'string'},
            'statoDes': {'type': 'string'},
            'tabellaFinanziaria': {'type': 'string'},
            'ultimaScadenza': {'type': 'number'}
          }
        },
        'minItems': 0,
        'uniqueItems': true
      }
    }

  });

});
