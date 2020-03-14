export type ResultType = 'number' | 'string' | 'array';

export type OkJsonValue = {
  type: 'number',
  value: number
} | {
  type: 'string',
  value: string
} | {
  type: 'array',
  value: Array<any>
};

export type OkJsonObject = {
  [key: string]: OkJsonValue
};
