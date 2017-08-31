define([
  'angular',
  'util',
  'ib',
  'conti/services/conto.service.js'
], function(angular, util, ib) {

  angular.module('ib').controller('homeContiController', [
    '$q',
    'contoService',
    '$timeout',
    '$locale',
    '$filter',
    '$translate',
    '$exceptionNotifier',
    function($q, contoService, $timeout, $locale, $filter, $translate, $exceptionNotifier) {

      var self = this;

      self.visibile = true;
      self.saldoTotaleContabile = 0;
      self.saldoTotaleDisponibile = 0;
      self.dataAggiornamento = new Date();

      self.listaConti = [];
      self.graficoSaldiMensili = {
        options: {
          chart: {
            type: 'column'
          },
          tooltip: {
            //FIX: this is actually ignored...
            formatter: function() {
              var s = '<b>' + this.series.name + '</b>';

              s += '<br/>' + this.x + ': ' +
                $filter('currency')(this.y, '€');

              return s;
            },
            shared: false
          }
        },
        series: [],
        xAxis: {
          categories: []
        },
        yAxis: {
          title: null
        }
      };

      $translate.refresh().then(function() {
        $translate('Saldo disponibile €').then(function(title) {
          self.graficoSaldiMensili.title = {text: title};
        });
      });

      self.aggiorna = function() {
        self.graficoSaldiMensili.options.colors =
                ['#7cb5ec',
                 '#90ed7d',
                 '#f7a35c',
                 '#8085e9',
                 '#f15c80',
                 '#e4d354',
                 '#2b908f',
                 '#f45b5b',
                 '#91e8e1'
                ];

        contoService.listaContiCompleta().then(function(conti) {
          //TODO: Agganciare servizi reali. Per simulare l'assenza del prodotto
          // decommentare la riga seguente.
          //conti = [];
          self.listaConti = conti;
          if (self.listaConti.length > 0) {
            self.visibile = true;
            self.saldoTotaleContabile = 0;
            self.saldoTotaleDisponibile = 0;
            self.totaleSommePrenotate = 0;
            var promises = [];

            conti.forEach(function(conto) {
              self.saldoTotaleContabile += conto.saldoContabile;
              self.saldoTotaleDisponibile += conto.saldoDisponibile;
              self.totaleSommePrenotate += conto.sommePrenotate;
              var dataEndTmp = new Date();
              var dataStartTmp = new Date();
              dataStartTmp.setMonth(dataEndTmp.getMonth() - 6);
              var dataEnd = util.dateToGGMMYYYY(dataEndTmp);
              var dataStart = util.dateToGGMMYYYY(dataStartTmp);

              promises.push(contoService.trendSaldi(conto.numeroContoIban, dataStart, dataEnd, 'Mese'));
              //promises.push(contoService.listaSommePrenotate(conto.idRapporto));
            });
            $q.all(promises).then(function(serieSaldi) {
              self.graficoSaldiMensili.xAxis.categories = util.getLastMonths(new Date(), -6)
                .map(function(month) {
                return $locale.DATETIME_FORMATS.MONTH[month];
              });
              self.graficoSaldiMensili.series = [];
              serieSaldi.forEach(function(serieSaldo) {
                var vettoreIstogramma = [];
                serieSaldo.data.forEach(function(item) { vettoreIstogramma.push(item.saldo); });
                self.graficoSaldiMensili.series.push({
                  name: serieSaldo.name,
                  data: vettoreIstogramma
                });
              });
              self.dataAggiornamento = new Date();
            }).catch(function(errore) {
              $exceptionNotifier(errore);
            });
          }
        }).catch(function(errore) {
          $exceptionNotifier(errore);
        });
      };

      var languageChanged = function() {
        $translate.refresh().then(function() {
          $translate('Saldo disponibile €').then(function(title) {
            self.graficoSaldiMensili.title = {text: title};
          });
        });

        self.graficoSaldiMensili.options.colors =
                ['#7cb5ec',
                 '#90ed7d',
                 '#f7a35c',
                 '#8085e9',
                 '#f15c80',
                 '#e4d354',
                 '#2b908f',
                 '#f45b5b',
                 '#91e8e1'
                ];
        self.graficoSaldiMensili.xAxis.categories = util.getLastMonths(new Date(), -6).map(function(month) {
          return $locale.DATETIME_FORMATS.MONTH[month];
        });
      };
      ib.rootScope.$on('$languageChanged', languageChanged);

      ib.rootScope.$on('$stateChangeStart', function() {
        ib.rootScope.$off('$languageChanged', languageChanged);
      });

      self.aggiorna();

    }
  ]);

});
