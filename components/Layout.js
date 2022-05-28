import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  margin-top: 10px;
  text-align: center;
`;

export default function Layout({ title, description, children }) {
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
      type: 'light',
      primary: {
        main: '#e430e4',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  return (
    <div>
      <Head>
        <title>{title ? `${title} - shoppo` : `shoppo`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
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
        <Footer>
          <Typography component="p">
            All rights reserved. Next shoppo.
          </Typography>
        </Footer>
      </ThemeProvider>
    </div>
  );
}
