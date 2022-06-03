import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Login() {
  const router = useRouter();

  const loginHandler = () => {
    //router.push('/shipping');
  };

  return (
    <Layout title="Login">
      <form>
        <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
          <Typography component="h1" variant="h1">
            Login
          </Typography>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                inputProps={{ type: 'email' }}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                inputProps={{ type: 'password' }}
              ></TextField>
            </ListItem>
            <ListItem>
              <Button
                onClick={loginHandler}
                variant="outlined"
                color="primary"
                fullWidth
                type="submit"
                sx={{ borderRadius: '24px' }}
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              Don't have an account?&nbsp;
              <NextLink href={'/register'} passHref>
                <Link>Register</Link>
              </NextLink>
            </ListItem>
          </List>
        </Box>
      </form>
    </Layout>
  );
}
