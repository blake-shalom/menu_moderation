'use strict';

describe('Service: entryPricing', function () {

  // load the service's module
  beforeEach(module('recommenuCmsApp'));

  // instantiate service
  var entryPricing;
  beforeEach(inject(function (_entryPricing_) {
    entryPricing = _entryPricing_;
  }));

  it('should do something', function () {
    expect(!!entryPricing).toBe(true);
  });

});
