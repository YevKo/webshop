import { Button } from '@mui/material';
import { Box } from "@mui/material";

import './App.css';

function App() {
  return (
        <Box className='App' sx={{bg: 'secundary'}}>
          <header className="App-header">
            <p>Hello!</p>
            <Button variant="contained" color="primary">
              Click me
            </Button>
          </header>
        </Box>
  );
}

export default App;
