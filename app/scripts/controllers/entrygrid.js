'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:EntrygridCtrl
 * @description
 * # EntrygridCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('EntrygridCtrl', function ($q, $scope, section, entry, slider, auth, entryPricing) {
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
         for (var i = $scope.section.entries.length - 1; i >= 0; i--) {
            $scope.section.entries[i].order = i + 1;
         }
         entry.saveAllEntries($scope.section.entries).then(
            function(){
               console.log('Success!');
            },
            function(err){
               console.log(err);
               window.alert('Server ERROR!');
            });
      };
      $scope.addSlider = function (entry) {
         slider.postSlider({
            'entry': entry.url, 
            'category': ' ', 
            'average_score': '0', 
            'sliders': [],
         }).then(
         function (data){
            console.log(data);
            entry.slider_templates.push(data);
         },
         function (err){
            console.log(err);
            window.alert('Server ERROR!');
         });
      };
      $scope.removeSlider = function (curEntry, dSlider, index) {
         console.log(curEntry);
         console.log(dSlider);
         slider.deleteSlider(dSlider).then(
            function (data){
               console.log(data);
               curEntry.slider_templates.splice(index,1);
            },
            function (err){
               console.log(err);
               window.alert('Server ERROR!');
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
               'entry_prices':[],
               'order': $scope.section.entries.length
         }).then(
            function (data){
               $scope.section.entries.push(data);
               console.log(data);
               $scope.addExtraPricing(data);
            },
            function (err){
               console.log(err);
               window.alert('Server ERROR!');
            });   
      };
      $scope.removeEntry = function(dEntry, index) {
         entry.deleteEntry(dEntry).then(
            function(data){
               console.log(data);
               $scope.section.entries.splice(index,1);
            },
            function(err) {
               console.log(err);
               window.alert('Server ERROR!');
            });
      };
      $scope.addExtraPricing = function(curEntry) {
         entryPricing.postEntryPrice({
            text: ' ',
            price: ' ',
            entry: curEntry.url
         }).then(
            function (data) {
               console.log(data);
               curEntry.entry_prices.push(data);
            },
            function (err) {
               console.log(err);
            });
      };
      $scope.removePricing = function(curEntry, dPricing, index) {
         entryPricing.deleteEntryPrice(dPricing).then(
            function (){
               curEntry.entry_prices.splice(index, 1);
            },
            function (err){
               console.log(err);
            });
      };
      encodeImage
   });
