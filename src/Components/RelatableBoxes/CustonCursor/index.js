import React from 'react';

import useMousePosition from '../../../Hooks/useMousePosition';
import { makeStyles } from '@mui/styles';
import handOpen from '../../../Assets/Img/hand-open.svg';
import handClose from '../../../Assets/Img/hand-closed.svg';


const useStyles = makeStyles((theme)=>({
    cursor: {
        position: 'fixed',
        width: '1em',
        height: '1em',
        //backgroundColor:'red',
        zIndex: '1000000',
        //cursor: 'none'
    },
}));

const CustomCursor = () => {
    const classes = useStyles();
    const { x, y } = useMousePosition();
    const [presed, setPresed] = React.useState(false);

    return (
        <div
            style={{ left: `calc(${x}px - .5em)`, top: `calc(${y}px - .5em)` }}
            className={classes.cursor}
            onMouseDown={()=>setPresed(true)}
            onMouseUp={()=>setPresed(false)}
        >
            <span>
                {
                    !presed?
                        <img style={{width:'100%'}} src={handOpen}/>
                        :
                        <img style={{width:'100%'}} src={handClose}/>
                }
            </span>
        </div>
    )
}   

export default CustomCursor;