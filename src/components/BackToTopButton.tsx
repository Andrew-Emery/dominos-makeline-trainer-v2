import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Zoom } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledFab = styled(Fab)`
  && {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${({ theme }) => theme.palette.secondary.main};
    color: #fff;
    z-index: 1000;
    &:hover {
      background: ${({ theme }) => theme.palette.primary.main};
    }
  }
  @media (max-width: 600px) {
    right: 1rem;
    bottom: 1rem;
  }
`;

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <StyledFab color="secondary" size="medium" aria-label="Back to top" onClick={handleClick}>
        <KeyboardArrowUpIcon />
      </StyledFab>
    </Zoom>
  );
};

export default BackToTopButton;
