import React, { useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

const useStyles = makeStyles({
    colorSquare: {
        width: '1em',
        height: '1em',
        borderRadius: '2px',
        marginRight: '.5em',
        border: '2px solid #c4c4c4',
    },
    colorContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        width: 'inherit'
    },
    colorPicker: {
        position: 'absolute',
        width: 'max-content',
        zIndex: '10'
    }
});

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                //alert("You clicked outside of me!");
                if(callback)
                    callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const ColorPicker = ({ onChangeComplete, value='#ffffff', name='' }) => {

    const classes = useStyles();
    const [state, setState] = React.useState({background:'#ffffff'});
    const [visible, setVisible] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    useEffect(() => {
        setState({background:value});
    },[value])

    const wrapperRef = useRef(null);

    const handleChangeComplete = (color) => {
        if(onChangeComplete)
            onChangeComplete({target: { name, value: color.hex}});
        setState({ background: color.hex });
    };

    const handleVisible = (e) => {
        setVisible(!visible);
        setAnchorEl(e.currentTarget)
    }
    useOutsideAlerter(wrapperRef, handleVisible);

    return (
        <React.Fragment>
            <div className={classes.colorContainer} onClick={handleVisible}>
                <div className={classes.colorSquare} style={{backgroundColor:state.background}}/>
                <Typography variant="subtitle1">{state.background.split('#')[1]}</Typography>
            </div>
            {/*visible?
                <div className={classes.colorPicker} ref={wrapperRef}>
                    <SketchPicker
                        color={ state.background }
                        onChangeComplete={ handleChangeComplete }
                        onChange={handleChangeComplete}
                        disableAlpha
                    />
                </div>
                :
                <React.Fragment/>*/
            }
            <Menu
                anchorEl={anchorEl}
                open={anchorEl}
                onClose={()=>{
                    setAnchorEl(null);
                }}
            >
                <SketchPicker
                    color={ state.background }
                    onChangeComplete={ handleChangeComplete }
                    onChange={ handleChangeComplete }
                    disableAlpha
                />
            </Menu>
        </React.Fragment>
    );
}

export default ColorPicker;