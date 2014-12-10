'use strict';

describe('Controller: SidectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('recommenuCmsApp'));

  var SidectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidectrlCtrl = $controller('SidectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
