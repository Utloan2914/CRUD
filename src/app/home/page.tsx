import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import CarouselSlider from '@/app/carouselSlider/page';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Welcome to Pet CRUD Application!
        </Typography>
        <Typography variant="body1" paragraph>
          Our application allows you to manage your pets information easily. You can create, read, update, and delete (CRUD) pet profiles with just a few clicks.
        </Typography>
      </Box>

      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box p={3} border={1} borderColor="grey.300" borderRadius="borderRadius">
              <Typography variant="h5" gutterBottom>
                Create a Pet Profile
              </Typography>
              <Typography variant="body1">
                Add new pets to your collection by providing their details. It’s simple and quick!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={3} border={1} borderColor="grey.300" borderRadius="borderRadius">
              <Typography variant="h5" gutterBottom>
                Update Pet Information
              </Typography>
              <Typography variant="body1">
                Keep your pets profile up-to-date by editing their information anytime.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={3} border={1} borderColor="grey.300" borderRadius="borderRadius">
              <Typography variant="h5" gutterBottom>
                View Pet Profiles
              </Typography>
              <Typography variant="body1">
                Browse through the profiles of all your pets and learn more about each one.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={3} border={1} borderColor="grey.300" borderRadius="borderRadius">
              <Typography variant="h5" gutterBottom>
                Delete Pet Profiles
              </Typography>
              <Typography variant="body1">
                Remove pet profiles from your collection if they are no longer needed.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={5} textAlign="center">
        <Link href="/productAPI" passHref>
          <Button variant="contained" color="primary" size="large">
            Go to Pet CRUD
          </Button>
        </Link>
      </Box>
      <Typography variant="h3" gutterBottom align="center">
        Pet Cuteeeeeeee
      </Typography>
      <CarouselSlider />
    </Container>
  );
}
