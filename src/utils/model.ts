/* eslint-disable import/prefer-default-export */
import { OkJsonObject, ResultType } from '../types';

const parseType = (value: any): ResultType => {
  if (Array.isArray(value)) {
    return 'array';
  }

  return (Number.isNaN(Number(value)) ? 'string' : 'number');
};

const parseDataItem = (value: any) => {
  const type = parseType(value);

  if (type === 'array') {
    return {
      type,
      value: value.map(parseDataItem),
    };
  }

  return {
    value,
    type,
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

  console.log('resultobj', resultObject);
  return resultObject;
};
