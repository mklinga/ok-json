import * as C from './common';

describe('update', () => {
  it('Should return object if no path given', () => {
    const obj = { a: 12, b: { c: 'abc' } };
    const result = C.update([], 'new value', obj);
    expect(result).toEqual(obj);
  });

  it('Should update property inside the object', () => {
    const obj = { a: 12, b: { c: 'abc' } };
    const expected = { a: 'new value', b: { c: 'abc' } };
    const result = C.update(['a'], 'new value', obj);
    expect(result).toEqual(expected);
  });

  it('Should update property deep inside the object', () => {
    const obj = { a: 12, b: { c: 'abc' } };
    const expected = { a: 12, b: { c: 'new value' } };
    const result = C.update(['b', 'c'], 'new value', obj);
    expect(result).toEqual(expected);
  });

  it('Should update property deep inside the object with arrays', () => {
    const path = ['b', '1', 'd'];
    const obj = { a: 12, b: [{ c: 'def' }, { d: 'ghi' }] };
    const expected = { a: 12, b: [{ c: 'def' }, { d: 'new value' }] };
    const result = C.update(path, 'new value', obj);
    expect(result).toEqual(expected);
  });

  it('Should update property that does not exist', () => {
    const path = ['b'];
    const obj = { a: 12 };
    const expected = { a: 12, b: 'new value' };
    const result = C.update(path, 'new value', obj);
    expect(result).toEqual(expected);
  });

  it('Should update deep property that does not exist', () => {
    const path = ['b', 'c'];
    const obj = { a: 12 };
    const expected = { a: 12, b: { c: 'new value' } };
    const result = C.update(path, 'new value', obj);
    expect(result).toEqual(expected);
  });

  it('Should update property deep inside the object with arrays', () => {
    const path = ['b', 'c', '1'];
    const obj = { a: 12, b: { c: ['abc', 'def'] } };
    const expected = { a: 12, b: { c: ['abc', 'new value'] } };
    const result = C.update(path, 'new value', obj);
    expect(result).toEqual(expected);
  });

  it('Should not lose other properties in the path', () => {
    const path = ['b', 'c', '1'];
    const obj = { a: 12, b: { c: ['abc', 'def'], d: 34 }, e: 'ghi' };
    const expected = { a: 12, b: { c: ['abc', 'new value'], d: 34 }, e: 'ghi' };
    const result = C.update(path, 'new value', obj);
    expect(result).toEqual(expected);
  });
});

describe('segmentize', () => {
  it('Should segmentize', () => {
    expect(C.segmentize(['a'])).toEqual([['a']]);
    expect(C.segmentize([])).toEqual([]);
    expect(C.segmentize(['a', 'b'])).toEqual([['a'], ['a', 'b']]);
    expect(C.segmentize(['a', '0', 'c'])).toEqual([['a'], ['a', '0'], ['a', '0', 'c']]);
  });
});
