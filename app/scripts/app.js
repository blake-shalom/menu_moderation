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
  .config(function ($routeProvider, RestangularProvider) {
    /* Restangular Config */
    RestangularProvider.setBaseUrl('http://recommenu-test-api.herokuapp.com');
    RestangularProvider.configuration.requestSuffix = '&';

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
