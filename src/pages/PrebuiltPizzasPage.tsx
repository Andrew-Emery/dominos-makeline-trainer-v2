import { Container, Typography, Box } from '@mui/material';

import PrebuiltPizzaCard from '../components/PrebuiltPizzaCard';
import { trainingData } from '../data/trainingData';

const PrebuiltPizzasPage = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Prebuilt Pizzas
      </Typography>
      <Typography variant="body1">Reference for all Domino's standard pizza builds.</Typography>
    </Box>
    {trainingData['pre-built'].map((pizza) => (
      <PrebuiltPizzaCard key={pizza.code} pizza={pizza} />
    ))}
  </Container>
);

export default PrebuiltPizzasPage;
