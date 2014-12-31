'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddsectionCtrl
 * @description
 * # AddsectionCtrl
 * Controller of the recommenuCmsApp
 */

angular.module('recommenuCmsApp')
   .controller('AddsectionCtrl', function ($scope, $location, section, menu) {
      $scope.$watch(function() {
         return section.activeSection;
      }, function (newValue) {
         if (newValue !== null) {
            $scope.title = newValue.name;
            $scope.isEditing = true;
            // NEED TO FILL OUT REST OF FORMS
         }
         else {
            $scope.isEditing = false;
         }
      });
      $scope.isEditing = false;
      $scope.title = '';
      $scope.description = '';
      $scope.annotation = '';
      $scope.hasExtraPricing = 'No';
      $scope.extraPricing = [];
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
         if ($scope.title === ''){
            window.alert('ENTER A TITLE');
         }
         else {
            $scope.extraPricing = (($scope.willPostExtraPricing === false) ? [] : $scope.willPostExtraPricing);
            section.postNewSection($scope.title, $scope.description, menu.activeMenu, $scope.extraPricing).then (
               function(data){
                  section.activeSection = data;
                  section.creatingSection = false;
                  section.activeTemplate = $scope.selectedTemplate;
                  menu.activeMenu.sections.push(data);
                  $location.path( '/entries/' );
               },
               function(err){
                  console.log(err);
               }
            );
         }
      };
      $scope.updateSection = function() {
         if ($scope.title === ''){
            window.alert('ENTER A TITLE');
         }
         else {
            $scope.willPostExtraPricing = (($scope.willPostExtraPricing === false) ? [] : $scope.willPostExtraPricing);
            section.updateSection($scope.title, $scope.description, $scope.annotation, section.activeSection).then (
               function(){
                  $location.path('/entries/');
               },
               function(err){
                  console.log('ERROR');
                  console.log(err);
               }
            );
         }   
      };
   });
