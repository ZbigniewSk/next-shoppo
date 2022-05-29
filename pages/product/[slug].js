import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function ProductScreen(props) {
  const { product } = props;
  //   const router = useRouter();
  //   const { slug } = router.query;
  //   const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>Product No Found</div>;
  } else {
    return (
      <Layout title={product.name} description={product.description}>
        <Box sx={{ marginTop: '10px', marginBottom: '10px' }}>
          <NextLink href="/" passHref>
            <Link>
              <Typography>back to products</Typography>
            </Link>
          </NextLink>
        </Box>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating: {product.rating} stars ({product.numReviews} reviews)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: '24px' }}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
