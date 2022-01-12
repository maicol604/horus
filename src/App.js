import React from 'react';
import CustomCursor from './Components/CustomCursor';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import Header from './Containers/Header';

import Categories from './Pages/Categories';
import Dashboard from './Pages/Dashboard';
import Simulator from './Pages/Simulator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#407D68',
      //main: '#89835f'
    },
    secondary: {
      main: '#eee'
    },
    bg:{
      main: '#1F1C36',
      //main: '#000'
    }
  },
});

function App() {

  const [render, setRender] = React.useState('1')

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header
          onChange={(value)=>{
            console.log(value)
            setRender(value)
          }}
        />
        <CustomCursor/>
          {
            render==='1'?
            <Categories />
            :
            <Simulator />
          }
        {/* {<BrowserRouter>
          <Routes>
            <Route path="categories" element={<Categories />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="horus" element={<Simulator />} />
          </Routes>
        </BrowserRouter>} */}
      </ThemeProvider>
    </div>
  );
  
}

export default App;
