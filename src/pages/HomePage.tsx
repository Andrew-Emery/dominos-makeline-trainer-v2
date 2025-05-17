import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { navLinks } from '../components/common/Header';

const CardLink = styled(RouterLink)`
  text-decoration: none;
`;

const StyledCard = styled(Card)`
  height: 100%;
  transition: transform 0.2s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  }
`;

const cardData = [
  navLinks.find(link => link.label === 'Portion Codes'),
  navLinks.find(link => link.label === 'Ingredient Codes'),
  { label: 'Prebuilt Pizzas', path: '#' },
];

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
        {cardData.map((card, idx) => (
          <Grid key={card?.label || idx} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, flexGrow: 1 }}>
            <CardLink to={card?.path || '#'}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {card?.label}
                  </Typography>
                  <Typography variant="body1">
                    {card?.label === 'Portion Codes' && 'Learn the simple four portion codes for perfect pizza portioning.'}
                    {card?.label === 'Ingredient Codes' && 'Master the ingredient codes for efficient pizza assembly.'}
                    {card?.label === 'Prebuilt Pizzas' && 'Study the standard recipes for our most popular pizzas.'}
                  </Typography>
                </CardContent>
              </StyledCard>
            </CardLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage; 