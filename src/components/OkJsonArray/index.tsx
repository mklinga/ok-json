import React from 'react';

import { OkJsonValue, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue,
  },
  children: React.ReactNode,
  filter: FilterType
};

const OkJsonArray = ({ data: { key, value }, filter, children }: Props) => {
  const [closed, setClosed] = React.useState<boolean>(false);

  const buttonClassName = closed
    ? 'Ok-closable-button Ok-closable-button-closed'
    : 'Ok-closable-button Ok-closable-button-open';

  const valueClassName = closed
    ? 'Ok-value Ok-Array-value closed'
    : 'Ok-value Ok-Array-value open';

  const keyMatch = filter.matches(key);
  const destinationHighlight = value.match === 'destination' && keyMatch;
  const segmentHighlight = value.match === 'segment' || (value.match === 'destination' && !keyMatch);
  const keyClassName = `Ok-key Ok-Array-key ${destinationHighlight ? 'Ok-highlighted-key' : ''} ${segmentHighlight ? 'Ok-highlighted-key-segment' : ''}`;

  return (
    <div className="Ok-block Ok-Array-block">
      <div className={keyClassName}>
        <button className={buttonClassName} type="button" onClick={() => setClosed(!closed)}>{key}</button>
      </div>
      <div className={valueClassName}>
        <span className="Ok-Array-bracket-open">[</span>
        {closed ? ' ... ' : children}
        <span className="Ok-Array-bracket-close">]</span>
      </div>
    </div>
  );
};

export default OkJsonArray;
