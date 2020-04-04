import React from 'react';
import Viewer from './components/Viewer';
import DataInput from './components/DataInput';
import Toolbar from './components/Toolbar';

import Filter from './utils/filter';
import { FilterType, OkJsonValue } from './types';

import './App.css';

function App() {
  const [data, setData] = React.useState<OkJsonValue | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<FilterType>(new Filter());

  return (
    <div className="App">
      <header className="App-header">
        Feed me JSON!
        {error ? <span className="App-error">{error}</span> : null}
        {data ? <Toolbar setFilter={setFilter} /> : null}
      </header>
      <main className="App-body">
        {data
          ? <Viewer data={data} filter={filter} />
          : <DataInput setData={setData} setError={setError} />}
      </main>
    </div>
  );
}

export default App;
