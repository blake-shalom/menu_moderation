'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.section
 * @description
 * # section
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('section', function ($http, $q, Restangular, sectionPricing) {
      // Service logic
      // Public API here
      var sectionEndpoint = Restangular.all('sections');

      return {
         creatingSection: false, 
         activeSection: null,
         activeSectionTemplate: 'normal', 
         postNewSection: function(newSection) {
            return sectionEndpoint.post(newSection);
         },
         restangularizeSections: function(sections) {
            for (var i in sections) {
               sections[i].section_prices = sectionPricing.restangularizeSectionPricing(sections[i].section_prices);
            }
            return Restangular.restangularizeCollection(null,sections,'sections');
         },
         updateSection: function(section) {
            return section.put();
         },
         deleteSection: function(section) {
            return section.remove();
         },
         saveAllSections: function(sections) {
            var promises = [];
            for (var i = 0; i < sections.length; i++){
               console.log(sections[i]);
               var deffered  = $q.defer();
               sections[i].put().then(deffered.resolve,deffered.reject);
               promises.push(deffered.promise);
            }
            return $q.all(promises);
         }
      };
   });
