/*+
 * Function used to resolve problems in angular-datatables responsive
 * (ng-click doesn't work in details)
 */
function clickOnId(currentObj, attrToShow) {
  var currentId = jQuery(currentObj).attr(attrToShow);
  jQuery('#' + currentId).click();
}

function readMoreOrLess(currentObj, attrToShow) {
  currentObj.style.display = 'none';
  var currentId = jQuery(currentObj).attr(attrToShow);
  jQuery('#' + currentId).css('display', 'block');
}

/*
 * Mostra o nasconde gli elementi con id pari a quelli contenuti
 * negli attributi attrToShow e attrToHide del componente
 */
function showHideObj(currentObj, attrToShow, attrToHide) {
  var idToShow = jQuery(currentObj).attr(attrToShow);
  var idToHide = jQuery(currentObj).attr(attrToHide);
  jQuery('#' + idToShow).css('display', 'block');
  jQuery('#' + idToHide).css('display', 'none');
}
