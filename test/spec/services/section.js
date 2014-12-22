'use strict';

describe('Service: section', function () {

  // load the service's module
  beforeEach(module('recommenuCmsApp'));

  // instantiate service
  var section;
  beforeEach(inject(function (_section_) {
    section = _section_;
  }));

  it('should do something', function () {
    expect(!!section).toBe(true);
  });

});
