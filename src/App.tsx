import Topbar from './components/topbar/topbar';
import { ThemeProvider, Box } from '@mui/material';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <Box className='App' sx={{bg: 'primary'}}>
          <header className='App-header'>
            <Topbar />
          </header>
        </Box>
    </ThemeProvider>
  );
}

export default App;
