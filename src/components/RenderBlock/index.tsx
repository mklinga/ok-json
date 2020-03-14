
import React from 'react';
import OkJsonArray from '../OkJsonArray';
import OkJsonString from '../OkJsonString';
import OkJsonNumber from '../OkJsonNumber';
import OkJsonObject from '../OkJsonObject';

import { OkJsonValue } from '../../types';

type Props = {
  data: {
    key: string,
    value: any
  }
};

const RenderBlock: React.SFC<Props> = ({ data: { key, value } }) => (
  <div className="Ok-Json-body">
    {(() => {
      switch (value.type) {
        case 'string':
          return <OkJsonString key={key} data={{ key, value }} />;
        case 'number':
          return <OkJsonNumber key={key} data={{ key, value }} />;
        case 'array':
          return (
            <OkJsonArray data={{ key }}>
              {value.value.map((nestedValue: OkJsonValue, index: number) => (
                <RenderBlock
                  key={index.toString()}
                  data={{ key: index.toString(), value: nestedValue }}
                />
              ))}
            </OkJsonArray>
          );

        case 'object':
          return (
            <OkJsonObject data={{ key }}>
              {Object.entries(value.value).map(([nestedKey, nestedValue]) => (
                <RenderBlock
                  key={nestedKey}
                  data={{ key: nestedKey, value: nestedValue }}
                />
              ))}
            </OkJsonObject>
          );
        default:
          return null;
      }
    })()}
  </div>
);

export default RenderBlock;
