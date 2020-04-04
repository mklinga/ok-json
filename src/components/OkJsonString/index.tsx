import React from 'react';

import { OkJsonValue, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  },
  filter: FilterType
};

const OkJsonString: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const valueHighlight = value.match === 'destination' && filter.matches(value.value);
  const valueClassName = `Ok-value Ok-String-value ${valueHighlight ? 'Ok-highlighted-value' : ''}`;

  const keyMatch = filter.matches(key);
  const keyHighlight = value.match === 'destination' && keyMatch;
  const keySegmentHighlight = value.match === 'destination' && !keyMatch;
  const keyClassName = `Ok-key Ok-String-key ${keyHighlight ? 'Ok-highlighted-key' : ''} ${keySegmentHighlight ? 'Ok-highlighted-key-segment' : ''}`;

  return (
    <div className="Ok-block Ok-String-block">
      <div className={keyClassName}>
        {key}
      </div>
      <div className={valueClassName}>
        &quot;
        {value.value}
        &quot;
      </div>
    </div>
  );
};

export default OkJsonString;
