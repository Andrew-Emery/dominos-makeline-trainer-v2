import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import HomePage from './pages/HomePage';
import PortionCodesPage from './pages/PortionCodesPage';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
