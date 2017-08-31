define([
  'angular',
  'ib',
  'profilo/schemas/profilo.schema.js'
], function(angular) {
  angular.module('ib').factory('Anagrafica', [function() {
    var Anagrafica = function(obj) {
      this.tipoAnagrafica = obj.tipoAnagrafica;
      this.cognome = obj.cognome;
      this.nome = obj.nome;
      this.dataNascita = obj.dataNascita;
      this.luogoNascita = obj.luogoNascita;
      this.provNascita = obj.provNascita;
      this.nazioneNascita = obj.nazioneNascita;
      this.cittadinanza = obj.cittadinanza;
      this.sesso = obj.sesso;
      this.codiceFiscale = obj.codiceFiscale;
      this.ragSociale = obj.ragSociale;
      this.partitaIVA = obj.partitaIVA;
      this.residenza = obj.residenza;
      this.recapito = obj.recapito;
      this.documento = obj.documento;
    };
    return Anagrafica;
  }]);

  angular.module('ib').factory('Residenza', [function() {

    var Residenza = function(obj) {

      this.indirizzo = obj.indirizzo;
      this.cap = obj.cap;
      this.comune = obj.comune;
      this.provincia = obj.provincia;
      this.nazione = obj.nazione;
      this.codiceDispositivo = obj.codiceDispositivo;

    };
    return Residenza;
  }]);

  angular.module('ib').factory('Recapiti', [function() {

    var Recapiti = function(obj) {
      this.telefono = obj.telefono;
      this.cellulare = obj.cellulare;
      this.email = obj.email;
      this.codiceDispositivo = obj.codiceDispositivo;

    };
    return Recapiti;
  }]);
  angular.module('ib').factory('Password', [function() {

    var Password = function(obj) {
      this.vecchiaPswd = obj.vecchiaPswd;
      this.nuovaPswd = obj.nuovaPswd;
    };
    return Password;
  }]);
  angular.module('ib').factory('Servizio', [function() {

    var Servizio = function(obj) {
      this.idServizio = obj.idServizio;
      this.iban = obj.iban;
      this.intestatario = obj.intestatario;
    };
    return Servizio;
  }]);
  angular.module('ib').factory('Limite', [function() {

    var Limite = function(obj) {
      this.descrizioneGruppo = obj.descrizioneGruppo;
      this.codiceGruppo = obj.codiceGruppo;
      this.singolaOperLimite = obj.singolaOperLimite ? obj.singolaOperLimite : 0;
      this.singolaOperUtilizzato = obj.singolaOperUtilizzato ? obj.singolaOperUtilizzato : 0;
      this.singolaOperResiduo = obj.singolaOperResiduo ? obj.singolaOperResiduo : 0;
      this.pagamentiMensiliLimite = obj.pagamentiMensiliLimite ? obj.pagamentiMensiliLimite : 0;
      this.pagamentiMensiliUtilizzato = obj.pagamentiMensiliUtilizzato ? obj.pagamentiMensiliUtilizzato : 0;
      this.pagamentiMensiliResiduo = obj.pagamentiMensiliResiduo ? obj.pagamentiMensiliResiduo : 0;
      this.pagamentiGiornalLimite = obj.pagamentiGiornalLimite ? obj.pagamentiGiornalLimite : 0;
      this.pagamentiGiornalUtilizzato = obj.pagamentiGiornalUtilizzato ? obj.pagamentiGiornalUtilizzato : 0;
      this.pagamentiGiornalResiduo = obj.pagamentiGiornalResiduo ? obj.pagamentiGiornalResiduo : 0;
      this.numeroOperGiornLimite = obj.numeroOperGiornLimite ? obj.numeroOperGiornLimite : 0;
      this.numeroOperGiornUtilizzato = obj.pagamentiGiornalUtilizzato ? obj.pagamentiGiornalUtilizzato : 0;
      this.numeroOperGiornlResiduo = obj.pagamentiGiornalResiduo ? obj.pagamentiGiornalResiduo : 0;
      this.propostaSingolaOperLimite = obj.propostaSingolaOperLimite ? obj.propostaSingolaOperLimite : null;
      this.propostaPagamentiMensiliLimite = obj.propostaPagamentiMensiliLimite ?
        obj.propostaPagamentiMensiliLimite : null;
      this.propostaPagamentiGiornalLimite = obj.propostaPagamentiGiornalLimite ?
        obj.propostaPagamentiGiornalLimite : null;
      this.propostaNumeroOperGiornLimite = obj.propostaNumeroOperGiornLimite ?
        obj.propostaNumeroOperGiornLimite : null;
      this.propostaSingolaOperResiduo = obj.propostaSingolaOperResiduo ?
        obj.propostaSingolaOperResiduo : null;
      this.propostaPagamentiMensiliResiduo = obj.propostaPagamentiMensiliResiduo ?
        obj.propostaPagamentiMensiliResiduo : null;
      this.propostaPagamentiGiornalResiduo = obj.propostaPagamentiGiornalResiduo ?
        obj.propostaPagamentiGiornalResiduo : null;
      this.propostaNumeroOperGiornResiduo = obj.propostaNumeroOperGiornResiduo ?
        obj.propostaNumeroOperGiornResiduo : null;
      this.codiceDispositivo = obj.codiceDispositivo ? obj.codiceDispositivo : '';
      this.key = obj.key ? obj.key : '';
    };
    return Limite;
  }]);
  angular.module('ib').factory('Tasto', [function() {

    var Tasto = function(id, value) {
      this.id = id;
      this.value = value;
    };
    return Tasto;
  }]);

  angular.module('ib').factory('Avviso', [function() {

    var Avviso = function(obj) {
      this.descrizioneCondizione = obj.descrizioneCondizione;
      this.condizione = obj.condizione;
      this.informaz = obj.informaz;
      this.tipocond = obj.tipocond;
      this.condizione2 = obj.condizione2;
      this.indir = obj.indir;
      this.codCirc = obj.codCirc;
      this.tipoInd = obj.tipoInd;
      this.telefonoList = obj.telefonoList;
      this.telefonoOscuratoList = obj.telefonoOscuratoList;
      this.mailList = obj.mailList;
      this.importo = obj.importo;
      this.listaTelefoniValorizzata = obj.listaTelefoniValorizzata;
      this.listaEmailValorizzata = obj.listaEmailValorizzata;
      this.idCirc = obj.idCirc;
      this.mailAttivabile = obj.mailAttivabile;
      this.listaSmsDisponibili = obj.listaSmsDisponibili;
      this.listaMailDisponibili = obj.listaMailDisponibili;

      this.circuito = obj.circuito;
      this.idRapporto = obj.idRapporto;
      this.id = obj.id;
      this.servizio = obj.servizio;
      this.codiceCategoria = obj.codiceCategoria;
      this.frequenza = obj.frequenza;
      this.giorno = obj.giorno;
      this.telefonoSMS = obj.telefonoSMS;
      this.indiceIndirizzoMail = obj.indiceIndirizzoMail;
      this.stato = obj.stato;
      this.ora = obj.ora;
      this.progressivo = obj.progressivo;
      this.descrizioneFrequenza = obj.descrizioneFrequenza;
      this.inError = obj.descrizioneFrequenza;

      this.modello = obj.modello;
      this.causale = obj.causale;
      this.rapporto = obj.rapporto;

    };
    return Avviso;
  }]);

});
