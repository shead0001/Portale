(function() {

  window.require = {
    baseUrl: $('base').attr('href'),
    paths: {
      'env': 'env',
      'ib': 'common/ib',
      'util': 'common/util',
      'angular': 'common/lib/angular',
      'angular-mocks': 'common/lib/angular-mocks',
      'angular-ui-bootstrap': 'common/lib/ui-bootstrap-tpls',
      'angular-ui-router': 'common/lib/angular-ui-router',
      'ocLazyLoad': 'common/lib/ocLazyLoad.require',
      'angular-translate': 'common/lib/angular-translate',
      'angular-translate-loader-partial': 'common/lib/angular-translate-loader-partial',
      'angular-sanitize': 'common/lib/angular-sanitize',
      'highcharts-ng': 'common/lib/highcharts-ng',
      'angular-dynamic-locale': 'common/lib/tmhDynamicLocale',
      'angular-http-loader': 'common/lib/angular-http-loader',
      'angular-datatables': 'common/lib/angular-datatables',
      'angular-messages': 'common/lib/angular-messages',
      'uri': 'common/lib/uri',
      'angular-ui-select': 'common/lib/angular-ui-select',
      'angular-animate': 'common/lib/angular-animate'
    },
    shim: {
      'ib': {
        deps: ['env', 'util'],
        exports: 'ib'
      },
      'util': ['uri/URI'],
      'angular': {
        'exports': 'angular'
      },
      'angular-mocks': ['angular'],
      'angular-ui-bootstrap': ['angular'],
      'angular-ui-router': ['angular'],
      'ocLazyLoad': ['angular'],
      'angular-translate': ['angular'],
      'angular-translate-loader-partial': ['angular-translate'],
      'angular-sanitize': ['angular'],
      'highcharts-ng': ['angular'],
      'angular-dynamic-locale': ['angular'],
      'angular-http-loader': ['angular'],
      'angular-datatables': ['angular'],
      'angular-messages': ['angular'],
      'angular-ui-select': ['angular'],
      'angular-animate': ['angular'],
      'env': [
        'angular',
        'angular-mocks',
        'angular-ui-bootstrap',
        'angular-ui-router',
        'ocLazyLoad',
        'angular-translate',
        'angular-translate-loader-partial',
        'angular-sanitize',
        'highcharts-ng',
        'angular-dynamic-locale',
        'angular-http-loader',
        'angular-datatables',
        'angular-messages',
        'angular-ui-select',
        'angular-animate'
      ]
    }
  };

})();
