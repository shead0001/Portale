define([
  'ib',
  'common/services/jsonschema.service.js'
], function(ib) {

  ib.injector.get('$jsonSchema').register('Prova', {
    'idRapporto': 'conto',
    'type': 'object',
    'properties': {
      'idRapporto': {
        'type': 'string'
      },
      'intestatario': {
        'type': 'string'
      },
      'name': {
        'type': ['string', 'null']
      },
      'iban': {
        'type': 'string'
      },
      'swift': {
        'type': 'string'
      },
      'dataApertura': {
        'type': ['string', 'null']
      },
      'tipo': {
        'enum': [
          'TIPO_RAPP_CONTO_CORRENTE',
          'TIPO_RAPP_CONTO_ESTERO',
          'TIPO_RAPP_DEPOSITO_RISPARMIO'
        ]
      },
      'saldoContabile': {
        'type': ['number', 'null']
      },
      'saldoDisponibile': {
        'type': ['number', 'null']
      },
      'sommePrenotate': {
        'type': ['number', 'null']
      },
      'dataSaldo': {
        'type': ['string', 'null']
      },
      'status': {
        'type': ['string', 'null']
      },
      'descrizione': {
        'type': ['string', 'null']
      },
      'cointestatari': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'cdg': {'type': 'number'},
            'denominazione': {'type': 'string'}
          },
          'required': ['cdg', 'denominazione']
        },
        'minItems': 1,
        'uniqueItems': true
      },
      'numeroContoIban': {
        'type': ['string', 'null']
      }
    },
    'required': [
      'idRapporto',
      'iban',
      'swift',
      'tipo',
      'intestatario'
    ]
  });

});
