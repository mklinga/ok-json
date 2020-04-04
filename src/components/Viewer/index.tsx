import React from 'react';
import RenderBlock from '../RenderBlock';

import { getHitPaths, markMatches } from '../../utils/path';
import { generateId } from '../../utils/common';

import { FilterType, OkJsonValue } from '../../types';

import './Viewer.css';

type Props = {
  data: OkJsonValue,
  filter: FilterType
};

const Viewer: React.SFC<Props> = ({ data, filter }) => {
  const visibleData: Array<OkJsonValue> = (filter.hasValue())
    ? [markMatches(getHitPaths(data, filter), data)]
    : [data];

  return (
    <div>
      {visibleData.map((visibleDataSection) => (
        <div key={generateId()} className="App-Viewer-body">
          <RenderBlock
            isRoot
            data={{ key: '', value: visibleDataSection }}
            filter={filter}
            hasMatch={filter.hasValue()}
          />
        </div>
      ))}
    </div>
  );
};

export default Viewer;
