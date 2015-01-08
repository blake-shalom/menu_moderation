'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.client
 * @description
 * # client
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('client', function (Restangular, menu) {
    // Service logic
    var clientEndpoint = Restangular.all('companies/');

    // Public API here
    return {
      getCompanies: function () {
        return clientEndpoint.getList();
      },
      selectCompany: function(client) {
        this.selectedClient = client;
        return menu.loadActiveMenu(client.id);
      },
      createCompany: function(client) {
        return clientEndpoint.post(client);
      },
      clients: null,
      selectedClient: null
    };
  });
