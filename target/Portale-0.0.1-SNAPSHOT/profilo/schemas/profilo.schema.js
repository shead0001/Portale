define([
  'ib',
  'common/services/jsonschema.service.js'
], function(ib) {
  ib.injector.get('$jsonSchema').register('Residenza', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'Residenza',
    'type': 'object',
    'properties': {
      'indirizzo': {
        'type': 'string'
      },
      'cap': {
        'type': 'number'
      },
      'comune': {
        'type': 'string'
      },
      'provincia': {
        'type': 'string'
      },
      'codiceDispositivo': {
        'type': 'string'
      },
      'nazione': {
        'type': 'string'
      }
    },
    'required': [
      'indirizzo',
      'cap',
      'comune',
      'provincia',
      'nazione'
    ]
  });
  ib.injector.get('$jsonSchema').register('Recapito', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'Recapito',
    'type': 'object',
    'properties': {
      'telefono': {'type': 'string'},
      'cellulare': {'type': 'string'},
      'codiceDispositivo': {'type': 'string'},
      'email': {'type': 'string'}
    },
    'required': [
      'telefono',
      'cellulare',
      'email'
    ]
  });
  ib.injector.get('$jsonSchema').register('Documento', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'Documento',
    'type': 'object',
    'properties': {
      'tipoDoc': {'type': 'string'},
      'numeroDoc': {'type': 'string'},
      'numeroDoc2': {'type': 'string'},
      'luogoRilasio': {'type': 'string'},
      'provinciaRilascio': {'type': 'string'},
      'dataRilascio': {'type': 'number'},
      'dataScadenza': {'type': 'number'}
    },
    'required': [
      'tipoDoc',
      'numeroDoc',
      'numeroDoc2',
      'luogoRilasio',
      'provinciaRilascio',
      'ufficioRilascio',
      'dataRilascio',
      'dataScadenza'

    ]
  });

  ib.injector.get('$jsonSchema').register('Anagrafica', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'anagrafica',
    'type': 'object',
    'properties': {
      'tipoAnagrafica': {
        'type': 'string'
      }, 'cognome': {
        'type': 'string'
      }, 'dataNascita': {
        'type': 'number'
      }, 'luogoNascita': {
        'type': 'string'
      }, 'provNascita': {
        'type': 'string'
      }, 'nazioneNascita': {
        'type': 'string'
      }, 'cittadinanza': {
        'type': 'string'
      }, 'sesso': {
        'type': 'string'
      }, 'codiceFiscale': {
        'type': 'string'
      }, 'ragSociale': {
        'type': 'string'
      }, 'partitaIVA': {
        'type': 'string'
      }, 'residenza': {
        '$ref': 'Residenza'
      }, 'recapito': {
        '$ref': 'Recapito'
      }, 'documento': {
        '$ref': 'Documento'
      }
    },
    'required': [
      'tipoAnagrafica',
      'nome',
      'cognome',
      'dataNascita',
      'luogoNascita',
      'provNascita',
      'nazioneNascita',
      'cittadinanza',
      'sesso',
      'codiceFiscale',
      'ragSociale',
      'partitaIVA'
    ]
  });

  ib.injector.get('$jsonSchema').register('Servizio', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'servizio',
    'type': 'object',
    'properties': {
      'idServizio': {'type': 'number'},
      'iban': {'type': 'string'},
      'intestatario': {'type': 'string'}
    },
    'required': [
      'idServizio',
      'iban',
      'intestatario'
    ]
  });
  ib.injector.get('$jsonSchema').register('MessaggioInformativo', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'messaggioInformativo',
    'type': 'object',
    'properties': {
      'idMessaggio': {'type': 'number'},
      'descrizione': {'type': 'string'},
      'email': {'type': 'string'},
      'sms': {'type': 'string'}
    },
    'required': [
      'idMessaggio',
      'descrizione',
      'email',
      'sms'
    ]
  });
  ib.injector.get('$jsonSchema').register('Password', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'Password',
    'type': 'object',
    'properties': {
      'vecchiaPswd': {'type': 'number'},
      'nuovaPswd': {'type': 'string'}
    },
    'required': [
      'vecchiaPswd',
      'nuovaPswd'
    ]
  });
  ib.injector.get('$jsonSchema').register('Tasto', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'tasto',
    'type': 'object',
    'properties': {
      'id': {'type': 'string'},
      'value': {'type': 'string'}

    },
    'required': [
      'id',
      'value'

    ]
  });
  ib.injector.get('$jsonSchema').register('Limite', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'limite',
    'type': 'object',
    'properties': {
      'descrizioneGruppo': {'type': 'string'},
      'codiceDispositivo': {'type': ['string', 'null']},
      'key': {'type': ['string', 'null']},
      'codiceGruppo': {'type': 'string'},
      'singolaOperLimite': {'type': ['number', 'null']},
      'singolaOperUtilizzato': {'type': ['number', 'null']},
      'singolaOperResiduo': {'type': ['number', 'null']},
      'pagamentiMensiliLimite': {'type': ['number', 'null']},
      'pagamentiMensiliUtilizzato': {'type': ['number', 'null']},
      'pagamentiMensiliResiduo': {'type': ['number', 'null']},
      'pagamentiGiornalLimite': {'type': ['number', 'null']},
      'pagamentiGiornalUtilizzato': {'type': ['number', 'null']},
      'pagamentiGiornalResiduo': {'type': ['number', 'null']},
      'numeroOperGiornLimite': {'type': ['number', 'null']},
      'numeroOperGiornUtilizzato': {'type': ['number', 'null']},
      'numeroOperGiornlResiduo': {'type': ['number', 'null']},
      'propostaSingolaOperLimite': {'type': ['number', 'null']},
      'propostaPagamentiMensiliLimite': {'type': ['number', 'null']},
      'propostaPagamentiGiornalLimite': {'type': ['number', 'null']},
      'propostaNumeroOperGiornLimite': {'type': ['number', 'null']},
      'propostaSingolaOperResiduo': {'type': ['number', 'null']},
      'propostaPagamentiMensiliResiduo': {'type': ['number', 'null']},
      'propostaPagamentiGiornalResiduo': {'type': ['number', 'null']},
      'propostaNumeroOperGiornResiduo': {'type': ['number', 'null']}
    },
    'required': [
      'codiceGruppo'
    ]
  });

  ib.injector.get('$jsonSchema').register('Avviso', {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'id': 'avviso',
    'type': 'object',
    'properties': {
      'informaz': {'type': ['string', 'null']},
      'tipocond': {'type': ['string', 'null']},
      'condizione2': {'type': ['string', 'null']},
      'indir': {'type': ['string', 'null']},
      'codCirc': {'type': ['string', 'null']},
      'tipoInd': {'type': ['string', 'null']},
      'telefonoList': {'type': 'array',
                       'items': {
                         'type': 'string'
                       }
                      },
      'telefonoOscuratoList': {'type': 'array',
                               'items': {
                                 'type': 'string'
                               }
                              },
      'mailList': {'type': 'array',
                   'items': {
                     'type': 'string'
                   }
                  },
      'import': {'type': 'number'},
      'listaTelefoniValorizzata': {'type': 'boolean'},
      'listaEmailValorizzata': {'type': 'boolean'},
      'mailAttivabile': {'type': 'boolean'},
      'descrizioneCondizione': {'type': ['string', 'null']},
      'condizione': {'type': ['string', 'null']},
      'listaSmsDisponibili': {'type': 'array'
                             },
      'listaMailDisponibili': {'type': 'array'
                              },
      'circuito': {'type': ['string', 'null']},
      'idRapporto': {'type': ['string', 'null']},
      'id': {'type': ['string', 'null']},
      'servizio': {'type': ['string', 'null']},
      'codiceCategoria': {'type': ['string', 'null']},
      'frequenza': {'type': ['string', 'null']},
      'giorno': {'type': ['string', 'null']},
      'telefonoSMS': {'type': ['string', 'null']},
      'indiceIndirizzoMail': {'type': ['string', 'null']},
      'stato': {'type': ['string', 'null']},
      'ora': {'type': ['string', 'null']},
      'progressivo': {'type': ['number', 'null']},
      'descrizioneFrequenza': {'type': ['string', 'null']},
      'inError': {'type': 'boolean'}
    },
    'required': [
      'descrizioneCondizione'
    ]
  });

});
