export type ResultType = 'number' | 'string' | 'array' | 'object' | 'boolean' | 'null';

export type OkJsonNumberPrimitive = {
  type: 'number',
  match?: boolean
  value: number
};

export type OkJsonStringPrimitive = {
  type: 'string',
  match?: boolean
  value: string
};

export type OkJsonNullPrimitive = {
  type: 'null',
  match?: boolean
  value: null
};

export type OkJsonBooleanPrimitive = {
  type: 'boolean',
  match?: boolean
  value: boolean
};

export type OkJsonArrayPrimitive = {
  type: 'array',
  match?: boolean
  value: Array<any>
};

export type OkJsonObjectPrimitive = {
  type: 'object',
  match?: boolean
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

export interface FilterType {
  matches: (obj: any) => boolean;
  hasValue: () => boolean;
}

export type FilterQueryFlags = {
  ignoreCase: boolean,
  matchCase: boolean
};

export type FilterQuery = {
  value: string,
  flags: FilterQueryFlags
};
