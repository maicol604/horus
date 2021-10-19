import React from 'react';
import Categories from './Pages/Categories';
import CustomCursor from './Components/CustomCursor';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B9982',
    },
    secondary: {
      main: '#eee'
    }
  },
});

function App() {

  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
        <CustomCursor/>
        <Categories/>
      </ThemeProvider>
    </div>
  );
  
}

export default App;
