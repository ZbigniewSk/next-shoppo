import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import NoSsr from './NoSsr';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
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
      primary: {
        main: '#e430e4',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
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
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: '#203040',
            }}
          >
            <Toolbar>
              <NextLink href="/" passHref>
                <Link>
                  <Typography
                    component="h1"
                    variant="h1"
                    sx={{
                      color: '#primary',
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                    }}
                  >
                    shoppo
                  </Typography>
                </Link>
              </NextLink>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box>
                <Switch
                  checked={darkMode}
                  onChange={darkModeChangeHandler}
                  color="secondary"
                ></Switch>
                <NextLink href="/cart" passHref>
                  <Link>Cart</Link>
                </NextLink>
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              </Box>
            </Toolbar>
          </AppBar>
          <Container sx={{ minHeight: '80vh', marginTop: '80px' }}>
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
