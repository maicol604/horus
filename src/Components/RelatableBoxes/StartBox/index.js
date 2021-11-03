import React from 'react';

import { makeStyles } from '@mui/styles';
import Draggable from '../Draggable';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme)=>({
    startNode: {
        border: '1px solid #E6EBF1',
        borderRadius: '2px',
        padding: '.25em 1.5em',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all .5s',
        backgroundColor: '#fff',
        zIndex: '1',
        position: 'relative',
        overflow: 'hidden',
        color: '#727272',
        display:'flex', 
        alignItems:'center'
        //backgroundColor: '#fff'
    },
    startNodeContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '.5em',
        transition: 'all .5s'
    },
    borderColor: {
        height: '100%',
        width: '.5em',
        backgroundColor: props => props.color, 
        position: 'absolute',
        right: '0',
        top: '0'
    },    
    title: {
        textTransform: 'uppercase',
        display: 'flex',
        marginBottom: '.25em',
        fontWeight: '600'
    },
    detail: {
        fontSize: '.75em',
        display: 'flex',
        opacity: '.75'
    },
    startPoint: {
        position: 'absolute',
        right: '0',
        top: '25%'
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
    const classes = useStyles({color: data.grouper.color});
    const [focus, setFocus] = React.useState(false);

    const hanldeFocus = () => {
        setFocus(true);
    }

    const handleFocusOut = () => {
        setFocus(false);
    }

    useOutsideAlerter(wrapperRef, handleFocusOut);
//console.log(data)
    return (
        <div className={classes.startNodeContainer} ref={wrapperRef}>
            <div 
                className={classes.startNode} 
                 
                onClick={hanldeFocus}
                style={{borderWidth: focus?'2px':'1px'}}
            >
                <div id={'startBox-'+id} className={classes.startPoint}/>
                <div id={'start-'+id} className={classes.startPoint}/>
                <div className={classes.borderColor}/>
                               
                <span style={{marginRight:'1em'}}>
                    {
                    data.img?
                            <Avatar
                                alt=""
                                src={data.img}
                                sx={{ width: 50, height: 50 }}
                            />
                    :
                        <Avatar
                            sx={{ width: 50, height: 50, bgcolor: data.grouper.color }}
                        >
                            {data.name.toUpperCase().charAt(0)}
                        </Avatar>
                    }
                </span>

                <div className={classes.dataContainer}>
                    <div className={classes.title}>
                        {data.name}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {/*<div className={classes.grouperCircle}/> */}
                        <span style={{textTransform: 'uppercase'}}>
                            {data.grouper.name} / {data.grouper.maker}
                        </span>
                    </div>
                    <div>
                        {data.grouper.description}
                    </div>
                    <div className={classes.detail}>
                        <span style={{textTransform: 'capitalize'}}>{data.grouper.presentation}</span> / <span style={{fontWeight: '600'}}>{data.content} {data.unit}</span>
                    </div>
                </div>
            </div>
            <Draggable 
                data={data} 
                onStop={onStop}
                color={data.grouper.color}
            />
        </div>
    )
}

export default StartBox;