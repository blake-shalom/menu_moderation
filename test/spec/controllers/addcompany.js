'use strict';

describe('Controller: AddcompanyCtrl', function () {

  // load the controller's module
  beforeEach(module('recommenuCmsApp'));

  var AddcompanyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddcompanyCtrl = $controller('AddcompanyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
