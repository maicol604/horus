import React from 'react';
import { styled as CustomStyle } from '@mui/material/styles';
import styled from "styled-components";
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../Assets/Img/logo.png';
import gear from '../../Assets/Img/P2.png';
import banderaespania from '../../Assets/Img/espaniabandera.png'
import banderausa from '../../Assets/Img/banderausa.png'
import initialIcon from '../../Assets/Img/17.png';
import pricingIcon from '../../Assets/Img/18.png';
import salesIcon from '../../Assets/Img/19.png';
import forecastIcon from '../../Assets/Img/20.png';
import plankton from '../../Assets/Img/plakton.png';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';


const HomeHeaderWrapper = CustomStyle('div')(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
    width: '100%',
    boxSizing: 'border-box',
    padding: '1em 4em',
    height: '5em',
    zIndex: '10',
}));

const Divisor = CustomStyle('div')(({ theme }) => ({
    backgroundColor: theme.palette.bg.main,
}));

const HomeWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: #ededed;
    position: relative;
    flex-direction: column;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
    }
    .divisor{
        height: calc(50vh - 5em);
        width: 100vw;
        z-index: 1;
        position: absolute;
        top: 5em;
        left: 0;
        opacity: .9;
    }
    .logo-container{
        width: 5em;
        img{
            width: 100%;
        }
    }
    .welcome-text{
        padding-top: 1em;
        color: #fff;
        font-size: 2em;
        z-index: 2;
        font-weight: 600;
        p{
            margin: .25em;
        }
    }
    .options-container{
        z-index: 2;
        display: flex;
        justify-content: center;
        position: absolute;
        top: 40vh;
        width: 100vw;
        .option{
            background-color: #469378;
            border-radius: 50%;
            height: 150px;
            padding: 1.5em;
            flex: 0 1 auto;
            width: 10%;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            color: #fff;
            box-shadow: 5px 5px 20px rgba(0,0,5,50);
            .option-icon{

                img{
                    width: 3em;
                }
            }
            .title{
                text-transform: capitalize;
                font-weight: 600;
                margin-bottom: 1em;
                opacity: .75;
                cursor: pointer;
            }
            .content{
                ul{
                    margin: 0;
                    padding: 0;
                    li{
                        font-family: 'Open Sans', sans-serif;
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        font-weight: 300;
                        cursor: pointer;
                        text-align: left;
                        opacity: .5;
                        transition: opacity .5s;
                        &:hover{
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .option:nth-child(n+1):nth-last-child(n+2){
            margin-right: 1em;
        }
    }
    .footer{
        position: absolute;
        width: 100vw;
        height: 3em;
        bottom: 0em;
        left: 0;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 1em 3em;
        box-sizing: border-box;
        color: #999;
    }
`;

const Home = ({ onChange,toChange,toLab }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selectMenu, setSelectMenu] = React.useState(null);
    const handleClick = (event) => {

        setSelectMenu(event.target.id)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onToLab = (value) => {
         onChange('2');
         toChange(true)
         }


    return (
        <HomeWrapper>
            <HomeHeaderWrapper className='header'>
                <div className='logo-container'>
                    {/** <img src={logo} alt=''/> */}
                </div>
                <div>
                    <MenuIcon style={{ cursor: 'pointer' }} onClick={handleClick} id='menu' />
                    {
                        selectMenu === 'menu' ?
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <img style={{ width: '20px' }} src={banderaespania} />
                                    </ListItemIcon>
                                    <Typography style={{ fontWeight: 'bold' }} >
                                        Español
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <img style={{ width: '20px' }} src={banderausa} />
                                    </ListItemIcon>
                                    <Typography style={{ fontWeight: 'bold' }} >
                                        Inglés
                                    </Typography>
                                </MenuItem>
                            </Menu> : null
                    }

                </div>
            </HomeHeaderWrapper>
            <Divisor className='divisor'>

            </Divisor>
            <div className='welcome-text'>
                <img src={logo} alt='' width={'250px'} />

            </div>
            <div className='options-container'>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={initialIcon} style={{ width: '75px' }} />
                    </div>
                    <div className='title'>
                        <Typography style={{ fontWeight: 'bold' }} onClick={handleClick} id='Initial' >
                            Initial category set up
                        </Typography>
                    </div>
                    <div className='content'>
                        {
                            selectMenu === 'Initial' ?
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => { onChange('1');
                                                               toChange(false) }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Carga de datos
                                        </Typography>
                                    </MenuItem>
                                </Menu> : null
                        }

                    </div>
                </div>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={pricingIcon} style={{ width: '75px' }} />
                    </div>
                    <div className='title' >
                        <Typography style={{ fontWeight: 'bold' }} onClick={handleClick} id='PricingManagement'>
                            Pricing Management
                        </Typography>
                    </div>
                    <div className='content'>
                        {
                            selectMenu === 'PricingManagement' ?
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={()=> {
                                        onChange('2');
                                        toChange(true)
                                    }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Lab
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { onChange('5') }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Report repository
                                        </Typography>
                                    </MenuItem>
                                </Menu> : null
                        }
                    </div>
                </div>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={salesIcon} style={{ width: '75px' }} />
                    </div>
                    <div className='title' >
                        <Typography style={{ fontWeight: 'bold' }} onClick={handleClick} id='SalesPlanning' >
                            Sales Planning
                        </Typography>
                    </div>
                    <div className='content'>
                        {
                            selectMenu === 'SalesPlanning' ?
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => { onChange('4') 
                                    toChange(false) }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Setup retailers
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { onChange('3') 
                                                              toChange(false)
                                                          }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Promotion Planning
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                         onChange('5')
                                         toChange(false)
                                         }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Sell in vs Sell out
                                        </Typography>
                                    </MenuItem>
                                </Menu> : null
                        }

                    </div>
                </div>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={forecastIcon} style={{ width: '75px' }} />
                    </div>
                    <div className='title'  >
                        <Typography style={{ fontWeight: 'bold' }} onClick={handleClick} id='Forecasting'>
                            Forecasting
                        </Typography>
                    </div>
                    <div className='content'>
                        {
                            selectMenu === 'Forecasting' ?
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => { 
                                        onChange('5') 
                                        toChange(false)
                                        }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Building blocks
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { 
                                          onChange('5')
                                          toChange(false)
                                     }}>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            Demand Planning
                                        </Typography>
                                    </MenuItem>
                                </Menu> : null
                        }
                    </div>
                </div>

            </div>
            
            <div className='footer'>
                <div>
                    Copyright © 2021-2022 Forecasting Lab
                </div>
            </div>
            <div style={{display: 'flex', justifyContent:'flex-end', width:'150px', height:'150px', position:'absolute',  bottom: '2.2em', right: '10px'}} >
             <img src={plankton} alt='' style={{ width: '250px', height:'150px' }} /> 
            </div> 
        </HomeWrapper>
    )
}

export default Home;