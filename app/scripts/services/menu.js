'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.menu
 * @description
 * # menu
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('menu', function (Restangular) {
    // Service logic
    // ...
    var menuEndpoint = Restangular.all('menus/');

    // Public API here
    return {
      loadActiveMenu: function (clientID) {
        return menuEndpoint.getList({'company': clientID});
      },
      menus: [],
      loadedMenu: false
    };
  });