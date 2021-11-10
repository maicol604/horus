import React from 'react';
import Categories from './Pages/Categories';
import CustomCursor from './Components/CustomCursor';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Containers/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B9982',
    },
    secondary: {
      main: '#eee'
    },
    bg:{
      main: '#1F1C36'
    }
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header/>
        <CustomCursor/>
        <Categories/>
      </ThemeProvider>
    </div>
  );
  
}

export default App;
