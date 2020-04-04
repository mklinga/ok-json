import React from 'react';

import { OkJsonValue, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  },
  filter: FilterType
};

const OkJsonNumber: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const valueHighlight = value.match === 'destination' && filter.matches(value.value as number);
  const valueClassName = `Ok-value Ok-Number-value ${valueHighlight ? 'Ok-highlighted-value' : ''}`;

  const keyMatch = filter.matches(key);
  const keyHighlight = value.match === 'destination' && keyMatch;
  const keySegmentHighlight = value.match === 'destination' && !keyMatch;
  const keyClassName = `Ok-key Ok-Number-key ${keyHighlight ? 'Ok-highlighted-key' : ''} ${keySegmentHighlight ? 'Ok-highlighted-key-segment' : ''}`;

  return (
    <div className="Ok-block Ok-Number-block">
      <div className={keyClassName}>
        {key}
      </div>
      <div className={valueClassName}>
        {value.value}
      </div>
    </div>
  );
};
export default OkJsonNumber;
