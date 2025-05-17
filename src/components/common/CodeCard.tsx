import { Card, CardContent, Box } from '@mui/material';
import styled, { css } from 'styled-components';

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

const CodeLabel = styled('span')<{ $long?: boolean }>`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  font-size: 1.25rem;
  ${({ $long }) =>
    $long && css`
      @media (max-width: 600px) {
        font-size: 1rem;
      }
    `}
`;

const NameLabel = styled('span')<{ $gluten?: boolean }>`
  flex: ${({ $gluten }) => ($gluten ? '0 0 60%' : '0 0 80%')};
  max-width: ${({ $gluten }) => ($gluten ? '60%' : '80%')};
  font-size: 1.1rem;
  font-weight: normal;
  color: inherit;
`;

const GlutenBadgeWrapper = styled(Box)`
  flex: 0 0 20%;
  max-width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const GlutenBadge = styled('span')`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  vertical-align: middle;
`;

const CodeCard = ({ code, name, glutenContaining }: CodeCardProps) => {
  const isLongCode = code.length > 3;
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Row>
          <CodeLabelWrapper>
            <CodeLabel $long={isLongCode}>{code}</CodeLabel>
          </CodeLabelWrapper>
          <NameLabel $gluten={!!glutenContaining}>{name}</NameLabel>
          {glutenContaining && (
            <GlutenBadgeWrapper>
              <GlutenBadge>Contains Gluten</GlutenBadge>
            </GlutenBadgeWrapper>
          )}
        </Row>
      </CardContent>
    </Card>
  );
};

export default CodeCard; 