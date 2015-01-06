'use strict';

describe('Service: slider', function () {

  // load the service's module
  beforeEach(module('recommenuCmsApp'));

  // instantiate service
  var slider;
  beforeEach(inject(function (_slider_) {
    slider = _slider_;
  }));

  it('should do something', function () {
    expect(!!slider).toBe(true);
  });

});
