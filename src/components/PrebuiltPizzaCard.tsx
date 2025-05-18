import { Card, CardContent, Typography, Box } from '@mui/material';
import styled from 'styled-components';

import { getIngredientName, type PreBuiltItem } from '../data/trainingData';

const ToppingPill = styled('span')`
  display: inline-block;
  background: #30628a;
  color: #fff;
  border-radius: 20px;
  padding: 0.4em 1em;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
`;

const ToppingsRow = styled(Box)`
  margin: 1em 0 0.5em 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const Note = styled(Typography)`
  color: #888;
  font-size: 1rem;
  margin-top: 0.5em;
`;

const PrebuiltPizzaCard = ({ pizza }: { pizza: PreBuiltItem }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
        {pizza.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Code: {pizza.code}
      </Typography>
      <ToppingsRow>
        {pizza.toppings.map((code) => {
          const name = getIngredientName(code.replace(/^[-~+2]/, ''));
          const portion = code.match(/^[-~+2]/) ? code[0] + ': ' : '';
          return (
            <ToppingPill key={code}>
              {portion}
              {name}
            </ToppingPill>
          );
        })}
      </ToppingsRow>
      {pizza.notes && <Note>{pizza.notes}</Note>}
    </CardContent>
  </Card>
);

export default PrebuiltPizzaCard;
