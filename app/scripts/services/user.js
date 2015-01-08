'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.user
 * @description
 * # user
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('user', function (Restangular) {
    // Service logic
    // ...

    var userEndpoint = Restangular.all('users');

    // Public API here
    return {
      createUser: function (user) {
        return userEndpoint.post(user);
      }
    };
  });
