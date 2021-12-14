import React from 'react';
import CustomCursor from './Components/CustomCursor';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import Header from './Containers/Header';

import Categories from './Pages/Categories';
import Dashboard from './Pages/Dashboard';

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
        <BrowserRouter>
          <Routes>
            <Route path="categories" element={<Categories />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
  
}

export default App;
