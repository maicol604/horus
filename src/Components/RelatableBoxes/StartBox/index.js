import React from 'react';

import { makeStyles } from '@mui/styles';
import Draggable from '../Draggable';

const maingreen = '#2B9982';

const useStyles = makeStyles((theme)=>({
    startNode: {
        border: '1px solid '+maingreen,
        borderRadius: '.5em',
        padding: '.5em 1.5em',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all .5s',
        backgroundColor: '#fff',
        zIndex: '1'
    },
    startNodeContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '.5em',
        transition: 'all .5s'
    }
}));

function useOutsideAlerter(ref, callback) {
    React.useEffect(() => {
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

const StartBox = ({id, data, onStop}) => {

    const wrapperRef = React.useRef(null);
    const classes = useStyles();
    const [focus, setFocus] = React.useState(false);

    const hanldeFocus = () => {
        setFocus(true);
    }

    const handleFocusOut = () => {
        setFocus(false);
    }

    useOutsideAlerter(wrapperRef, handleFocusOut);

    return (
        <div className={classes.startNodeContainer} ref={wrapperRef} id={'startBox-'+id} >
            <div 
                className={classes.startNode} 
                id={'start-'+id} 
                onClick={hanldeFocus}
                style={{borderWidth: focus?'2px':'1px'}}
            >
                {data.name}
            </div>
            <Draggable data={data} onStop={onStop}/>
        </div>
    )
}

export default StartBox;