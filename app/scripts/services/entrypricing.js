'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.entryPricing
 * @description
 * # entryPricing
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
   .factory('entryPricing', function ($q, Restangular) {
      // Service logic
      // ...

      var entryPriceEndpoint = Restangular.all('entry_prices/');

       // Public API here
      return {
         saveEntryPrices: function (entryPrices, entry) {
            var promises = [];
            for (var i = entryPrices.length - 1; i >= 0; i--) {
               var deffered  = $q.defer();
               entryPrices[i].entry = entry.url;
               entryPriceEndpoint.post(entryPrices[i]).then(deffered.resolve,deffered.reject);
               promises.push(deffered.promise);
            }
            return $q.all(promises);
         }
      };
   });
