/**
 * Ordinatore per jqueryTable, colonna contenente la direttiva colouredcurrency
 */
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  'coloured-signed-num-ord-pre': function(a) {
    return parseFloat(jQuery('.originalFloatAmount', a).text());
  },

  'coloured-signed-num-ord-asc': function(a, b) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },

  'coloured-signed-num-ord-desc': function(a, b) {
    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});
