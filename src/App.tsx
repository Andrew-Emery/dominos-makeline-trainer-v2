import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import styled from 'styled-components';

import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import CrustCodesPage from './pages/CrustCodesPage';
import HomePage from './pages/HomePage';
import IngredientCodesPage from './pages/IngredientCodesPage';
import PortionCodesPage from './pages/PortionCodesPage';
import { theme } from './theme/theme';

const AppContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled(Box)`
  flex: 1;
`;

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename="/dominos-makeline-trainer-v2">
          <AppContainer>
            <Header />
            <MainContent>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portion-codes" element={<PortionCodesPage />} />
                <Route path="/ingredient-codes" element={<IngredientCodesPage />} />
                <Route path="/crust-codes" element={<CrustCodesPage />} />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
