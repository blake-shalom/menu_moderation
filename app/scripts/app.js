'use strict';

/**
 * @ngdoc overview
 * @name recommenuCmsApp
 * @description - CMS for Menu uploading for restaurant clients
 * # recommenuCmsApp
 *
 * Main module of the application.
 */
angular
  .module('recommenuCmsApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngDragDrop',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    /* Restangular Config */
    RestangularProvider.setBaseUrl('http://recommenu-test-api.herokuapp.com');
    RestangularProvider.configuration.requestSuffix = '&';
    // add a response intereceptor
    RestangularProvider.addResponseInterceptor(function(data, operation) {
    $locationProvider.html5Mode(true);
    var extractedData;
    // .. to look for getList operations
    if (operation === 'getList') {
      // .. and handle the data and meta data
      extractedData = data.results;
      extractedData.meta = data;
    } else {
      extractedData = data;
    }
    return extractedData;
    });

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
