import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  text-align: center;
`;

export default function Layouts({ children }) {
  return (
    <div>
      <Head>
        <title>Next Shoppo</title>
      </Head>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#203040',
        }}
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: '#e430e4', marginLeft: '10px' }}
          >
            shoppo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ minHeight: '80vh', marginTop: '80px' }}>
        {children}
      </Container>
      <Footer>
        <Typography component="p">All rights reserved. Next shoppo.</Typography>
      </Footer>
    </div>
  );
}
