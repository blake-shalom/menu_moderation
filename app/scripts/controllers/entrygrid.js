'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:EntrygridCtrl
 * @description
 * # EntrygridCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('EntrygridCtrl', function ($scope, section) {
      $scope.$watch(function() {
         return section.activeSection;
      }, function (newValue) {
         if (newValue !== null) {
            $scope.section = newValue;
            $scope.activeTemplate = section.activeSectionTemplate;
         }
      });
      $scope.isEditingItems = false;
      $scope.editItems = function() {
         $scope.isEditingItems = true;
      };
      $scope.previewItems = function() {
         $scope.isEditingItems = false;
      };
      $scope.addSlider = function(entry) {
         entry.slider_templates.push({
            'url': 'http://recommenu-test-api.herokuapp.com/slider_templates/1/', 
            'entry': 'http://recommenu-test-api.herokuapp.com/entries/1/', 
            'category': '', 
            'average_score': '0', 
            'sliders': []
         });
      };
      $scope.addEntry = function() {
         $scope.section.entries.push({
            'id': 0, 
            'url': '', 
            'name': '', 
            'section': '', 
            'price': '', 
            'image': '', 
            'description': '', 
            'star_average': '', 
            'five_agg': 0, 
            'four_agg': 0, 
            'three_agg': 0, 
            'two_agg': 0, 
            'one_agg': 0, 
            'top_comment': '', 
            'review_count': 0, 
            'hosted': true, 
            'slider_templates': []
         });
      };
   });
