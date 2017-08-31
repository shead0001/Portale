/*eslint new-cap: 0*/
define([
  'angular',
  'ib'
], function(angular) {

  /**
   * @namespace $jsonSchema
   * @memberOf ng.services
   * @type {ng.service}
   */
  angular.module('ib').service('$jsonSchema', ['$exceptionHandler', function($exceptionHandler) {

    if (!window.Ajv) {
      throw new Error('ajv is not correctly loaded');
    }

    var ajv = window.Ajv();
    var service = {};
    var _schemas = {};

    service.validator = ajv;

    /**
     * Registra e compila un nuovo schema nel dizionario di schemas.
     * @function register
     * @memberOf ng.services.$jsonSchema
     * @throws {Error} Errore di compilazione o di schema precedentemente registrato.
     * @param schemaName {string} - Nome dello schema da registrare nel dizionario.
     * @param schemaObject {Object} - Oggetto schema da compilare e registrare nel dizionario.
     * @returns {function} - Funzione di validazione per lo schema registrato.
     */
    service.register = function(schemaName, schemaObject) {
      if (!_schemas[schemaName]) {
        try {
          var validate = ajv.compile(schemaObject);
          _schemas[schemaName] = validate;
          return validate;
        } catch (error) {
          throw $exceptionHandler(error);
        }
      } else {
        throw $exceptionHandler(new Error('schema is already registered'));
      }
    };

    /**
     * Effettua la validazione dell'oggetto objToValidate con lo schema registrato al nome schemaName.
     * @function validate
     * @memberOf ng.services.$jsonSchema
     * @param objToValidate {Object} - Oggetto da validare.
     * @param schemaName {string} - Nome dello schema con cui validare l'oggetto.
     * @returns {Object} - Oggetto risultato boolean in caso positivo, array di errori riscontrati in caso negativo.
     */
    service.validate = function(objToValidate, schemaName) {
      var validate = _schemas[schemaName];
      if (validate) {
        var result = validate(objToValidate);
        if (result === false) {
          var error = new Error('object not compliant with schema "' + schemaName + '"');
          error.data = objToValidate;
          error.invalids = validate.errors;
          console.log('schema validation errors:', validate.errors);
	  console.log('dataPath:', validate.errors[0].dataPath);
	  console.log('keyword:', validate.errors[0].keyword);
	  console.log('message:', validate.errors[0].message);
		
		
		
          return $exceptionHandler(error);
        } else {
          return true;
        }
      } else {
        throw $exceptionHandler(new Error('missing schema'));
      }
    };

    return service;

  }]);

});
