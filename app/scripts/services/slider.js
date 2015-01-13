'use strict';

/**
 * @ngdoc service
 * @name recommenuCmsApp.slider
 * @description
 * # slider
 * Factory in the recommenuCmsApp.
 */
angular.module('recommenuCmsApp')
   .factory('slider', function (Restangular) {
    // Service logic
    // ...

      var sliderEndpoint = Restangular.all('slider_templates');

    // Public API here
      return {
         postSlider: function (slider) {
            return sliderEndpoint.post(slider);
         },
         deleteSlider: function (slider) {
            return slider.remove();
         },
         updateSlider: function (slider) {
            return slider.patch();
         },
         restangularizeSliders: function (sliders) {
            return Restangular.restangularizeCollection(null, sliders, 'slider_templates');
         }
      };
   });
