'use strict';

describe('Controller: AddsectionCtrl', function () {

  // load the controller's module
  beforeEach(module('recommenuCmsApp'));

  var AddsectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddsectionCtrl = $controller('AddsectionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
