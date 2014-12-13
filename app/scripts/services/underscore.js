'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.underscore
 * @description
 * # underscore
 * Factory in the recommenuCmsApp.
 */
var underscore = angular.module('underscore', []); 
underscore.factory('_', function() { 
  return window._;
});
