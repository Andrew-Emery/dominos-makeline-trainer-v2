import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Zoom } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FOOTER_HEIGHT = 36;

const StyledFab = styled(Fab)<{ $bottom: number }>`
  && {
    position: fixed;
    bottom: ${({ $bottom }) => `${$bottom}px`};
    right: 2rem;
    background: ${({ theme }) => theme.palette.secondary.main};
    color: #fff;
    z-index: 1000;
    transition: bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: ${({ theme }) => theme.palette.primary.main};
    }
  }
  @media (max-width: 600px) {
    right: 1rem;
    bottom: ${({ $bottom }) => `${$bottom - 16}px`};
  }
`;

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [bottom, setBottom] = useState(32);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
      const scrollBottom =
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      if (scrollBottom < FOOTER_HEIGHT + 16) {
        setBottom(FOOTER_HEIGHT + 32);
      } else {
        setBottom(32);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <StyledFab
        color="secondary"
        size="medium"
        aria-label="Back to top"
        onClick={handleClick}
        $bottom={bottom}
      >
        <KeyboardArrowUpIcon />
      </StyledFab>
    </Zoom>
  );
};

export default BackToTopButton;
