'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.client
 * @description
 * # client
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('client', function (Restangular) {
    // Service logic
    // ...

    var clientEndpoint = Restangular.all('companies/');

    // Public API here
    return {
      getCompanies: function () {
        return clientEndpoint.getList();
      },
      clients: null,
      selectedClient: null
    };
  });
