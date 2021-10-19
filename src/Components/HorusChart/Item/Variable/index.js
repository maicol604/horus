import React from 'react';
import { makeStyles } from '@mui/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme)=>({
    variablesCircle: {
        width: '1.5em',
        height: '.5em',
        borderRadius: '5px',
        flex: '0 0 auto',
        marginBottom: '.25em',
        border: '1px solid #fff'
    },
    popup: {
        position: 'absolute',
        bottom: '1.5em',
        left: '0',
        width: '10em'
    }
}));

const defaultVariable = {
    name: 'testing name',
    //variables: [{name:'test 1', color: 'blue'}, {name: 'test 2', color: 'red'}]
}

const Variable = ({color, data = defaultVariable, style, position='top'}) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = (value) => {
        setOpen(value);
    }

    return (
        <div style={{...style, position:'relative'}}>
            <div className={classes.popup} style={{display: open?'flex':'none'/*, bottom: position==='top'?'-2em':'0'*/}}>
                <Card style={{width: '100%'}}>
                    <CardContent>
                        <Grid container alignItems='center' spacing={3}>
                            <Grid item xs={12} fullWidth>
                                {data.name}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <div 
                className={classes.variablesCircle} 
                style={{backgroundColor:color}}
                onMouseEnter={()=>handleOpen(true)}
                onMouseLeave={()=>handleOpen(false)}
            />
        </div>
    )
}

export default Variable;