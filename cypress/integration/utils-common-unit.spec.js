/// <reference types="cypress" />
// @ts-ignore
const common = require('../../src/server/utils/common');

describe('common utility functions testing with cypress - intersection', () => {
  // intersection
  it('common.intersection function returns [b,c] when called with [a,b,c] and [b,c,d]', () => {
    expect(common.intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).deep.equal([
      'b',
      'c',
    ]);
  });

  it('common.intersection function returns [] when called with [a,b,c] and []', () => {
    expect(common.intersection(['a', 'b', 'c'], [])).deep.equal([]);
  });

  it('common.intersection function returns [] when called with [] and [a,b,c]', () => {
    expect(common.intersection([], ['a', 'b', 'c'])).deep.equal([]);
  });

  it('common.intersection function returns [a,b,c] when called with [a,b,c] and [a,b,c]', () => {
    expect(common.intersection(['a', 'b', 'c'], ['a', 'b', 'c'])).deep.equal([
      'a',
      'b',
      'c',
    ]);
  });
});

describe('common utility functions testing with cypress - mergeUnique', () => {
  // merge unique
  it('common.mergeUnique function returns [a,b,c,d] when called with [a,b,c] and [b,c,d]', () => {
    expect(common.mergeUnique(['a', 'b', 'c'], ['b', 'c', 'd'])).deep.equal([
      'a',
      'b',
      'c',
      'd',
    ]);
  });

  it('common.mergeUnique function returns [a,b,c] when called with [a,b,c] and []', () => {
    expect(common.mergeUnique(['a', 'b', 'c'], [])).deep.equal(['a', 'b', 'c']);
  });

  it('common.mergeUnique function returns [a,b,c] when called with [] and [a,b,c]', () => {
    expect(common.mergeUnique([], ['a', 'b', 'c'])).deep.equal(['a', 'b', 'c']);
  });

  it('common.mergeUnique function returns [a,b,c] when called with [a,b,c] and [a,b,c]', () => {
    expect(common.mergeUnique(['a', 'b', 'c'], ['a', 'b', 'c'])).deep.equal([
      'a',
      'b',
      'c',
    ]);
  });
});

describe('common utility functions testing with cypress - pick', () => {
  // pick
  it('common.pick function returns object with keys [a,b] when called with { a:1, b:2, c:3 } and [a,b]', () => {
    expect(common.pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).to.have.keys([
      'a',
      'b',
    ]);
  });

  it('common.pick function returns full object when called with empty array', () => {
    expect(common.pick({ a: 1, b: 2, c: 3 }, [])).to.have.keys(['a', 'b', 'c']);
  });
});

describe('common utility functions testing with cypress - isEmpty', () => {
  // pick
  it('common.isEmpty function returns true for null', () => {
    expect(common.isEmpty(null)).equal(true);
  });

  it('common.isEmpty function returns true for undefined', () => {
    expect(common.isEmpty(undefined)).equal(true);
  });

  it('common.isEmpty function returns true for {}', () => {
    expect(common.isEmpty({})).equal(true);
  });

  it('common.isEmpty function returns true for []', () => {
    expect(common.isEmpty([])).equal(true);
  });
  it('common.isEmpty function returns true for empty string', () => {
    expect(common.isEmpty('')).equal(true);
  });

  it('common.isEmpty function returns false for 0', () => {
    expect(common.isEmpty(0)).equal(false);
  });
});
