import React from 'react';

type Props = {
  data: {
    key: string,
  },
  children: React.ReactNode
};

const OkJsonArray = ({ data: { key }, children }: Props) => {
  const [closed, setClosed] = React.useState<boolean>(false);

  const buttonClassName = closed
    ? 'Ok-closable-button Ok-closable-button-closed'
    : 'Ok-closable-button Ok-closable-button-open';

  const valueClassName = closed
    ? 'Ok-value Ok-Array-value closed'
    : 'Ok-value Ok-Array-value open';

  return (
    <div className="Ok-block Ok-Array-block">
      <div className="Ok-key Ok-Array-key">
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
