import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

export default function Layouts({ children }) {
  return (
    <div>
      <Head>
        <title>Next Shoppo</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>Shoppo</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography>All rights reserved. Next Shoppo.</Typography>
      </footer>
    </div>
  );
}
