'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddsectionCtrl
 * @description
 * # AddsectionCtrl
 * Controller of the recommenuCmsApp
 */

angular.module('recommenuCmsApp')
   .controller('AddsectionCtrl', function ($scope, $location, section, menu, auth) {
      $scope.$watch(function() {
         return section.activeSection;
      }, function (newValue) {
         if (newValue !== null) {
            $scope.section = newValue;
            $scope.isEditing = true;
         }
         else {
            $scope.isEditing = false;
         }
      });
      $scope.$watch(function() {
         return menu.activeMenu;
      }, function (newValue){
         if (newValue !== null){
            $scope.menuTitle = newValue.name;
         }
      });
      $scope.$watch(function() {
         return auth.isNotFirstTime;
      }, function (newValue) {
         $scope.isFirst = !newValue;
      });
      $scope.section = {};
      $scope.isEditing = false;
      $scope.title = '';
      $scope.description = '';
      $scope.annotation = '';
      $scope.hasExtraPricing = 'No';
      $scope.extraPricing = [{price:'', description:''}];
      $scope.selectedTemplate = 'regular';
      $scope.willPostExtraPricing = false;
      
      $scope.addExtraPricing = function() {
         $scope.extraPricing.push({price:'', description:''});
      };
      $scope.newExtraPricing = function() {  
         $scope.willPostExtraPricing = true;
      };
      $scope.clearPricing = function() {
         $scope.willPostExtraPricing = false;
      };
      $scope.createSection = function() {
         if ($scope.section.title === ''){
            window.alert('ENTER A TITLE');
         }
         else {
            $scope.extraPricing = (($scope.willPostExtraPricing === false) ? [] : $scope.extraPricing);
            $scope.section.menu = menu.activeMenu.url;
            $scope.section.entries = [];
            $scope.section.section_prices = $scope.extraPricing;
            $scope.section.order = menu.activeMenu.sections.length;
            section.postNewSection($scope.section).then (
               function(data){
                  section.activeSection = data;
                  section.creatingSection = false;
                  section.activeTemplate = $scope.selectedTemplate;
                  menu.activeMenu.sections.push(data);
                  $location.path( '/entries/' );
               },
               function(err){
                  console.log(err);
                  window.alert('Server ERROR!');
               }
            );
         }
      };
      $scope.updateSection = function() {
         if ($scope.section.title === ''){
            window.alert('ENTER A TITLE');
         }
         else {
            $scope.willPostExtraPricing = (($scope.willPostExtraPricing === false) ? [] : $scope.willPostExtraPricing);
            section.updateSection($scope.section).then (
               function(data){
                  console.log(data);
                  section.activeSection = data;
                  $location.path('/entries/');
               },
               function(err){
                  console.log(err);
                  window.alert('Server ERROR!');
               }
            );
         }   
      };
      $scope.removeSection = function() {
         section.deleteSection(section.activeSection).then(
            function (){
               console.log('Success!');
               section.activeSection = menu.activeMenu.sections[0];
            },
            function (err){
               console.log(err);
               window.alert('Server ERROR!');
            });
      };
      $scope.removePricing = function (index) {
         $scope.extraPricing.splice(index,1);
      };
   });
