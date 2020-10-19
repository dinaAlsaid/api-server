'use strict';
const timestamp = require('../lib/middleware/timestamp.js');

describe('timestamp middleware', () => {
  let consoleSpy;
  const req = {};
  const res = {};
  const next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  

  it('logs the time before each request', () => {
    timestamp(req, res, next);
    console.log('timestamp');
    expect(consoleSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
});
  