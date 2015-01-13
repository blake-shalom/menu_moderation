'use strict';

describe('Service: sectionPricing', function () {

  // load the service's module
  beforeEach(module('recommenuCmsApp'));

  // instantiate service
  var sectionPricing;
  beforeEach(inject(function (_sectionPricing_) {
    sectionPricing = _sectionPricing_;
  }));

  it('should do something', function () {
    expect(!!sectionPricing).toBe(true);
  });

});
