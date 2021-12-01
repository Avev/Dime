import ResponsiveAppBar from './cmps/AppHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemApp from './views/ItemApp';
import HomePage from './views/HomePage';
import { createTheme, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState } from 'react';
import { ColorModeContext } from './lib/context/ColorModeContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='App'>
            <ResponsiveAppBar />
            <Switch>
              <Route component={ItemApp} path='/item' />
              <Route component={HomePage} path='/' />
            </Switch>
            {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
