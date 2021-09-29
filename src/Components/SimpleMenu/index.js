import React from 'react';
import { makeStyles } from '@mui/styles';

import copy from './copy.svg';

const useStyles = makeStyles((theme)=>({
    circularButon: {
        padding: '1em',
        width: '1.5em',
        height: '1.5em',
        borderRadius: '50%',
        border: '2px solid #000',
        transition: 'all .25s',
        backgroundColor: 'transparent',
        "&:hover": {
            backgroundColor: '#ecf0f1',
            borderColor: '#95a5a6'
        }
    }
}));

const ContextMenu = ({open}) => {

    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.circularButon}>
                <img src={copy} alt='copy' style={{width:'100%'}}/>
            </div>
        </div>
    )
}

export default ContextMenu;