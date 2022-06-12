import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import jsCookie from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Store } from '../utils/Store';
import NoSsr from './NoSsr';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const router = useRouter();

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',

      ...(darkMode === false
        ? {
            primary: {
              // main: '#e430e4',
              light: '#f0f0f0',
              main: '#ba68c8',
              dark: '#0f0f0f',
            },
            secondary: {
              // main: '#208080',
              light: '#f0f0f0',
              main: '#4fc3f7',
              dark: '#0f0f0f',
            },
            background: {
              default: '#ffffff',
              paper: '#f6f6f8',
            },
            navbar: {
              main: '#404040',
            },
          }
        : {
            primary: {
              // main: '#e430e4',
              light: '#f0f0f0',
              main: '#ba68c8',
              dark: '#0f0f0f',
            },
            secondary: {
              // main: '#208080',
              light: '#f0f0f0',
              main: '#4fc3f7',
              dark: '#0f0f0f',
            },
            // background: {
            //   default: '#263238',
            //   paper: '#000000',
            // },
            navbar: {
              main: '#212121',
            },
          }),
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - shoppo` : `shoppo`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <NoSsr>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="fixed" color="navbar">
            <Toolbar>
              <NextLink href="/" passHref>
                <Link color="primary" sx={{ textDecoration: 'none' }}>
                  <Typography
                    component="h1"
                    variant="h1"
                    sx={{
                      marginLeft: '10px',
                    }}
                  >
                    shoppo
                  </Typography>
                </Link>
              </NextLink>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch
                  checked={darkMode}
                  onChange={darkModeChangeHandler}
                  color="secondary"
                ></Switch>
                <NextLink href="/cart" passHref>
                  <Link sx={{ textDecoration: 'none' }}>
                    {cart.cartItems.length > 0 ? (
                      <Badge badgeContent={cart.cartItems.length}>
                        <Typography sx={{ marginX: '10px' }}>Cart</Typography>
                      </Badge>
                    ) : (
                      <Typography sx={{ marginX: '10px' }}>Cart</Typography>
                    )}
                  </Link>
                </NextLink>
                <NextLink href="/login" passHref>
                  {userInfo ? (
                    <>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={loginClickHandler}
                      >
                        <Typography
                          sx={{ marginX: '10px', textTransform: 'initial' }}
                        >
                          {userInfo.name}
                        </Typography>
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={loginMenuCloseHandler}
                      >
                        <MenuItem onClick={loginMenuCloseHandler}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={loginMenuCloseHandler}>
                          My account
                        </MenuItem>
                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Link sx={{ textDecoration: 'none' }}>
                      <Typography sx={{ marginX: '10px' }}>Login</Typography>
                    </Link>
                  )}
                </NextLink>
              </Box>
            </Toolbar>
          </AppBar>
          <Container
            sx={{
              minHeight: '80vh',
              marginTop: '80px',
            }}
          >
            {children}
          </Container>
          <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
            <Typography component="p">
              All rights reserved. Next shoppo.
            </Typography>
          </Box>
        </ThemeProvider>
      </NoSsr>
    </div>
  );
}
