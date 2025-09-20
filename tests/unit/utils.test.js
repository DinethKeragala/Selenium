const { expect } = require('chai');
const { add, isEmail } = require('../../src/utils');

describe('Unit: utils', () => {
  it('add() sums two numbers', () => {
    expect(add(2, 3)).to.equal(5);
    expect(add(-1, 1)).to.equal(0);
  });

  it('isEmail() validates emails', () => {
    expect(isEmail('user@example.com')).to.equal(true);
    expect(isEmail('bad-email')).to.equal(false);
    expect(isEmail('user@domain')).to.equal(false);
  });
});
