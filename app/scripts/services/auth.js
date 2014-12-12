'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.auth
 * @description
 * # auth
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('auth', function () {
    // Service logic
    // ...
    var meaningOfLife = 42;

    // Public API here
    return {
      auth: function () {
        return meaningOfLife;
      },
      isLogged: true
    };
  });
