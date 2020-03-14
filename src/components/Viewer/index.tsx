import React from 'react';
import OkJsonString from '../OkJsonString';
import OkJsonNumber from '../OkJsonNumber';

type Props = {
  data: object
};

const Viewer: React.SFC<Props> = ({ data }) => (
  <div>
    {Object.entries(data).map(([key, value]) => {
      console.log(key, value);
      switch (value.type) {
        case 'string':
          return <OkJsonString key={key} data={{ key, value }} />;
        case 'number':
          return <OkJsonNumber key={key} data={{ key, value }} />;
        default:
          return `${key}: ${value.value}`;
      }
    })}
  </div>
);

export default Viewer;
