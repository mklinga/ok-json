import React from 'react';
import Viewer from './components/Viewer';
import Toolbar from './components/Toolbar';

import { parseDataModel } from './utils/model';
import { Filter, OkJsonValue } from './types';

import './App.css';

// const mockJson = parseDataModel({
//   a: {
//     b: [
//       1,
//       { is_this: true },
//       'abc def',
//       null,
//     ],
//     c: 99,
//   },
//   d: {
//     e: 12,
//   },
// });

function App() {
  const [data, setData] = React.useState<OkJsonValue | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<Filter>({ value: '' });

  const pasteFromClipboard = () => {
    navigator.clipboard.readText()
      .then((text) => {
        try {
          setError(null);
          setData(parseDataModel(JSON.parse(text)));
        } catch (e) {
          setError('That does not look like json...');
        }
      })
      .catch(() => setError('You really need to give the permission for this one...'));
  };

  return (
    <div className="App">
      <header className="App-header">
        Feed me JSON!
        {error ? <span className="App-error">{error}</span> : null}
        <Toolbar filter={filter} setFilter={setFilter} />
      </header>
      <main className="App-body">
        {data
          ? <Viewer data={data} filter={filter} />
          : <button type="button" onClick={pasteFromClipboard}>Paste from clipboard</button>}
      </main>
    </div>
  );
}

export default App;
