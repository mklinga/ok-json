import React from 'react';

type Props = {
  data: {
    key: string,
  },
  children: React.ReactNode
};

const OkJsonObject = ({ children, data: { key } }: Props) => {
  const [closed, setClosed] = React.useState<boolean>(false);

  const buttonClassName = closed
    ? 'Ok-closable-button Ok-closable-button-closed'
    : 'Ok-closable-button Ok-closable-button-open';

  const valueClassName = closed
    ? 'Ok-value Ok-Object-value closed'
    : 'Ok-value Ok-Object-value open';

  return (
    <div className="Ok-block Ok-Object-block">
      {key ? (
        <div className="Ok-key Ok-Object-key">
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
