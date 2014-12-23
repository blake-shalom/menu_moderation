'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddsectionCtrl
 * @description
 * # AddsectionCtrl
 * Controller of the recommenuCmsApp
 */

 // MAKE IT SO THAT "NO" DOESnT CLEAR PRICING STRUCTURE
angular.module('recommenuCmsApp')
   .controller('AddsectionCtrl', function ($scope, $location, section, menu) {
      $scope.title = '';
      $scope.description = '';
      $scope.hasExtraPricing = 'No';
      $scope.extraPricing = [];
      $scope.selectedTemplate = 'regular';
      $scope.addExtraPricing = function() {
         $scope.extraPricing.push({price:'', description:''});
      };
      $scope.newExtraPricing = function() {  
         $scope.extraPricing = [{price:'', description:''}];
      };
      $scope.clearPricing = function() {
         $scope.extraPricing = [];
      };
      $scope.createSection = function() {
         if ($scope.title === ''){
            window.alert('ENTER A TITLE');
         }
         else {
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
   });
