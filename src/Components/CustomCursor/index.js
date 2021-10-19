import React from 'react';
import useMousePosition from '../../Hooks/useMousePosition';
import { makeStyles } from '@mui/styles';
import logo from './horus.svg';
import { display } from '@mui/system';


const useStyles = makeStyles((theme)=>({
    cursor: {
        position: 'fixed',
        width: '2em',
        height: '2em',
        //backgroundColor:'red',
        zIndex: '1000000',
        //cursor: 'none'
        //backgroundColor: 'red',
        display: 'flex',
        filter: 'brightness(0)'
    },
}));

const CustomCursor = () => {
    const classes = useStyles();
    const { x, y } = useMousePosition();

    return (
        <div
            style={{ left: `calc(${x}px + .5em)`, top: `calc(${y}px + 1.25em)` }}
            className={classes.cursor}
        >
            <img style={{width:'100%'}} src={logo}/>
        </div>
    )
}   

export default CustomCursor;