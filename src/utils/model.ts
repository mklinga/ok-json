/* eslint-disable import/prefer-default-export */
import { OkJsonObject, ResultType } from '../types';

const parseType = (value: any): ResultType => (Number.isNaN(Number(value)) ? 'string' : 'number');

export const parseDataModel = (data: object): OkJsonObject => {
  const resultObject: OkJsonObject = {} as OkJsonObject;
  Object.entries(data).forEach(([key, value]) => {
    resultObject[key] = {
      value,
      type: parseType(value),
    };
  });

  console.log('resultobj', resultObject);
  return resultObject;
};
