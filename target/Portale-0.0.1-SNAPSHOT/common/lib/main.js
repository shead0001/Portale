$(document).ready(function() {

  // funzione per lo scroll della pagina
  $(window).scroll(function() {
    if ($(this).scrollTop() !== 0) {
      $('#gototop').fadeIn();
    } else {
      $('#gototop').fadeOut();
    }
  });
  $('#gototop').click(function() {
    $('body,html').animate({scrollTop: 0}, 800);
  });

  // script per la funzionalita sulle widget
  $('a[data-widget="collapse"]').click(function() {
    var widget = $(this).parents('.widget');
    widget.find('.widget-body').slideToggle(1000);
  });

  // datepicker
  $('.calendario').datepicker({
    format: 'dd/mm/yyyy',
    language: 'it',
    autoclose: true,
    clearBtn: true
  });

  // toltip
  $('[data-toggle="tooltip"]').tooltip();

  //dropdown menuprofilo
  $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).parent().siblings().removeClass('open');
    $(this).parent().toggleClass('open');
  });

});
