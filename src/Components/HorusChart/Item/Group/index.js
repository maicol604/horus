import React from 'react';
import { makeStyles } from '@mui/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme)=>({
    grouperCircle: {
        width: '1.5em',
        height: '1.5em',
        borderRadius: '50%',
        flex: '0 0 auto',
        marginLeft: '.5em',
    },
    popup: {
        position: 'absolute',
        bottom: '2em',
        left: '0',
        width: '10em',
        flex: '0 0 auto',
    },
    ul: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    li: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        marginBottom: '.25em'
    },
    variableCircle: {
        width: '1.5em',
        height: '.5em',
        borderRadius: '5px',
        flex: '0 0 auto',
        marginBottom: '.25em',
        border: '1px solid #fff'
    },
}));

const defaultGrouper = {
    name: 'Testing name',
    variables: [{name:'test 1', color: 'blue'}, {name: 'test 2', color: 'red'},{name:'test 1', color: 'blue'}, {name: 'test 2', color: 'red'}]
}

const Group = ({color, grouper=defaultGrouper}) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = (value) => {
        setOpen(value);
    }

    return (
        <div style={{position:'relative'}}>
            <div className={classes.popup} style={{display: open?'flex':'none'}}>
                <Card style={{width: '100%'}}>
                    <CardContent>
                        <Grid container alignItems='center' spacing={3}>
                            <Grid item xs={12} fullWidth style={{paddingBottom: 0}}>
                                <Typography variant="subtitle1">
                                    {grouper.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} fullWidth>
                                <ul className={classes.ul}>
                                {grouper.variables.map((data, index)=>{
                                    return (
                                        <li key={index} className={classes.li}>
                                            <div className={classes.variableCircle} style={{backgroundColor:data.color}}/>
                                            <div style={{marginLeft: '.5em'}}>
                                                {data.name}
                                            </div>
                                        </li>
                                    )
                                })}
                                </ul>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <div 
                className={classes.grouperCircle} 
                style={{backgroundColor:color}} 
                //onClick={handleClick} 
                onMouseEnter={()=>handleOpen(true)}
                onMouseLeave={()=>handleOpen(false)}
            /> 
        </div>
    )
}

export default Group;