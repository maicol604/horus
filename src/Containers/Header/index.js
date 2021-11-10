import React from 'react';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
    padding: '1em', 
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    height:'4em',
    boxSizing:'border-box'
}));
  

const Header = () => {

    return (
        <>
        <HeaderContainer>
            -
        </HeaderContainer>
        <div style={{height:'4em'}}/>
        </>
    )
}

export default Header;