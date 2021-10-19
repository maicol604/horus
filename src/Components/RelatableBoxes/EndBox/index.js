import React from 'react';

import { makeStyles } from '@mui/styles';

import DeleteNode from './DeleteNode';

const useStyles = makeStyles((theme)=>({
    endNode: {
        border: '1px solid #E6EBF1',
        borderRadius: '2px',
        padding: '.25em 1.5em',
        marginBottom: '.5em',
        position: 'relative',
        overflow: 'hidden',
        color: '#727272',
        //backgroundColor: '#F0F0F0',
        "&:hover": {
            borderWidth: '2px'
        },
    },
    magnet: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '10em',
        right: '0',
        top: '0',
        zIndex: '1',
    },
    borderColor: {
        height: '100%',
        width: '.5em',
        backgroundColor: props => props.color, 
        position: 'absolute',
        left: '0',
        top: '0'
    },
    grouperCircle: {
        width: '1em',
        height: '1em',
        backgroundColor: props => props.color,
        borderRadius: '50%',
        marginRight: '.5em',
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
    }
}));

const EndBox = ({data, id, onEnter, onExit, related=false, onEnterDelete, onExitDelete, relations=[], onEnterItem, onLeaveItem, onDelete}) => {

    const classes = useStyles({color: data.grouper.color});
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
                className={classes.container}
                color={data.grouper.color}
            />
            <div 
                className={classes.endNode}
                style={{backgroundColor: hover?'rgba(0,0,0,.05)':'#fff', borderWidth: hover?'2px':'1px'}}
            >
                
            <div 
                className={classes.magnet} 
                onMouseEnter={handleEnter}
                onMouseLeave={handleExit}
            />
                <div className={classes.borderColor}/>
                <div className={classes.title}>
                    {data.name}
                </div>
                <div className={classes.dataContainer}>
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
        </div>
    )
}

export default EndBox;