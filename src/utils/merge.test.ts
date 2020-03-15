import * as M from './merge';

describe('merge', () => {
  it('Should merge two objects 1', () => {
    const obj1 = { a: 12 };
    const obj2 = { b: 34 };

    const expected = { a: 12, b: 34 };
    const result = M.merge(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('Should merge two objects 2', () => {
    const obj1 = { a: { b: 12, c: 34 } };
    const obj2 = { b: 56 };

    const expected = { a: { b: 12, c: 34 }, b: 56 };
    const result = M.merge(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('Should merge two objects 3', () => {
    const obj1 = { a: { b: 12, c: 34 } };
    const obj2 = { a: { d: 56 } };

    const expected = { a: { b: 12, c: 34, d: 56 } };
    const result = M.merge(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('Should merge two objects 4', () => {
    const obj1 = { a: { b: 12, c: 34 }, d: 'abc' };
    const obj2 = { a: { d: 56 }, d: 'def' };

    const expected = { a: { b: 12, c: 34, d: 56 }, d: 'def' };
    const result = M.merge(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('Should merge two objects 5', () => {
    const obj1 = { a: [{ b: 12 }] };
    const obj2 = { a: [{ c: 45 }] };

    const expected = { a: [{ b: 12 }, { c: 45 }] };
    const result = M.merge(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('Should merge two objects 5', () => {
    const obj1 = { a: { b: [1, 2, 3], c: 4 }, d: 'abc' };
    const obj2 = { a: { b: [4, { five: 5 }] }, e: 'def' };

    const expected = { a: { b: [1, 2, 3, 4, { five: 5 }], c: 4 }, d: 'abc', e: 'def' };
    const result = M.merge(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('Should merge two arrays', () => {
    const arr1 = [12, 34];
    const arr2 = [56, 78];

    const expected = [12, 34, 56, 78];
    const result = M.merge(arr1, arr2);

    expect(result).toEqual(expected);
  });
});
