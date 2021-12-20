import React from 'react';
import { styled } from '@mui/material/styles';

import logo from '../../Assets/Img/loreal-logo.svg';

const HeaderContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
    padding: '1em', 
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    height:'4em',
    boxSizing:'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
}));
  

const Header = () => {

    return (
        <>
        <HeaderContainer>
            <div style={{filter:'invert(1)', width:'8em'}}><img src={logo} alt='' style={{width:'100%', height:'auto'}}/></div>
        </HeaderContainer>
        <div style={{height:'4em'}}/>
        </>
    )
}

export default Header;