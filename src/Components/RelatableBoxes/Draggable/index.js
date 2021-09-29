import React from 'react';
import Draggable from 'react-draggable';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme)=>({
    dragabbleNode: {
        width: '.5em',
        height: '.5em',
        cursor: 'move',
        backgroundColor: '#fff',
        borderRadius: '50%',
        border: '2px solid #2B9982',//verde principal
        TransitionEvent: 'all 1.5s ease',
        zIndex: '1',
        "&:hover": {
            boxShadow: '0px 0px 10px 0px rgba(43,153,130,1)',
            backgroundColor: '#2B9982',
        }
    },
}));

const Draggable2 = ({data, position=null, fixed=false, onStop}) => {

    const classes = useStyles();
    const nodeRef = React.useRef(null);
    const [conf, setConf] = React.useState({
        position:{
            x:0,
            y:0,
        }, 
        fixed: false
    })

    React.useEffect(()=>{
        if(position)
            setConf({
                ...conf, 
                position: {
                    x: position.x,
                    y: position.y
                },
                fixed: true
            })
    },[position])

    const eventLogger = (e) => {
        //console.log('Data: ', e);
    };

    const getTranslateValues = (translate) => {
        let result = translate.split('translate(')[1].split(')')[0].split(', ');
        try {
            return {x: parseInt(result[0].split('px')[0]), y :parseInt(result[1].split('px')[0])};
        } catch (error) {
            console.error(result)
            console.error(error)
            return {x:0, y:0}
        }
    }

    const handleDrag = (e) => {
        //console.log(getTranslateValues(nodeRef.current.style.transform));
        setConf({
            ...conf, 
            position: {
                ...getTranslateValues(nodeRef.current.style.transform)
            }
        })
    }

    const handleStart = (e) => {
        /*console.log( e)
        setConf({
            ...conf, 
            position: {
                x: 0,
                y: 10
            }
        })*/
    }
    
    const handleEnd = (e) => {
        /*console.log( e)*/
        if(onStop){
            onStop(data)
        }
        if(!fixed)
            setConf({
                ...conf, 
                position: {
                    x: 0,
                    y: 0
                }
            })
    }

    return (
        <Draggable
            //axis="x"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={conf.position}
            //grid={[25, 25]}
            scale={1}
            onStart={eventLogger}
            onDrag={handleDrag}
            onStop={handleEnd}
        >
            <div className={classes.dragabbleNode} id={'end-'+data.id} ref={nodeRef}>
                <div className="handle">
                    <span style={{visibility: 'hidden', width: 0, height: 0}}>.</span>
                </div>
            </div>
        </Draggable>
    );
  
}

export default Draggable2;