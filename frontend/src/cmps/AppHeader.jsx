import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../lib/context/ColorModeContext';
import ItemAdd from './ItemAdd';
import classes from '../assets/styles/cmps/AppHeader.module.css';
import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';

// const pages = ['Products', 'Pricing', 'Blog'];
const pages = {
  headerLinks: [
    {
      name: 'Products',
      to: '/item',
    },
    {
      name: 'Profile',
      to: '/profile',
      isRequiredAuth: true,
    },
    {
      name: 'About',
      to: '/about',
    },
    {
      name: 'Contact Us',
      to: '/contact-us',
    },
  ],
  menuLinks: [],
};

const ResponsiveAppBar = (user) => {
  const history = useHistory();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route) => {
    console.log({ route });
    if (route.isRequiredAuth && !user?.user) {
      redirectToLogin();
    } else {
      history.push(`${route.to}`);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickPageLink = (page) => {
    if (page.isRequiredAuth && !user?.user) {
      redirectToLogin();
    } else {
      history.push(`${page.to}`);
    }
    setAnchorElNav(null);
  };

  const redirectToLogin = () => {
    window.open('http://localhost:3030/auth/google', '_self');
  };
  return (
    <AppBar
      className={classes.appBar}
      sx={{ borderBottom: `1px solid ${theme.palette.primary.main}` }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            onClick={() => { history.push('/') }}
            sx={{ mr: 2, cursor: 'pointer', display: { xs: 'none', md: 'flex' } }}>
            Dime
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.headerLinks.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleClickPageLink(page)}>
                  <Typography textAlign='center'>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            Dime
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.headerLinks.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleClickPageLink(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.name}
              </Button>
            ))}
          </Box>
          <LoginButton user={user.user} />
          <ItemAdd user={user.user} />
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color='inherit'>
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={() => {
                handleCloseNavMenu({isRequiredAuth: true, to: '/profile'})
              }} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
