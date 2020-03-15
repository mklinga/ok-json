import * as F from './filter';
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

    const expected = {
      type: 'object',
      value: {
        a: { type: 'number', value: 123 },
      },
    };

    const result = F.pickByPath(data, path);

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

    const expected = {
      type: 'object',
      value: {
        a: {
          type: 'object',
          value: {
            b: { type: 'number', value: 123 },
          },
        },
      },
    };

    const result = F.pickByPath(data, path);

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

    const expected = {
      type: 'object',
      value: {
        a: {
          type: 'array',
          value: [
            { type: 'number', value: 123 },
          ],
        },
      },
    };

    const result = F.pickByPath(data, path);

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

    const expected = {
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
    };

    const result = F.pickByPath(data, path);

    expect(result).toEqual(expected);
  });
});
