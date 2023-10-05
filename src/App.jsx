import { useEffect, useState } from 'react';
import Header from './components/Header';

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkTheme, setDarkTheme] = useState(prefersDark);

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) =>
      e.matches ? setDarkTheme(true) : setDarkTheme(false)
    );

  const handleToggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false);
    } else {
      setDarkTheme(true);
    }
  };

  useEffect(() => {
    let bodyClassName = 'theme--dark';

    if (!darkTheme) {
      bodyClassName = 'theme--light';
    }
    document.body.className = bodyClassName;
  }, [darkTheme]);

  return (
    <div className="app">
      <Header darkTheme={darkTheme} handleToggleTheme={handleToggleTheme} />
    </div>
  );
}

export default App;
