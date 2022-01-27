import React from 'react';
import { styled as CustomStyle } from '@mui/material/styles';
import styled from "styled-components";

import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../Assets/Img/logo.png';
import gear from '../../Assets/Img/P2.png';

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
            background-color: #fff;
            border-radius: .5em;
            padding: 1.5em;
            flex: 0 1 auto;
            width: 10%;
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
            }
            .content{
                ul{
                    margin: 0;
                    padding: 0;
                    li{
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

const Home = () => {
    return (
        <HomeWrapper>
            <HomeHeaderWrapper className='header'>
                <div className='logo-container'>
                    <img src={logo} alt=''/>
                </div>
                <div>
                    <MenuIcon/>
                </div>
            </HomeHeaderWrapper>
            <Divisor className='divisor'>

            </Divisor>
            <div className='welcome-text'>
                <p>Hello! First of all, tell us,</p>
                <p>what do you want to do today?</p>
            </div>
            <div className='options-container'>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={gear} alt=''/>
                    </div>
                    <div className='title'>
                        Initial category set up
                    </div>
                    <div className='content'>
                        <ul>
                            <li>
                                
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={gear} alt=''/>
                    </div>
                    <div className='title'>
                        Pricing Management
                    </div>
                    <div className='content'>
                        <ul>
                            <li>
                                Lab
                            </li>
                            <li>
                                Report Repository
                            </li>
                            <li>
                                Pricing Architecture
                            </li>
                            <li>
                                Relative Pricing Vs Competitors
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={gear} alt=''/>
                    </div>
                    <div className='title'>
                        Sales Planning
                    </div>
                    <div className='content'>
                        <ul>
                            <li>
                                Set up Retailers
                            </li>
                            <li>
                                Promotion Planning
                            </li>
                            <li>
                                Sell Out vs Sell In
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='option'>
                    <div className='option-icon'>
                        <img src={gear} alt=''/>
                    </div>
                    <div className='title'>
                        Forecasting
                    </div>
                    <div className='content'>
                        <ul>
                            <li>
                            
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className='footer'>
                <div>
                    Copyright © 2021-2022 Forecasting Lab
                </div>
            </div>
        </HomeWrapper>
    )
}

export default Home;