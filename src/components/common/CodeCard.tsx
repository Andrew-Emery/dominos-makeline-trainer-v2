import { Card, CardContent, Box } from '@mui/material';
import styled from 'styled-components';

interface CodeCardProps {
  code: string;
  name: string;
  glutenContaining?: boolean;
}

const Row = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CodeLabelWrapper = styled(Box)`
  flex: 0 0 20%;
  max-width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CodeLabel = styled('span')`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  font-size: 1.25rem;
`;

const NameLabel = styled('span')`
  flex: 0 0 80%;
  max-width: 80%;
  font-size: 1.1rem;
  font-weight: normal;
  color: inherit;
`;

const GlutenIndicator = styled(Box)`
  margin-top: 8px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.95rem;
  font-weight: 600;
`;

const CodeCard = ({ code, name, glutenContaining }: CodeCardProps) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Row>
        <CodeLabelWrapper>
          <CodeLabel>{code}</CodeLabel>
        </CodeLabelWrapper>
        <NameLabel>{name}</NameLabel>
      </Row>
      {glutenContaining !== undefined && (
        <GlutenIndicator>
          {glutenContaining ? 'Contains Gluten' : 'Gluten Free'}
        </GlutenIndicator>
      )}
    </CardContent>
  </Card>
);

export default CodeCard; 