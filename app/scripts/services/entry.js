'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.entries
 * @description
 * # entries
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
   .factory('entry', function ($q, Restangular) {
       // Service logic
       // ...
      var entryEndpoint = Restangular.all('entries');

       // Public API here
      return {
         restangularizeEntries: function(entries) {
           return Restangular.restangularizeCollection(null,entries,'entries'); 
         },
         postEntry: function(entry){
           return entryEndpoint.post(entry);
         },
         updateEntry: function(entry){
           return entry.patch();
         },
         saveEntry: function(entry){
           return entry.save();
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
