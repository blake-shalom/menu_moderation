'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.client
 * @description
 * # client
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('client', function (Restangular, $cookies, menu) {
    // Service logic
    var clientEndpoint = Restangular.all('companies');

    // Public API here
    return {
      getCompanies: function () {
        return clientEndpoint.getList();
      },
      selectCompany: function(client) {
        $cookies.selectedClient = client.name;
        this.selectedClient = client;
        console.log($cookies.selectedClient);
        return menu.loadActiveMenu(client.id);
      },
      createCompany: function(client) {
        return clientEndpoint.post(client);
      },
      putCompany: function(client) {
        return client.put();
      },
      clients: null,
      selectedClient: null
    };
  });
