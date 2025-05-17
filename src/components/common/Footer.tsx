import { Box, Typography, Link } from '@mui/material';
import styled from 'styled-components';

const StyledFooter = styled(Box)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
        This is an unofficial training tool and is not affiliated with Domino's Pizza Inc.{' '}
        <Link
          href="https://www.dominos.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
        >
          Visit the official Domino's website here.
        </Link>
      </Typography>
    </StyledFooter>
  );
};
