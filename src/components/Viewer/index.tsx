import React from 'react';
import OkJsonArray from '../OkJsonArray';
import OkJsonString from '../OkJsonString';
import OkJsonNumber from '../OkJsonNumber';

import './Viewer.css';

type Props = {
  data: object
};

const Viewer: React.SFC<Props> = ({ data }) => (
  <div className="Viewer-body">
    {Object.entries(data).map(([key, value]) => {
      switch (value.type) {
        case 'string':
          return <OkJsonString key={key} data={{ key, value }} />;
        case 'number':
          return <OkJsonNumber key={key} data={{ key, value }} />;
        case 'array':
          return <OkJsonArray key={key} data={{ key, value }} />;
        default:
          return `${key}: ${JSON.stringify(value.value)}`;
      }
    })}
  </div>
);

export default Viewer;
