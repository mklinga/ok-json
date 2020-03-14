/* eslint-disable import/prefer-default-export */
import { OkJsonObject, ResultType } from '../types';

const parseType = (value: any): ResultType => {
  if (Array.isArray(value)) {
    return 'array';
  }

  return (Number.isNaN(Number(value)) ? 'string' : 'number');
};

export const parseDataModel = (data: object): OkJsonObject => {
  const resultObject: OkJsonObject = Object.entries(data).reduce((result, [key, value]) => {
    const type = parseType(value);

    if (type === 'array') {
      return {
        ...result,
        [key]: {
          type,
          value: value.map((x: any) => ({ value: x, type: parseType(x) })),
        },
      };
    }

    return {
      ...result,
      [key]: {
        value,
        type,
      },
    };
  }, {});

  console.log('resultobj', resultObject);
  return resultObject;
};
