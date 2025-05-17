import { AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import pizzaIcon from '../../assets/pizza.svg';

const StyledAppBar = styled(AppBar)`
  background-color: ${props => props.theme.palette.primary.main};
`;

const Logo = styled(Typography)`
  flex-grow: 1;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const NavBar = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Button)<{ active?: string }>`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  box-shadow: none;
  transition: background 0.2s, color 0.2s;
  background: ${({ active, theme }) =>
    active === 'true' ? '#fff' : theme.palette.primary.main};
  color: ${({ active, theme }) =>
    active === 'true' ? theme.palette.primary.main : '#fff'};
  &:hover {
    background: ${({ theme }) => theme.palette.secondary.main};
    color: #fff;
    box-shadow: none;
  }
  text-decoration: none;
`;

const PizzaIcon = styled('img')`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
`;

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Portion Codes", path: "/portion-codes" },
  { label: "Ingredient Codes", path: "/ingredient-codes" },
  { label: "Crust Codes", path: "/crust-codes" },
];

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Logo variant="h6" as={RouterLink} to="/">
          <PizzaIcon src={pizzaIcon} alt="Pizza" />
          <span style={{ verticalAlign: 'middle' }}>Domino's Makeline Trainer</span>
        </Logo>
        {!isMobile && (
          <NavBar>
            {navLinks.filter((link) => link.label !== "Home").map(link => (
              <NavLink
                key={link.path}
                as={RouterLink}
                to={link.path}
                active={(location.pathname === link.path).toString()}
              >
                {link.label}
              </NavLink>
            ))}
          </NavBar>
        )}
        {isMobile && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
          >
            <Box sx={{ width: 220 }} role="presentation" onClick={handleDrawerToggle}>
              <List>
                {navLinks.map(link => (
                  <ListItem key={link.path} disablePadding>
                    <ListItemButton component={RouterLink} to={link.path} selected={location.pathname === link.path}>
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};
