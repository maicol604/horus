import React from 'react';
import styled, { keyframes } from "styled-components";
import logo from '../../Assets/Img/eye.png'

const animationMinute = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;


const Wrapper = styled.div`
    width:3em;
    height:1.5em;
    animation: ${animationMinute} 2s linear infinite;
`

const Loader = () => {
    return (
        <Wrapper>
            <img src={logo} alt='' style={{width:'100%'}}/>
        </Wrapper>
    )
}

export default Loader;