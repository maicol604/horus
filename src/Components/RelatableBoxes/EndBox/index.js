import React from 'react';

import { makeStyles } from '@mui/styles';

import DeleteNode from './DeleteNode';

const useStyles = makeStyles((theme)=>({
    endNode: {
        border: '1px solid #2B9982',
        borderRadius: '.5em',
        padding: '.5em 1.5em',
        marginBottom: '.5em',
        "&:hover": {
            borderWidth: '2px'
        },
    },
    magnet: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '2.5em',
        right: '0',
        top: '0',
        zIndex: '1',
    },
    endNodePoint: {
        position: 'absolute',
        width: '.5em',
        height: '.5em',
        border: '2px solid #2B9982',
        backgroundColor: '#2B9982',
        borderRadius: '50%',
        left: '-.75em',
        top: 'calc(50% - .25em)',
        zIndex: '1',
        "&:hover": {
            backgroundColor: '#C72C1C',
            borderColor: '#C72C1C'
        }
    }
}));

const EndBox = ({data, id, onEnter, onExit, related=false, onEnterDelete, onExitDelete, relations=[], onEnterItem, onLeaveItem, onDelete}) => {

    const classes = useStyles();
    const [hover, setHover] = React.useState(false);

    const handleEnter = () => {
        setHover(true);
        if(onEnter)
            onEnter(data);
    }

    const handleExit = () => {
        setHover(false);
        if(onExit)
            onExit(data);
    }

    const handleEnterDelete = () => {
        if(onEnterDelete)
            onEnterDelete(data);
    }

    const handleExitDelete = () => {
        if(onExitDelete)
            onExitDelete(data);
    }

    return (
        <div id={'endBox-'+id}>
            <DeleteNode 
                related={related}
                onMouseEnter={handleEnterDelete}
                onMouseLeave={handleExitDelete}
                relations={relations}
                onEnterItem={onEnterItem}
                onLeaveItem={onLeaveItem}
                onDelete={(data)=>onDelete(data)}
            />
            <div 
                className={classes.magnet} 
                onMouseEnter={handleEnter}
                onMouseLeave={handleExit}
            />
            <div 
                className={classes.endNode}
                style={{backgroundColor: hover?'rgba(0,0,0,.1)':'transparent', borderWidth: hover?'2px':'1px'}}
            >
                {data.name}
            </div>
        </div>
    )
}

export default EndBox;