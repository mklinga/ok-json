import React from 'react';
import OkJson from './components/OkJson';
import './App.css';


function App() {
  const [data, setData] = React.useState<object | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const pasteFromClipboard = () => {
    navigator.clipboard.readText()
      .then((text) => {
        try {
          setError(null);
          setData(JSON.parse(text));
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
          ? <OkJson data={data} />
          : <button type="button" onClick={pasteFromClipboard}>Paste from clipboard</button>}
      </main>
    </div>
  );
}

export default App;
