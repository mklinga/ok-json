/* eslint-disable import/prefer-default-export */
import { OkJsonObject, OkJsonValue, ResultType } from '../types';

const parseType = (value: any): ResultType => {
  if (value === null) {
    return 'null';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (Boolean(value) === value) {
    return 'boolean';
  }

  if (!Number.isNaN(Number(value))) {
    return 'number';
  }

  return 'object';
};

const parseDataItem = (value: any): OkJsonValue => {
  const type = parseType(value);

  if (type === 'array') {
    return {
      type,
      match: 'no-match',
      value: value.map(parseDataItem),
    };
  }

  if (type === 'object') {
    return {
      type,
      match: 'no-match',
      value: Object
        .entries(value)
        .reduce((result, [key, objValue]) => ({
          ...result,
          [key]: parseDataItem(objValue),
        }), {}),
    };
  }

  return {
    type,
    value,
    match: 'no-match',
  };
};

export const parseDataModel = (data: object): OkJsonValue => {
  const resultObject: OkJsonObject = Object.entries(data).reduce((result, [key, value]) => {
    const parsedValue = parseDataItem(value);

    return {
      ...result,
      [key]: parsedValue,
    };
  }, {});

  return { type: 'object', value: resultObject };
};
