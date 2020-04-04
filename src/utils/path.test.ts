import * as P from './path';
import { OkJsonValue } from '../types';

describe('pickByPath', () => {
  it('Should return object by path (length=1)', () => {
    const data: OkJsonValue = {
      type: 'object',
      value: {
        a: { type: 'number', value: 123 },
        b: { type: 'string', value: 'abc' },
      },
    };

    const path = ['a'];

    const expected = [{
      type: 'object',
      value: {
        a: { type: 'number', value: 123 },
      },
    }];

    const result = P.pickByPath(data, path);

    expect(result).toEqual(expected);
  });

  it('Should return object by path (length=2)', () => {
    const data: OkJsonValue = {
      type: 'object',
      value: {
        a: {
          type: 'object',
          value: {
            b: { type: 'number', value: 123 },
            c: { type: 'string', value: 'abc' },
          },
        },
        d: { type: 'string', value: 'def' },
      },
    };

    const path = ['a.b'];

    const expected = [{
      type: 'object',
      value: {
        a: {
          type: 'object',
          value: {
            b: { type: 'number', value: 123 },
          },
        },
      },
    }];

    const result = P.pickByPath(data, path);

    expect(result).toEqual(expected);
  });

  it('Should return object by path (array)', () => {
    const data: OkJsonValue = {
      type: 'object',
      value: {
        a: {
          type: 'array',
          value: [
            { type: 'number', value: 123 },
            { type: 'string', value: 'abc' },
          ],
        },
        d: { type: 'string', value: 'def' },
      },
    };

    const path = ['a.0'];

    const expected = [{
      type: 'object',
      value: {
        a: {
          type: 'array',
          value: [
            { type: 'number', value: 123 },
          ],
        },
      },
    }];

    const result = P.pickByPath(data, path);

    expect(result).toEqual(expected);
  });

  it('Should return object by path (array, n=2)', () => {
    const data: OkJsonValue = {
      type: 'object',
      value: {
        a: {
          type: 'object',
          value: {
            b: {
              type: 'array',
              value: [
                { type: 'number', value: 1 },
                { type: 'number', value: 2 },
                { type: 'number', value: 3 },
              ],
            },
            c: { type: 'number', value: 99 },
          },
        },
        d: {
          type: 'object',
          value: {
            e: { type: 'number', value: 12 },
          },
        },
      },
    };

    const path = ['a.b.1'];

    const expected = [{
      type: 'object',
      value: {
        a: {
          type: 'object',
          value: {
            b: {
              type: 'array',
              value: [
                { type: 'number', value: 2 },
              ],
            },
          },
        },
      },
    }];

    const result = P.pickByPath(data, path);

    expect(result).toEqual(expected);
  });
});

describe('markMatches', () => {
  const getExampleData = (): OkJsonValue => ({
    type: 'object',
    value: {
      a: {
        type: 'object',
        value: {
          b: {
            type: 'array',
            value: [
              { type: 'number', value: 1 },
              { type: 'number', value: 2 },
              { type: 'number', value: 3 },
            ],
          },
          c: { type: 'number', value: 99 },
        },
      },
      d: {
        type: 'object',
        value: {
          e: { type: 'number', value: 12 },
        },
      },
    },
  });

  it('Should return data when no paths are given', () => {
    const exampleData: OkJsonValue = getExampleData();

    const expected = exampleData;
    const result = P.markMatches([], exampleData);
    expect(result).toEqual(expected);
  });

  it('Should mark given path of the data as match 1', () => {
    const exampleData: OkJsonValue = getExampleData();
    const expected = { ...exampleData };
    expected.value.d.match = 'segment';
    expected.value.d.value.e.match = 'destination';
    const result = P.markMatches(['d.e'], exampleData);
    expect(result).toEqual(expected);
  });

  it('Should mark given path of the data as match 2', () => {
    const exampleData: OkJsonValue = getExampleData();
    const expected = { ...exampleData };
    expected.value.d.match = 'segment';
    expected.value.d.value.e.match = 'destination';
    expected.value.a.match = 'segment';
    expected.value.a.value.c.match = 'destination';

    const result = P.markMatches(['d.e', 'a.c'], exampleData);
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it('Should be able to mark arrays', () => {
    const exampleData: OkJsonValue = getExampleData();
    const expected = { ...exampleData };
    expected.value.a.match = 'segment';
    expected.value.a.value.b.match = 'destination';

    const result = P.markMatches(['a.b'], { ...exampleData });
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it('Should be able to mark inside arrays', () => {
    const exampleData = getExampleData();
    const expected = { ...exampleData };
    expected.value.a.match = 'segment';
    expected.value.a.value.b.match = 'segment';
    expected.value.a.value.b.value[2].match = 'destination';

    const result = P.markMatches(['a.b.2'], exampleData);
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it('Should be able to mark objects', () => {
    const exampleData = getExampleData();
    const expected = { ...exampleData };
    expected.value.a.match = 'destination';

    const result = P.markMatches(['a'], exampleData);
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it('Should be able to mark objects inside arrays', () => {
    const exampleData: OkJsonValue = {
      type: 'object',
      value: {
        a: {
          type: 'array',
          value: [
            {
              type: 'object',
              value: {
                c: { type: 'number', value: 1 },
              },
            },
          ],
        },
      },
    };

    const expected = { ...exampleData };
    expected.value.a.match = 'segment';
    expected.value.a.value[0].match = 'segment';
    expected.value.a.value[0].value.c.match = 'destination';

    const result = P.markMatches(['a.0.c'], exampleData);
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });
});
