import { Router } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      Router.push('/shipping');
    } else {
      setPaymentMethod(JSON.parse(jsCookie.get('paymentMethod')) || '');
    }
  }, []);

  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      jsCookie.set('paymentMethod', JSON.stringify(paymentMethod));
      router.push('/placeorder');
    }
  };
  console.log('pay ', paymentMethod);
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form onSubmit={submitHandler}>
        <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
          <Typography component="h1" variant="h1">
            Payment Method
          </Typography>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value="PayPal"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Stripe"
                    value="Stripe"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ borderRadius: '24px' }}
              >
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: '24px' }}
                onClick={() => router.push('/shipping')}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </Box>
      </form>
    </Layout>
  );
}
