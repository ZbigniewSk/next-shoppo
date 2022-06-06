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

export default function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
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
    <Layout title="Register">
      <form onSubmit={submitHandler}>
        <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
          <Typography component="h1" variant="h1">
            Register
          </Typography>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                inputProps={{ type: 'text' }}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </ListItem>
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
              <TextField
                variant="outlined"
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                inputProps={{ type: 'password' }}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Register
              </Button>
            </ListItem>
            <ListItem>
              Already have an account?&nbsp;
              <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                <Link>Login</Link>
              </NextLink>
            </ListItem>
          </List>
        </Box>
      </form>
    </Layout>
  );
}
