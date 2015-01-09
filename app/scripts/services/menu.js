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
    var menuEndpoint = Restangular.all('menus');

    // Public API here
    return {
      loadActiveMenu: function (clientID) {
        return menuEndpoint.getList({'company': clientID});
      },
      // NEED TO ADD FOOTER ONCE DATA MODEL CHANGES
      createMenu: function (newMenu) {
        return menuEndpoint.post(newMenu);
      },
      isAddingMenu: false,
      menus: [],
      activeMenu: null,
      loadedMenu: false
    };
  });