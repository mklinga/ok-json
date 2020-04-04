import React from 'react';

import { OkJsonValue, FilterType } from '../../types';

type Props = {
  data: {
    key: string,
    value: OkJsonValue
  },
  children: React.ReactNode,
  filter: FilterType
};

const OkJsonObject = ({ children, data: { key, value }, filter }: Props) => {
  const [closed, setClosed] = React.useState<boolean>(false);

  const buttonClassName = closed
    ? 'Ok-closable-button Ok-closable-button-closed'
    : 'Ok-closable-button Ok-closable-button-open';

  const valueClassName = closed
    ? 'Ok-value Ok-Object-value closed'
    : 'Ok-value Ok-Object-value open';

  const destinationHighlight = value.match === 'destination' && filter.matches(key);
  const segmentHighlight = value.match === 'segment' || (value.match === 'destination' && !filter.matches(key));
  const keyClassName = `Ok-key Ok-Object-key ${destinationHighlight ? 'Ok-highlighted-key' : ''} ${segmentHighlight ? 'Ok-highlighted-key-segment' : ''}`;

  return (
    <div className="Ok-block Ok-Object-block">
      {key ? (
        <div className={keyClassName}>
          <button
            className={buttonClassName}
            type="button"
            onClick={() => setClosed(!closed)}
          >
            {key}
          </button>
        </div>
      ) : null}
      <div className={valueClassName}>
        <span className="Ok-Object-bracket-open">{'{'}</span>
        {closed ? ' ... ' : children}
        <span className="Ok-Object-bracket-close">{'}'}</span>
      </div>
    </div>
  );
};

export default OkJsonObject;
