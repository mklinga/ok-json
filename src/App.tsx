import React from 'react';
import Viewer from './components/Viewer';

import { parseDataModel } from './utils/model';

import './App.css';

const exampleJson = parseDataModel({
  text: 'A sample of the finest texts',
  number: 800,
  // array: [ 1, 2, 3, 4 ],
  // object: {
  //   text: "Another text",
  //   number: 600
  // }
});

function App() {
  const [data, setData] = React.useState<object | null>(exampleJson);
  const [error, setError] = React.useState<string | null>(null);

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
      </header>
      <main className="App-body">
        {data
          ? <Viewer data={data} />
          : <button type="button" onClick={pasteFromClipboard}>Paste from clipboard</button>}
      </main>
    </div>
  );
}

export default App;
