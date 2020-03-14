import React from 'react';
import OkJsonString from '../OkJsonString';
import OkJsonNumber from '../OkJsonNumber';

import { OkJsonValue } from '../../types';

type Props = {
  data: {
    key: string,
    value: {
      type: 'array',
      value: Array<OkJsonValue>
    }
  }
};

const OkJsonArray: React.FC<Props> = ({ data: { key, value } }) => (
  <div>
    {key}
    {' '}
    :
    {' '}
    {value.value.map((nestedValue: OkJsonValue, index) => {
      switch (nestedValue.type) {
        case 'string':
          return (
            <OkJsonString
              key={index.toString()}
              data={{ key: index.toString(), value: nestedValue }}
            />
          );
        case 'number':
          return (
            <OkJsonNumber
              key={index.toString()}
              data={{ key: index.toString(), value: nestedValue }}
            />
          );
        case 'array':
          return (
            <OkJsonArray
              key={index.toString()}
              data={{ key: index.toString(), value: nestedValue }}
            />
          );
        default:
          return null;
      }
    })}
  </div>
);

export default OkJsonArray;
