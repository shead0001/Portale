define([
  'angular',
  'ib',
  'util',
  'home/services/situazione.service.js'
], function(angular, ib, util) {

  angular.module('ib').controller('homeSituazioneController', [
    '$rootScope',
    '$q',
    'situazioneService',
    '$timeout',
    '$locale',
    '$filter',
    '$translate',
    '$exceptionNotifier',
    function($rootScope, $q, situazioneService, $timeout, $locale, $filter, $translate, $exceptionNotifier) {

      var self = this;
      self.visibile = true;

      self.numeroCarte = 0;
      self.numeroConti = 0;
      self.numeroFidi = 0;
      self.numeroPrestiti = 0;

      self.dataAggiornamento = new Date();
      self.listaProdottiClienti = {};

      self.graficoSituazioneConti = {
        options: {
          colors: ['#CCCCCC', '#E3001B'],
          credits: {
            enabled: false
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          title: {
            text: '<b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          },
          plotOptions: {
            pie: {
              dataLabels: {
                //TODO: changes should redraw the chart
                enabled: util.isLabelVisible(),
                distance: 10,
                style: {
                  fontWeight: 'bold',
                  color: '#262d37',
                  textShadow: '0px 1px 1px #ffffff'
                }
              },
              startAngle: -100,
              endAngle: 100,
              center: ['50%', '65%']
            }
          }
        },
        series: [{
          type: 'pie',
          name: '...',
          innerSize: '75%',
          data: []
        }]
      };

      self.graficoSituazioneCarte = {
        options: {
          colors: ['#CCCCCC', '#E3001B'],
          credits: {
            enabled: false
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          title: {
            text: '<b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          },
          plotOptions: {
            pie: {
              dataLabels: {
                //TODO: changes should redraw the chart
                enabled: util.isLabelVisible(),
                distance: 10,
                style: {
                  fontWeight: 'bold',
                  color: '#262d37',
                  textShadow: '0px 1px 1px #ffffff'
                }
              },
              startAngle: -100,
              endAngle: 100,
              center: ['50%', '65%']
            }
          }
        },
        series: [{
          type: 'pie',
          name: '...',
          innerSize: '75%',
          data: []
        }]
      };

      self.graficoSituazionePrestiti = {
        options: {
          colors: ['#CCCCCC', '#E3001B'],
          credits: {
            enabled: false
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          title: {
            text: '<b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          },
          plotOptions: {
            pie: {
              dataLabels: {
                //TODO: changes should redraw the chart
                enabled: util.isLabelVisible(),
                distance: 10,
                style: {
                  fontWeight: 'bold',
                  color: '#262d37',
                  textShadow: '0px 1px 1px #ffffff'
                }
              },
              startAngle: -100,
              endAngle: 100,
              center: ['50%', '65%']
            }
          }
        },
        series: [{
          type: 'pie',
          name: '...',
          innerSize: '75%',
          data: []
        }]
      };

      self.graficoSituazioneApertureCredito = {
        options: {
          colors: ['#CCCCCC', '#E3001B'],
          credits: {
            enabled: false
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          title: {
            text: '<b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          },
          plotOptions: {
            pie: {
              dataLabels: {
                //TODO: changes should redraw the chart
                enabled: util.isLabelVisible(),
                distance: 10,
                style: {
                  fontWeight: 'bold',
                  color: '#262d37',
                  textShadow: '0px 1px 1px #ffffff'
                }
              },
              startAngle: -100,
              endAngle: 100,
              center: ['50%', '65%']
            }
          }
        },
        series: [{
          type: 'pie',
          name: '...',
          innerSize: '75%',
          data: []
        }]
      };

      $translate.refresh().then(function() {

        $translate(['Bilancio CC', 'ultimo mese']).then(function(dict) {
          self.graficoSituazioneConti.title = {
            text: '<b>' + dict['Bilancio CC'] + '</b><br/>' + dict['ultimo mese'] + '<br/> <b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          };
        });

        $translate(['Carte', 'plafond']).then(function(dict) {
          self.graficoSituazioneCarte.title = {
            text: '<b>' + dict['Carte'] + '</b><br/>' + dict['plafond'] + '<br/> <b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          };
        });

        $translate(['Prestiti personali', 'Rate residue']).then(function(dict) {
          self.graficoSituazionePrestiti.title = {
            text: '<b>' + dict['Prestiti personali'] + '</b><br/>' + dict['Rate residue'] + '<br/> <b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          };
        });

        $translate(['Fido', 'Disponibilità']).then(function(dict) {
          self.graficoSituazioneApertureCredito.title = {
            text: '<b>' + dict['Fido'] + '</b><br/>' + dict['Disponibilità'] + '<br/> <b>...</b>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {'fontSize': '13px'}
          };
        });

      });

      self.aggiorna = function() {
        self.listaProdottiClienti = situazioneService.prodottiCliente()
          .then(function(prodotti) {

            self.prodottiCliente = prodotti;

            $rootScope.$broadcast('prodotti-update', prodotti);

            self.numeroCarte = prodotti.numeroCarte;
            self.numeroConti = prodotti.numeroConti;
            self.numeroFidi = prodotti.numeroFidi;
            self.numeroPrestiti = prodotti.numeroPrestiti;

            var numTipiProdotti = 0;
            var _index = 0;
/*
            if (self.numeroFidi === 0) {
              var fidiScope = angular.element(document.getElementById('fidoSection')).scope();
              fidiScope.$destroy();
              _index = 4;//util.getAccordionSectionIndexByElementId(_sections, 'fidoSection');
              $('#home-accordion').data('zozoAccordion').remove(_index);
              $('#home-accordion').data('zozoAccordion').refresh();
            }
            if (self.numeroPrestiti === 0) {
              var prestitiScope = angular.element(document.getElementById('prestitiSection')).scope();
              prestitiScope.$destroy();
              _index = 3;//util.getAccordionSectionIndexByElementId(_sections, 'prestitiSection');
              $('#home-accordion').data('zozoAccordion').remove(_index);
              $('#home-accordion').data('zozoAccordion').refresh();
            }
            if (self.numeroCarte === 0) {
              var carteScope = angular.element(document.getElementById('carteSection')).scope();
              carteScope.$destroy();
              _index = 2;
              $('#home-accordion').data('zozoAccordion').remove(_index);
              $('#home-accordion').data('zozoAccordion').refresh();
            }
            if (self.numeroConti === 0) {
              var contiScope = angular.element(document.getElementById('contiSection')).scope();
              contiScope.$destroy();
              _index = 1;
              $('#home-accordion').data('zozoAccordion').remove(_index);
              $('#home-accordion').data('zozoAccordion').refresh();
            }

            if (self.numeroCarte > 0) {numTipiProdotti++;}
            if (self.numeroConti > 0) {numTipiProdotti++;}
            if (self.numeroFidi > 0) {numTipiProdotti++;}
            if (self.numeroPrestiti > 0) {numTipiProdotti++;}

            if (numTipiProdotti === 1) {
              _index = 0;//util.getAccordionSectionIndexByElementId(_sections, 'contiSection');
              $('#home-accordion').data('zozoAccordion').remove(_index);
              $('#home-accordion section header.intestazione').css('display', 'none');
            }
            $('#home-accordion').data('zozoAccordion').refresh();
            */

            $translate(['Bilancio CC', 'Entrate', 'Uscite', 'ultimo mese']).then(function(dict) {
              var contiEntrate = prodotti.contiEntrate;
              var contiUscite = Math.abs(prodotti.contiUscite);
              var contiUltimoMese = contiEntrate + contiUscite;//prodotti.contiUltimoMese;

              self.graficoSituazioneConti.title = {
                text: ('<b>' + dict['Bilancio CC'] + '</b><br/>' + dict['ultimo mese'] + '<br/> <b>' +
                       $filter('currency')(contiUltimoMese) + '</b>'),
                align: 'center',
                verticalAlign: 'middle',
                y: 0,
                style: {'fontSize': '13px'}
              };

              self.graficoSituazioneConti.series = [{
                type: 'pie',
                name: dict['Bilancio CC'],
                innerSize: '75%',
                data: [
                  [dict['Entrate'] + '<br/>' +
                   $filter('currency')(contiEntrate),
                   contiEntrate],
                  [dict['Uscite'] + '<br/>' +
                   $filter('currency')(contiUscite),
                   contiUscite],
                  {
                    name: dict['Bilancio CC'],
                    y: 0.2,
                    dataLabels: {enabled: false}
                  }
                ]
              }];

              self.dataAggiornamento = new Date();

            });

            $translate(['Carte', 'Spese', 'Residuo', 'plafond']).then(function(dict) {
              var carteSpese = prodotti.carteTotUtilizzi;
              var carteDisponibilita = prodotti.carteTotSaldo;
              var carteTotale = prodotti.carteTotFido;

              self.graficoSituazioneCarte.title = {
                text: ('<b>' + dict['Carte'] + '</b><br/>' + dict['plafond'] + '<br/> <b>' +
                       $filter('currency')(carteTotale) + '</b>'),
                align: 'center',
                verticalAlign: 'middle',
                y: 0,
                style: {'fontSize': '13px'}
              };

              self.graficoSituazioneCarte.series = [{
                type: 'pie',
                name: dict['Carte'],
                innerSize: '75%',
                data: [
                 [dict['Residuo'] + '<br/>' +
                   $filter('currency')(carteDisponibilita),
                   carteDisponibilita],
                 [dict['Spese'] + '<br/>' +
                   $filter('currency')(carteSpese),
                   carteSpese],
                   {
                    name: dict['Carte'],
                    y: 0.2,
                    dataLabels: {enabled: false}
                  }
                ]
              }];

              self.dataAggiornamento = new Date();

            });

            $translate(['Prestiti Personali', 'Pagato', 'Residuo']).then(function(dict) {
              var prestitiPagato = prodotti.prestitiTotSaldo;
              var prestitiResiduo = prodotti.prestitiTotDebitoResiduo;
              var prestitiRateRimanenti = prodotti.prestitiTotFinanziato;

              self.graficoSituazionePrestiti.title = {
                text: ('<b>' + dict['Prestiti Personali'] + '</b><br/><b>' +
                        $filter('currency')(prestitiRateRimanenti) + '</b>'),
                align: 'center',
                verticalAlign: 'middle',
                y: 0,
                style: {'fontSize': '13px'}
              };

              self.graficoSituazionePrestiti.series = [{
                type: 'pie',
                name: dict['Prestiti Personali'],
                innerSize: '75%',
                data: [
                  [dict['Pagato'] + '<br/>' +
                   $filter('currency')(prestitiPagato),
                   prestitiPagato],
                  [dict['Residuo'] + '<br/>' +
                   $filter('currency')(prestitiResiduo),
                   prestitiResiduo],
                  {
                    name: dict['Prestiti Personali'],
                    y: 0.2,
                    dataLabels: {enabled: false}
                  }
                ]
              }];

              self.dataAggiornamento = new Date();

            });

            $translate(['Fido', 'Utilizzato', 'Residuo', 'Disponibilità']).then(function(dict) {
              var fidoUtilizzato = prodotti.apertureCredTotSaldo;
              var fidoResiduo = prodotti.apertureCredTotDispo;
              var fidoDisponibilita = prodotti.apertureCredTotFido;

              self.graficoSituazioneApertureCredito.title = {
                text: ('<b>' + dict['Fido'] + '</b><br/>' + dict['Disponibilità'] + '<br/> <b>' +
                       $filter('currency')(fidoDisponibilita) + '</b>'),
                align: 'center',
                verticalAlign: 'middle',
                y: 0,
                style: {'fontSize': '13px'}
              };

              self.graficoSituazioneApertureCredito.series = [{
                type: 'pie',
                name: dict['Fido'],
                innerSize: '75%',
                data: [
                  [dict['Utilizzato'] + '<br/>' +
                   $filter('currency')(fidoUtilizzato),
                   fidoUtilizzato],
                  [dict['Residuo'] + '<br/>' +
                   $filter('currency')(fidoResiduo),
                   fidoResiduo],
                  {
                    name: dict['Fido'],
                    y: 0.2,
                    dataLabels: {enabled: false}
                  }
                ]
              }];

              self.dataAggiornamento = new Date();

            });

          }).catch(function(errore) {
            $exceptionNotifier(errore);
          });
      };

      var languageChanged = function() {
        $translate.refresh().then(function() {

          $translate(['Bilancio CC', 'Entrate', 'Uscite', 'ultimo mese']).then(function(dict) {
            self.graficoSituazioneConti.title = {
              text: '<b>' + dict['Bilancio CC'] + '</b><br/>' + dict['ultimo mese'] + '<br/> <b>...</b>',
              align: 'center',
              verticalAlign: 'middle',
              y: 0,
              style: {'fontSize': '13px'}
            };

            var contiEntrate = 1250;
            var contiUscite = 650;
            self.graficoSituazioneConti.series = [{
              type: 'pie',
              name: dict['Bilancio CC'],
              innerSize: '75%',
              data: [
                [dict['Entrate'] + '<br/>' +
                 $filter('currency')(contiEntrate),
                 contiEntrate],
                [dict['Uscite'] + '<br/>' +
                 $filter('currency')(contiUscite),
                 contiUscite]
              ]
            }];
          });

          $translate(['Carte', 'Spese', 'Residuo', 'plafond']).then(function(dict) {
            self.graficoSituazioneCarte.title = {
              text: '<b>' + dict['Carte'] + '</b><br/>' + dict['plafond'] + '<br/> <b>...</b>',
              align: 'center',
              verticalAlign: 'middle',
              y: 0,
              style: {'fontSize': '13px'}
            };
            var carteSpese = self.graficoSituazioneCarte.series[0].data[0][1];
            var carteDisponibilita = self.graficoSituazioneCarte.series[0].data[1][1];

            self.graficoSituazioneCarte.series = [{
              type: 'pie',
              name: dict['Carte'],
              innerSize: '75%',
              data: [
                [dict['Spese'] + '<br/>' +
                 $filter('currency')(carteSpese),
                 carteSpese],
                [dict['Residuo'] + '<br/>' +
                 $filter('currency')(carteDisponibilita),
                 carteDisponibilita]
              ]
            }];
          });
          $translate(['Prestiti Personali', 'Pagato', 'Residuo', 'Rate residue']).then(function(dict) {
            self.graficoSituazionePrestiti.title = {
              text: '<b>' + dict['Prestiti Personali'] + '</b><br/>' + dict['Rate residue'] + '<br/> <b>...</b>',
              align: 'center',
              verticalAlign: 'middle',
              y: 0,
              style: {'fontSize': '13px'}
            };

            var prestitiPagato = 1000;//(situazione.carte.totaleImportoFido - situazione.carte.totaleDisponibilita);
            var prestitiResiduo = 9000;//situazione.carte.totaleDisponibilita;
            self.graficoSituazioneCarte.series = [{
              type: 'pie',
              name: dict['Prestiti Personali'],
              innerSize: '75%',
              data: [
                [dict['Pagato'] + '<br/>' +
                 $filter('currency')(prestitiPagato),
                 prestitiPagato],
                [dict['Residuo'] + '<br/>' +
                 $filter('currency')(prestitiResiduo),
                 prestitiResiduo]
              ]
            }];
          });

          $translate(['Fido', 'Utilizzato', 'Residuo', 'Disponibilità']).then(function(dict) {
            self.graficoApertureCredito.title = {
              text: '<b>' + dict['Fido'] + '</b><br/>' + dict['Disponibilità'] + '<br/> <b>...</b>',
              align: 'center',
              verticalAlign: 'middle',
              y: 0,
              style: {'fontSize': '13px'}
            };

            var fidoUtilizzato = 1000;//(situazione.carte.totaleImportoFido - situazione.carte.totaleDisponibilita);
            var fidoResiduo = 4000;//situazione.carte.totaleDisponibilita;
            self.graficoApertureCredito.series = [{
              type: 'pie',
              name: dict['Fido'],
              innerSize: '75%',
              data: [
                [dict['Utilizzato'] + '<br/>' +
                 $filter('currency')(fidoUtilizzato),
                 fidoUtilizzato],
                [dict['Residuo'] + '<br/>' +
                 $filter('currency')(fidoResiduo),
                 fidoResiduo]
              ]
            }];
          });

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
