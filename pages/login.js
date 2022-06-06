import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import jsCookie from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      jsCookie.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout title="Login">
      <form onSubmit={submitHandler}>
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
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                inputProps={{ type: 'password' }}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </ListItem>
            <ListItem>
              <Button
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
