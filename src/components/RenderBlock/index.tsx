
import React from 'react';
import OkJsonArray from '../OkJsonArray';
import OkJsonString from '../OkJsonString';
import OkJsonNull from '../OkJsonNull';
import OkJsonBoolean from '../OkJsonBoolean';
import OkJsonNumber from '../OkJsonNumber';
import OkJsonObject from '../OkJsonObject';

import { OkJsonValue, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: any
  },
  filter: FilterType,
  hasMatch: boolean,
  parentMatches?: boolean,
  isRoot?: boolean
};

const RenderBlock: React.SFC<Props> = (props) => {
  const {
    data: { key, value }, filter, hasMatch, parentMatches, isRoot,
  } = props;

  const isPrimitive = ['string', 'null', 'boolean', 'number'].includes(value.type);

  return (
    <div className="Ok-Json-body">
      {(() => {
        if (!isRoot && hasMatch && !value.match && !(isPrimitive && parentMatches)) {
          return null;
        }

        switch (value.type) {
          case 'string':
            return <OkJsonString key={key} data={{ key, value }} filter={filter} />;
          case 'null':
            return <OkJsonNull key={key} data={{ key, value }} filter={filter} />;
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
                    hasMatch={hasMatch}
                    parentMatches={value.match}
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
                    hasMatch={hasMatch}
                    parentMatches={value.match}
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
};

export default RenderBlock;
