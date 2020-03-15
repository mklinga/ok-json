import React from 'react';
import RenderBlock from '../RenderBlock';

import { getHitPaths, pickByPath } from '../../utils/filter';
import { generateId } from '../../utils/common';

import { Filter, OkJsonValue } from '../../types';

import './Viewer.css';

type Props = {
  data: OkJsonValue,
  filter: Filter
};

const Viewer: React.SFC<Props> = ({ data, filter }) => {
  const visibleData: Array<OkJsonValue> = (filter.value)
    ? pickByPath(data, getHitPaths(data, filter))
    : [data];

  return (
    <div>
      {visibleData.map((visibleDataSection) => (
        <div key={generateId()} className="App-Viewer-body">
          <RenderBlock data={{ key: '', value: visibleDataSection }} filter={filter} />
        </div>
      ))}
    </div>
  );
};

export default Viewer;
