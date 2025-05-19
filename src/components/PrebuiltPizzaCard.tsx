import { Card, CardContent, Typography, Box } from '@mui/material';
import styled from 'styled-components';

import { getIngredientName, parseTopping, type PreBuiltItem } from '../data/trainingData';
import { trainingData } from '../data/trainingData';

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

const getPortionLabel = (portion: string | undefined) => {
  if (!portion) return '';
  const portionObj = trainingData['portion-codes'].find((p) => p.code === portion);
  if (!portionObj) return '';
  // Use the first word of the portion name for brevity (e.g. 'Extra', 'Double', 'Less', 'Minus')
  return portionObj.name.split(' ')[0];
};

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
        {pizza.toppings.map((topping) => {
          const { portion, code } = parseTopping(topping);
          const name = getIngredientName(code);
          const portionLabel = getPortionLabel(portion);
          const displayName = portion ? `${portionLabel} ${name}`.trim() : name;
          return (
            <ToppingPill key={topping}>
              {portion ? portion : ''}
              {code}: {displayName}
            </ToppingPill>
          );
        })}
      </ToppingsRow>
      {pizza.notes && <Note>{pizza.notes}</Note>}
    </CardContent>
  </Card>
);

export default PrebuiltPizzaCard;
