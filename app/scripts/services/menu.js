'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.menu
 * @description
 * # menu
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('menu', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      getData: function () {
        return meaningOfLife;
      }
    };
  });
