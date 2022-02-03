import React from 'react';
import CustomCursor from './Components/CustomCursor';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Containers/Header';

import Categories from './Pages/Categories';
import TradeSpend from './Pages/TradeSpend2';
import Simulator from './Pages/Simulator';
import Clients from './Pages/Clients';
import PageConstution from './Pages/PageUnderConstruction';
import Home from './Pages/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#407D68',
      //main: '#89835f'
    },
    secondary: {
      main: '#eee'
    },
    bg: {
      main: '#1F1C36',
      //main: '#000'
    }
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
  }
});



function App() {

  const [render, setRender] = React.useState('0')
  const options = [
    {
      renderView: <Home onChange={(value) => {
        setRender(value)
      }} />,
      view: '0'
    },
    {
      renderView: <Categories
      />,
      view: '1'
    },
    {
      renderView: <Simulator />,
      view: '2'
    },
    {
      renderView: <TradeSpend />,
      view: '3'
    },
    {
      renderView: <Clients />,
      view: '4'
    },
    {
      renderView: <PageConstution onChange={(value) => {
        setRender(value)
      }} />,
      view: '5'
    },
  ]

  console.log(render)
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {
          render !== '0' &&
          <Header
            onChange={(value) => {
              setRender(value)
            }}
          />
        }

        <CustomCursor />
        {
          options.filter(idView => idView.view === render).map(renderView => renderView.renderView)
        }
      </ThemeProvider>
    </div>
  );
}

export default App;
