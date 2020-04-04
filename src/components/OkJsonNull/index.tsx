import React from 'react';

import { OkJsonNullPrimitive, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonNullPrimitive
  },
  filter: FilterType
};

const OkJsonNull: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const valueHighlight = value.match === 'destination' && filter.matches(value.value as null);
  const valueClassName = `Ok-value Ok-Null-value ${valueHighlight ? 'Ok-highlighted-value' : ''}`;

  const keyMatch = filter.matches(key);
  const keyHighlight = value.match === 'destination' && keyMatch;
  const keySegmentHighlight = value.match === 'destination' && !keyMatch;
  const keyClassName = `Ok-key Ok-Null-key ${keyHighlight ? 'Ok-highlighted-key' : ''} ${keySegmentHighlight ? 'Ok-highlighted-key-segment' : ''}`;

  return (
    <div className="Ok-block Ok-Null-block">
      <div className={keyClassName}>
        {key}
      </div>
      <div className={valueClassName}>
        null
      </div>
    </div>
  );
};

export default OkJsonNull;
