import React from 'react';

type Props = {
  data: {
    key: string,
  },
  children: React.ReactNode
};

const OkJsonObject: React.FC<Props> = ({ children, data: { key } }) => (
  <div className="Ok-block Ok-Object-block">
    <div className="Ok-key Ok-Object-key">
      {key}
    </div>
    <div className="Ok-value Ok-Object-value">
      <div className="Ok-Object-bracket">{'{'}</div>
      {children}
      <div className="Ok-Object-bracket">{'}'}</div>
    </div>
  </div>
);

export default OkJsonObject;
