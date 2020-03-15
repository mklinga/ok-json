
import React from 'react';
import OkJsonArray from '../OkJsonArray';
import OkJsonString from '../OkJsonString';
import OkJsonBoolean from '../OkJsonBoolean';
import OkJsonNumber from '../OkJsonNumber';
import OkJsonObject from '../OkJsonObject';

import { OkJsonValue, Filter } from '../../types';

type Props = {
  data: {
    key: string,
    value: any
  },
  filter: Filter
};

const RenderBlock: React.SFC<Props> = ({ data: { key, value }, filter }) => (
  <div className="Ok-Json-body">
    {(() => {
      switch (value.type) {
        case 'string':
          return <OkJsonString key={key} data={{ key, value }} filter={filter} />;
        case 'boolean':
          return <OkJsonBoolean key={key} data={{ key, value }} filter={filter} />;
        case 'number':
          return <OkJsonNumber key={key} data={{ key, value }} filter={filter} />;
        case 'array':
          return (
            <OkJsonArray data={{ key }}>
              {value.value.map((nestedValue: OkJsonValue, index: number) => (
                <RenderBlock
                  key={index.toString()}
                  filter={filter}
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
                  filter={filter}
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
