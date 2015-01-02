'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:EntrygridCtrl
 * @description
 * # EntrygridCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('EntrygridCtrl', function ($q, $scope, section, entry, auth) {
      $scope.$watch(function() {
         return section.activeSection;
      }, function (newValue) {
         if (newValue !== null) {
            $scope.section = newValue;
            $scope.firstEntry = newValue.entries[0];
            $scope.activeTemplate = section.activeSectionTemplate;
         }
      });
      $scope.$watch(function() {
         return auth.isNotFirstTime;
      }, function (newValue) {
         $scope.isFirst = !newValue;
      });

      $scope.isEditingItems = false;
      $scope.saveItems = function() {
         entry.saveAllEntries($scope.section.entries).then(
            function(){
               console.log('Success!');
            },
            function(err){
               console.log(err);
            });
      };
      $scope.editItems = function () {
         $scope.isEditingItems = true;
      };
      $scope.previewItems = function () {
         $scope.isEditingItems = false;
      };
      $scope.addSlider = function (entry) {
         entry.slider_templates.push({
            'url': 'http://recommenu-test-api.herokuapp.com/slider_templates/1/', 
            'entry': 'http://recommenu-test-api.herokuapp.com/entries/1/', 
            'category': '', 
            'average_score': '0', 
            'sliders': [],
         });
      };
      $scope.addEntry = function() {
         entry.postEntry({
               'name': ' ', 
               'section': $scope.section.url, 
               'price': '', 
               'image': '', 
               'description': '', 
               'slider_templates': [],
               'entry_prices':[]
         }).then(
            function (data){
               $scope.section.entries.push(data);
               console.log(data);
            },
            function (err){
               console.log(err);
            });   
      };
      $scope.removeEntry = function(dEntry, index) {
         console.log(dEntry);
         console.log(index);
         entry.deleteEntry(dEntry).then(
            function(data){
               console.log(data);
               $scope.section.entries.splice(index,1);
            },
            function(err) {
               console.log(err);
            });
      };
   });
