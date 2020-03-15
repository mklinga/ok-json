export type ResultType = 'number' | 'string' | 'array' | 'object' | 'boolean' | 'null';

export type OkJsonNumberPrimitive = {
  type: 'number',
  value: number
};

export type OkJsonStringPrimitive = {
  type: 'string',
  value: string
};

export type OkJsonNullPrimitive = {
  type: 'null',
  value: null
};

export type OkJsonBooleanPrimitive = {
  type: 'boolean',
  value: boolean
};

export type OkJsonArrayPrimitive = {
  type: 'array',
  value: Array<any>
};

export type OkJsonObjectPrimitive = {
  type: 'object',
  value: {
    [key: string]: OkJsonNumberPrimitive |
    OkJsonStringPrimitive |
    OkJsonNullPrimitive |
    OkJsonBooleanPrimitive |
    OkJsonArrayPrimitive |
    OkJsonObjectPrimitive
  }
};

export type OkJsonValue =
  OkJsonNumberPrimitive |
  OkJsonStringPrimitive |
  OkJsonNullPrimitive |
  OkJsonBooleanPrimitive |
  OkJsonArrayPrimitive |
  OkJsonObjectPrimitive;

export type OkJsonObject = {
  [key: string]: OkJsonValue
};

export type Filter = {
  value: string
};
