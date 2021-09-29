import React from 'react';
import { useScreenshot } from "use-react-screenshot";
import { makeStyles } from '@mui/styles';

import Fab from '@mui/material/Fab';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';

import Alert from '../Alert';

/*import copy from './copy.svg';
import save from './save.svg';*/

const useStyles = makeStyles((theme)=>({
    circularButon: {
        margin: '.5em',
        marginRight: '0',
        padding: '1em',
        width: '1em',
        height: '1em',
        borderRadius: '50%',
        //border: '1px solid #000',
        transition: 'all .25s',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#ecf0f1',
            borderColor: '#95a5a6'
        }
    },
    alert: {
        position:'fixed',
        bottom: '1em',
        right: '1em',
    },
    container: {
        overflow: 'hidden',
        position: 'relative'
    },
    capture: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.5)',
        left: 0,
        top: 0, 
        width: '100%',
        height: '100%',
        zIndex: '100'
    }
}));

const ScreenShot = ({children, onCapture}) => {
    const classes = useStyles();

    const ref = React.createRef(null);const ref2 = React.createRef(null);
    const [image, takeScreenShot] = useScreenshot();
    const [alert, setAlert] = React.useState(false);
    const [shutter, setShutter] = React.useState(false);
    const getImage = () => {
        //console.log(ref2.current.getContext('2d'))
        takeScreenShot(ref.current);
        setAlert(true);
        //setShutter(true);
        if(onCapture)
            onCapture();
        setTimeout(()=>{
            setAlert(false);
        },3000)
        setTimeout(()=>{
            setShutter(false);
        }, 100)
    };
    return (
        <>
            <div ref={ref} className={classes.container}>
                <div className={classes.capture} style={{display: shutter?'block':'none'}}></div>
                {/*<canvas ref={ref2} style={{width: '100%', height: '100vh', background: 'red', position: 'absolute'}}></canvas>*/}
                {children}
            </div>
            <div style={{display: 'flex'}}>
                {/*<img src={image} alt='' style={{width: '100%'}}/>
                <div className={classes.circularButon}>
                    <img src={copy} style={{width:'100%'}} alt='copy' />
                </div>
                <div onClick={()=>{}} className={classes.circularButon}>
                    <img src={save} style={{width:'100%'}} alt='save' />
                </div>
                */}
                <Fab size="small" onClick={getImage} color="primary" aria-label="clean">
                    <ContentCopyIcon />
                </Fab>
                <Fab size="small" color="primary" aria-label="clean">
                    <SaveIcon />
                </Fab>
                <div className={classes.alert}>
                    <Alert
                        type={'success'}
                        open={alert}
                        text='Copiado'
                    />
                </div>
            </div>
        </>
    )
}

export default ScreenShot;