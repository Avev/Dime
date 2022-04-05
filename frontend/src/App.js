import AppHeader from './cmps/AppHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemApp from './views/ItemApp';
import HomePage from './views/HomePage';
import AboutPage from './views/About';
import { createTheme, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useContext, useMemo, useState } from 'react';
import { ColorModeContext } from './lib/context/ColorModeContext';
import UserProfile from './views/UserProfile';
import { UserContext } from './lib/context/UserContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  const { user, setUser } = useContext(UserContext);
  const [mode, setMode] = useState('light');

  useEffect(() => {
    fetch('http://localhost:3030/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error('authentication failed');
      })
      .then((resObject) => {
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <AppHeader user={user} />
            <Switch>
              <Route component={ItemApp} path='/item' />
              <Route component={() => <UserProfile user={user} />} path='/profile' />
              <Route component={AboutPage} path="/about" />
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
