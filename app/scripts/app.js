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
    'restangular',
    'underscore',
    'flow',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider, RestangularProvider) {
    /* HTTP Provider config */
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    /* Restangular Config */
    RestangularProvider.setBaseUrl('https://recommenu-dev-api.herokuapp.com');
    RestangularProvider.configuration.requestSuffix = '&';
    RestangularProvider.setRequestSuffix('/');
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
      .when('/login/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/entries/', {
        templateUrl: 'views/entrygrid.html',
        controller: 'EntrygridCtrl'
      })
      .when('/menus/', {
        templateUrl: 'views/addmenu.html',
        controller: 'AddmenuCtrl'
      })
      .when('/sections/', {
        templateUrl: 'views/addsection.html',
        controller: 'AddsectionCtrl'
      })
      .when('/company/', {
        templateUrl: 'views/addcompany.html',
        controller: 'AddcompanyCtrl'
      })
      .when('/user/', {
        templateUrl: 'views/adduser.html',
        controller: 'AdduserCtrl'
      })
      .otherwise({
        redirectTo: '/login/'
      });
  });
  /*.run(function ($rootScope, $location, auth) {

    // enumerate routes that don't need authentication
    var routesThatDontRequireAuth = ['/login'];

    // check if current location matches route  
    var routeClean = function (route) {
      return window._.find(routesThatDontRequireAuth,
        function (noAuthRoute) {
          return window._.str.startsWith(route, noAuthRoute);
        });
    };
    $rootScope.$on('$routeChangeStart', function () {
      // if route requires auth and user is not logged in
      if (!routeClean($location.url()) && !auth.isLogged) {
        // redirect back to login
        $location.path('/login');
      }
    });
  });*/