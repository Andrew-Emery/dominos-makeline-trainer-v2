import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h1" color="primary" gutterBottom>
          Welcome to Domino's Makeline Trainer
        </Typography>
        <Typography variant="h2" color="secondary" sx={{ mb: 2 }}>
          Learn. Practice. Excel.
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto' }}>
          Master the art of pizza making with our comprehensive training platform.
          Learn portion codes, ingredient codes, and perfect your pizza assembly skills.
        </Typography>
      </Box>

      <Grid container columns={12} spacing={3}>
        <Grid sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, flexGrow: 1 }}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                Portion Codes
              </Typography>
              <Typography variant="body1">
                Learn the simple four portion codes for perfect pizza portioning.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, flexGrow: 1 }}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                Ingredient Codes
              </Typography>
              <Typography variant="body1">
                Master the ingredient codes for efficient pizza assembly.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, flexGrow: 1 }}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                Prebuilt Pizzas
              </Typography>
              <Typography variant="body1">
                Study the standard recipes for our most popular pizzas.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage; 