define([
  'ib',
  'common/services/jsonschema.service.js'
], function(ib) {

  ib.injector.get('$jsonSchema').register('ListaCodiceDescrizione', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'listacodicedescrizione',
    'type': 'array',
    'items': {
      'type': 'object',
      'properties': {
        'codice': {'type': 'string'},
        'descrizione': {'type': 'string'}
      },
      'required': ['codice', 'descrizione']
    },
    'minItems': 0,
    'uniqueItems': true
  });

  ib.injector.get('$jsonSchema').register('ListaStringhe', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'listastringhe',
    'type': 'array',
    'items': {
      'type': 'string'
    },
    'minItems': 0,
    'uniqueItems': true
  });

});
