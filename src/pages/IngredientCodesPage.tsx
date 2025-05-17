import { Container, Typography, Box } from '@mui/material';
import CodeCard from '../components/common/CodeCard';
import { trainingData } from '../data/trainingData';

const IngredientCodesPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Ingredient Codes
        </Typography>
        <Typography variant="body1">
          Reference for all Domino's makeline ingredient codes. Gluten content is indicated where relevant.
        </Typography>
      </Box>
      {trainingData['ingredient-codes'].map((item) => (
        <CodeCard
          key={item.code}
          code={item.code}
          name={item.name}
          glutenContaining={item.glutenContaining}
        />
      ))}
    </Container>
  );
};

export default IngredientCodesPage; 