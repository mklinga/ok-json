import React from 'react';

type Props = {
  data: {
    key: string,
  },
  children: React.ReactNode
};

const OkJsonArray: React.FC<Props> = ({ data: { key }, children }) => (
  <div className="Ok-block Ok-Array-block">
    <div className="Ok-key Ok-Array-key">
      {key}
    </div>
    <div className="Ok-value Ok-Array-value">
      <div className="Ok-Array-bracket">[</div>
      {children}
      <div className="Ok-Array-bracket">]</div>
    </div>
  </div>
);

export default OkJsonArray;
