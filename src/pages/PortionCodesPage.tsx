import { Container, Typography, Box } from '@mui/material';
import CodeCard from '../components/common/CodeCard';
import { trainingData } from '../data/trainingData';

const PortionCodesPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Portion Codes
        </Typography>
        <Typography variant="body1">
          Learn the standard portion codes used on the Domino's makeline.
        </Typography>
      </Box>
      {trainingData['portion-codes'].map((item) => (
        <CodeCard
          key={item.code}
          code={item.code}
          name={item.name}
        />
      ))}
    </Container>
  );
};

export default PortionCodesPage; 