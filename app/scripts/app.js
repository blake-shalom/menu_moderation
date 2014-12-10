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
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
