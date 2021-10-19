import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme)=>({
    endNodePoint: {
        position: 'absolute',
        width: '.75em',
        height: '.75em',
        border: '2px solid #E6EBF1',
        backgroundColor: '#aaa',
        borderRadius: '50%',
        left: '-.75em',
        top: 'calc(50% - .25em)',
        zIndex: '1',
        "&:hover": {
            backgroundColor: '#C72C1C',
            borderColor: '#C72C1C'
        }
    },
    nodeContainer: {
        position: 'absolute',
        top: 'calc(50% - .15em)',
        left: '.25em',
    }
}));

const DeleteNode = ({ onMouseEnter, onMouseLeave, related, relations, onEnterItem, onLeaveItem, onDelete, color='#fff' }) => {

    const classes = useStyles({color: color});

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = (data) => {
        if(onDelete)
            onDelete(data)
        handleClose();
    }

    ////console.log('relations',relations)
    return (
        <div className={classes.nodeContainer}>
            <Tooltip title="Delete" placement="top">
                <div 
                    className={classes.endNodePoint} 
                    style={{display:related?'block':'none'}} 
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={handleClick}
                />
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    relations.map((data, index)=>{
                        ////console.log(data)
                        return (
                            <MenuItem 
                                key={index} 
                                onClick={()=>handleDelete(data)}
                            >
                                <spam
                                    onMouseEnter={()=>{
                                        onEnterItem(data)
                                    }}
                                    onMouseLeave={()=>{
                                        onLeaveItem(data)
                                    }}
                                >
                                    {data.from.name}
                                </spam>
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        </div>
    )
}

export default DeleteNode;