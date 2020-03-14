/* eslint-disable import/prefer-default-export */
import { OkJsonObject, OkJsonValue, ResultType } from '../types';

const parseType = (value: any): ResultType => {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (typeof value === 'string') {
    return 'string';
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
      value: value.map(parseDataItem),
    };
  }

  if (type === 'object') {
    return {
      type,
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
  };
};

export const parseDataModel = (data: object): OkJsonObject => {
  const resultObject: OkJsonObject = Object.entries(data).reduce((result, [key, value]) => {
    const parsedValue = parseDataItem(value);

    return {
      ...result,
      [key]: parsedValue,
    };
  }, {});

  return resultObject;
};
