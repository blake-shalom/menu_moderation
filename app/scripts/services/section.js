'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.section
 * @description
 * # section
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
  .factory('section', function ($http, Restangular) {
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
         }
      };
   });
