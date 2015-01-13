'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.entries
 * @description
 * # entries
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
   .factory('entry', function ($q, Restangular, slider, entryPricing) {
       // Service logic
       // ...
      var entryEndpoint = Restangular.all('entries');

       // Public API here
      return {
         restangularizeEntries: function(entries) {
            for (var i in entries){
               entries[i].slider_templates = slider.restangularizeSliders(entries[i].slider_templates);
               entries[i].entry_prices = entryPricing.restangularizeEntryPricing(entries[i].entry_prices);
            }
            return Restangular.restangularizeCollection(null,entries,'entries'); 
         },
         restangularizeEntry: function(entry) {
            return Restangular.restangularizeEntry(null,entry,'entries');
         },
         postEntry: function(entry){
            return entryEndpoint.post(entry);
         },
         updateEntry: function(entry){
            return entry.patch();
         },
         deleteEntry: function(entry) {
            return entry.remove(); 
         },
         saveAllEntries: function(entries){
            var promises = [];
            for (var i = 0; i < entries.length; i++){
               var deffered  = $q.defer();
               entries[i].patch().then(deffered.resolve,deffered.reject);
               promises.push(deffered.promise);
            }
            return $q.all(promises);
         }
      };
  });
