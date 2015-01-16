'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.section
 * @description
 * # section
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('section', function ($http, $q, Restangular) {
      // Service logic
      // Public API here
      var sectionEndpoint = Restangular.all('sections');

      return {
         creatingSection: false, 
         activeSection: null,
         activeSectionTemplate: 'normal', 
         // NEED TO ADD prices when they are relevant   
         postNewSection: function(newSection) {
            return sectionEndpoint.post(newSection);
         },
         restangularizeSections: function(sections) {
            return Restangular.restangularizeCollection(null,sections,'sections');
         },
         updateSection: function(section) {
            return section.patch();
         },
         deleteSection: function(section) {
            return section.remove();
         },
         saveAllSections: function(sections) {
            var promises = [];
            for (var i = 0; i < sections.length; i++){
               console.log(sections[i]);
               var deffered  = $q.defer();
               // sections[i].patch().then(deffered.resolve,deffered.reject);
               sections[i].put().then(function(data){console.log(data)},deffered.reject);
               promises.push(deffered.promise);
            }
            return $q.all(promises);
         }
      };
   });
