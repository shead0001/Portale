define([
  'angular',
  'ib',
  'common/controllers/global.controller.js'
], function(angular, ib) {

  /**
   * Direttiva per generazione sidebar menu.
   * @type {element}
   * @namespace uic-sidebar-menu
   * @memberOf ng.directives
   */
  angular.module('ib').directive('uicSidebarMenu', [
    '$timeout',
    function($timeout) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          items: '='
        },
        templateUrl: 'common/directives/sidebar.directive.html',
        link: function($scope) {

          var contentWrapper = $('.content-wrapper');
          var body = $('body');

          $timeout(function() {

            var menutoggle = function(e) {
              var oElement = $('#menu li.opened').find('ul');
              //console.log('menutoggle', oElement);
              $('#sidebar-wrapper').css('overflow-y', 'hidden');
              contentWrapper.toggleClass('toggle-large');
              body.toggleClass('toggle-large');
              $('#menu ul').hide('slow');
              if (oElement.length === 1 && !oElement.is(':visible')) {
                oElement.addClass('sub-menu-visible');
                oElement.slideDown('normal');
              }
              e.preventDefault();
            };

            $('#menu-toggle-large').on('click', menutoggle);

            $('.overlay[data-sidebar-overlay]').on('click', function() {
              var menuUl;
              $('#sidebar-wrapper').css('overflow-y', 'hidden');
              if ($('body.toggle-large').length === 1) {
                contentWrapper.toggleClass('toggle-large');
                body.toggleClass('toggle-large');
                menuUl = $('#menu ul');
                menuUl.removeClass('sub-menu-visible');
                menuUl.hide('slow');
              }
              $('#menu li.opened').removeClass('opened');
              if ($('#menu a[ui-sref="' + ib.state.current.name.split('.')[0] + '"]').length > 0) {
                $('#menu a[ui-sref="' + ib.state.current.name.split('.')[0] + '"]')
                  .parents('li.f-menu').addClass('opened');
              }else {
                $('#menu a[ui-sref="' + ib.state.current.name + '"]')
                  .parents('li.f-menu').addClass('opened');
              }
            });

            $('.s-menu-icon').on('click', menutoggle);

          });

          var initMenuItem = function() {
            var checkElement = $(this).parent().next();
            var openedElement = $(this).parents('li');
            var ulSubMenu;
            $('#sidebar-wrapper').css('overflow-y', 'hidden');
            if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
              checkElement.toggleClass('sub-menu-visible');
              openedElement.toggleClass('opened');
              checkElement.slideUp('normal');
              return false;
            }
            if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
              ulSubMenu = $('#menu ul.sub-menu-visible');
              ulSubMenu.parents('li').removeClass('opened');
              ulSubMenu.slideUp('normal');
              ulSubMenu.removeClass('sub-menu-visible');
              checkElement.slideDown('normal');
              checkElement.addClass('sub-menu-visible');
              openedElement.addClass('opened');
              return false;
            }
          };

          var initSubMenu = function() {
            var subcheckElement = $(this).parent().next();
            var subopenedElement = $(this).closest('li');
            var ul2SubMenu;
            //console.log('subcheckElement', subcheckElement);
            if ((subcheckElement.is('ul')) && (subcheckElement.is(':visible'))) {
              subcheckElement.toggleClass('sub-menu-visible');
              subopenedElement.toggleClass('opened');
              subcheckElement.slideUp('normal');

              $('#sidebar-wrapper').css('overflow-y', 'hidden');
              return false;
            }
            if ((subcheckElement.is('ul')) && (!subcheckElement.is(':visible'))) {
              ul2SubMenu = $('#menu ul.sub-sub-menu.sub-menu-visible');
              ul2SubMenu.closest('li').removeClass('opened');
              ul2SubMenu.slideUp('normal');
              ul2SubMenu.removeClass('sub-menu-visible');

              subcheckElement.slideDown('normal');
              subcheckElement.addClass('sub-menu-visible');
              subopenedElement.addClass('opened');
              subcheckElement.find('ul.sub-4-menu').slideDown('normal');

              $('#sidebar-wrapper').css('overflow-y', 'scroll');

              return false;
            }
          };

          var initMenuIcon = function() {
            var liopen = $(this).parents('li');
            $('#sidebar-wrapper').css('overflow-y', 'hidden');
            if (!contentWrapper.hasClass('toggle-large') || liopen.hasClass('opened')) {
              contentWrapper.toggleClass('toggle-large');
              body.toggleClass('toggle-large');
            }
            var ulopen = $(this).parent().next();
            $('li.f-menu').removeClass('opened');
            $('#menu ul.sub-sub-menu.sub-menu-visible').closest('li').removeClass('opened');
            $('#menu ul').removeClass('sub-menu-visible');
            $('#menu ul').slideUp('normal');
            if ((ulopen.is('ul')) && !ulopen.is(':visible')) {
              liopen.toggleClass('opened');
              ulopen.slideDown('normal');
              ulopen.addClass('sub-menu-visible');
              return false;
            }
            if ((ulopen.is('ul')) && ulopen.is(':visible')) {
              liopen.removeClass('opened');
              ulopen.slideUp('normal');
              ulopen.removeClass('sub-menu-visible');
              return false;
            }
          };

          $scope.$watchCollection('items', function() {
            //console.log($scope.items);
            $timeout(function() {

              var menuUl = $('#menu ul');
              var menuLiArrow = $('#menu li a .arrow');
              var menuLi = $('#menu li a span.f-menu-icon');
              var menuSubLiArrow = $('#menu li a .sub-arrow');

              menuUl.hide();
              menuUl.children('.current').parent().show();

              menuLiArrow.off('click', initMenuItem);
              menuLiArrow.on('click', initMenuItem);

              menuLi.off('click', initMenuIcon);
              menuLi.on('click', initMenuIcon);

              menuSubLiArrow.off('click', initSubMenu);
              menuSubLiArrow.on('click', initSubMenu);

            });

          });

        }

      };
    }]);

});
