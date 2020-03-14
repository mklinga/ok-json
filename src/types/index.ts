export type ResultType = 'number' | 'string';

export type OkJsonValue = {
  value: any,
  type: ResultType
};

export type OkJsonObject = {
  [key: string]: OkJsonValue
};
