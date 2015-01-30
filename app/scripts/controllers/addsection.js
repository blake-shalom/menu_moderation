'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddsectionCtrl
 * @text
 * # AddsectionCtrl
 * Controller of the recommenuCmsApp
 */

angular.module('recommenuCmsApp')
   .controller('AddsectionCtrl', function ($scope, $location, $cookies, section, menu, auth, sectionPricing, client, entry) {

      // if ($cookies.token && $cookies.selectedClient) {
      //    auth.registerToken($cookies.token);
      //    auth.isLogged = true;
      //    if ($cookies.activeSection === 'null'){
      //       section.activeSection = menu.activeMenu.sections[0];
      //    }
      //    else {
      //       section.activeSection = $cookies.activeSection;
      //    }

      //    client.selectCompany($cookies.selectedClient).then(
      //       function (data){
      //          menu.menus = data;
      //          menu.loadedMenu = true;
      //          menu.activeMenu = data[0];
      //          menu.sections = section.restangularizeSections(menu.activeMenu.sections);
      //          if (menu.activeMenu.sections.length > 0) {
      //             if ($cookies.activeSection === 'null'){
      //                section.activeSection = menu.activeMenu.sections[0];
      //             }
      //             else {
      //                section.activeSection = $cookies.activeSection;
      //             }
      //             section.activeSection.entries = entry.restangularizeEntries(section.activeSection.entries);
      //          }
      //          else {
      //             section.activeSection = null;
      //             section.creatingSection = true;
      //          }
      //       },
      //       function (err){
      //          console.log('ERROR: ', err);
      //          window.alert('Server Error!');
      //       });

      // }

      $scope.$watch(function() {
         return section.activeSection;
      }, function (newValue) {
         if (newValue !== null) {
            $scope.section = newValue;
            $scope.isEditing = true;
         }
         else {
            $scope.section = {};
            $scope.section_prices = [{price:'', text:''}];
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
      $scope.section_prices = [{price:'', text:''}];
      $scope.isEditing = false;
      $scope.hasExtraPricing = 'No';
      $scope.selectedTemplate = 'regular';
      $scope.willPostExtraPricing = false;
      
      $scope.addExtraPricing = function() {
         $scope.section_prices.push({price:'', text:''});
      };
      $scope.newExtraPricing = function() {  
         $scope.willPostExtraPricing = true;
      };
      $scope.clearPricing = function() {
         $scope.willPostExtraPricing = false;
      };
      $scope.removePricing = function(i) {
         $scope.section_prices.splice(i,1);
      };
      $scope.createSection = function() {
         if ($scope.section.title === ''){
            window.alert('ENTER A TITLE');
         }
         else {
            $scope.section_prices = (($scope.willPostExtraPricing === false) ? [] : $scope.section_prices);
            $scope.section.menu = menu.activeMenu.url;
            $scope.section.entries = [];
            $scope.section.order = menu.activeMenu.sections.length;
            $scope.section.section_prices = [];
            section.postNewSection($scope.section).then (
               function (data){
                  menu.activeMenu.sections.push(data);
                  section.activeSection = data;
                  section.creatingSection = false;
                  section.activeTemplate = $scope.selectedTemplate;
                  sectionPricing.saveSectionPricesToSection($scope.section_prices, data).then(
                     function (data){
                        console.log(data);
                        $location.path( '/entries/' );
                     },
                     function (err){
                        console.log(err);
                     });
               },
               function (err){
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
            $scope.section_prices = (($scope.willPostExtraPricing === false) ? [] : $scope.section_prices);
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
               menu.sections.splice(section.activeSection.order, 1);
               section.activeSection = menu.activeMenu.sections[0];
               $location.path('/entries/');
            },
            function (err){
               console.log(err);
               window.alert('Server ERROR!');
            });
      };
   });
