'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.sectionPricing
 * @description
 * # sectionPricing
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
   .factory('sectionPricing', function ($q, Restangular) {
      // Service logic
      // ...

      var sectionPriceEndpoint = Restangular.all('section_prices/');

      // Public API here
      return {
         saveSectionPricesToSection: function (sectionPrices, section) {
            var promises = [];
            for (var i = sectionPrices.length - 1; i >= 0; i--) {
               var deffered  = $q.defer();
               sectionPrices[i].section = section.url;
               sectionPriceEndpoint.post(sectionPrices[i]).then(deffered.resolve,deffered.reject);
               promises.push(deffered.promise);
            }
            return $q.all(promises);
         }
      };
   });
