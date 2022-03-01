import AppHeader from './cmps/AppHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemApp from './views/ItemApp';
import HomePage from './views/HomePage';
import { createTheme, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import {useEffect, useMemo, useState} from 'react';
import { ColorModeContext } from './lib/context/ColorModeContext';
import UserProfile from './views/UserProfile';
import { UserProvider } from './lib/context/UserContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3030/auth/login/success', {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        })
            .then(res => {
                if(res.status === 200) return res.json();
                throw new Error('authentication failed');
            })
            .then(resObject => {
                setUser(resObject.user);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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
          <UserProvider>
            <div className='App'>
              <AppHeader user={user} />
              <Switch>
                <Route component={ItemApp} path='/item' />
                <Route component={UserProfile} path='/profile' />
                <Route component={HomePage} path='/' />
              </Switch>
              {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
            </div>
          </UserProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
