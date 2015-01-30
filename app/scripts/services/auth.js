'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.auth
 * @description
 * # auth
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
   .factory('auth', function (Restangular) {
      // Service logic
      var authEndpoint = Restangular.all('api-token-auth/');
      // Public API here
      return {
         login: function (username, password) {
            return authEndpoint.post(JSON.stringify({username: username, password: password}));
         },
         registerToken: function(token) {
            Restangular.setDefaultHeaders({'content-type': 'application/json', 'Authorization': 'Token '+ token});
         },
         isLogged: false,
         isNotFirstTime: false
      };
   });
