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
      var sectionEndpoint = Restangular.all('sections/');

      return {
         creatingSection: false, 
         activeSection: null,
         activeSectionTemplate: 'custom', 
         // NEED TO ADD prices when they are relevant   
         postNewSection: function(title, description, menu) {
            var newSection = {
               name: title,
               description: description,
               menu: menu.url,
               entries: []
            };
            return sectionEndpoint.post(newSection);
         },
         updateSection: function(title, description, annotation, section) {
            var endURL = section.url.substring(section.url.length - 12);
            var restSection = Restangular.restangularizeElement(null, section,endURL);
            restSection.name = title;
            return restSection.put();
         }
      };
   });
