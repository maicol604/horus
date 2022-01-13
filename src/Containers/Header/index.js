import React from 'react';
import { styled } from '@mui/material/styles';

import logo from '../../Assets/Img/logo.png';

const HeaderContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
    padding: '1em 4em 1em 4em', 
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    height:'6em',
    boxSizing:'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
}));
  

const Header = ({onChange}) => {

    return (
        <>
            <HeaderContainer>
                <div style={{filter:'invert(0)', width:'8em'}}><img src={logo} alt='' style={{width:'100%', height:'auto'}}/></div>
                <div style={{display:'flex', color:'#fff'}}>
                    <div style={{marginRight:'2em', cursor:'pointer'}} onClick={()=>{onChange('1')}}>Carga de datos</div>
                    <div style={{marginRight:'2em', cursor:'pointer'}} onClick={()=>{onChange('2')}}>Laboratorio</div>
                    <div style={{cursor:'pointer'}} onClick={()=>{}}>Trade spend</div>
                </div>
            </HeaderContainer>
            <div style={{height:'6em'}}/>
        </>
    )
}

export default Header;