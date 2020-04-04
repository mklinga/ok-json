import React from 'react';

import { OkJsonBooleanPrimitive, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonBooleanPrimitive
  },
  filter: FilterType
};

const OkJsonBoolean: React.FC<Props> = ({ data: { key, value }, filter }) => {
  const valueHighlight = value.match === 'destination' && filter.matches(value.value as boolean);
  const valueClassName = `Ok-value Ok-Boolean-value ${valueHighlight ? 'Ok-highlighted-value' : ''}`;

  const keyMatch = filter.matches(key);
  const keyHighlight = value.match === 'destination' && keyMatch;
  const keySegmentHighlight = value.match === 'destination' && !keyMatch;
  const keyClassName = `Ok-key Ok-Boolean-key ${keyHighlight ? 'Ok-highlighted-key' : ''} ${keySegmentHighlight ? 'Ok-highlighted-key-segment' : ''}`;

  return (
    <div className="Ok-block Ok-Boolean-block">
      <div className={keyClassName}>
        {key}
      </div>
      <div className={valueClassName}>
        {value.value.toString()}
      </div>
    </div>
  );
};

export default OkJsonBoolean;
