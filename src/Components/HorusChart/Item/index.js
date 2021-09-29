import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import Group from './Group';
import Variable from './Variable';

const useStyles = makeStyles((theme)=>({
    container: {
        width: '15em',
        height: '5em',
        position: 'relative',
        marginBottom: '2em'
    },
    groupersContainer: {
        display: 'flex',
        position: 'absolute'
    },
    variablesContainer: {
        position: 'absolute',
        top: '0',
        right: '-2em'
    },
    variablesContainerBottom: {
        position: 'absolute',
        display: 'flex',
        bottom: '-.25em',
    }
}));

const Item = ({id, style, title='', variant='', groupers=[], vars=[]}) => {

    const classes = useStyles();

    const getVariantContent = () => {
        switch(variant){
            case 'sku':
                return (
                    <>
                        <div style={{postition: 'relative', height: '1.5em', width: '100%'}}>
                            <div className={classes.groupersContainer}>
                                {
                                    groupers.map((data,index)=>
                                        <Group key={index} color={data.color}/>
                                    )
                                }
                            </div>
                        </div>
                        <div className={classes.variablesContainer}>
                            {
                                vars.map((data,index)=>
                                    <Variable key={index} color={data.color}/>
                                )
                            }
                        </div>
                    </>
                )
            case 'subcategory':
                return (
                    <>
                        <div className={classes.variablesContainerBottom}>
                            {
                                vars.map((data,index)=>
                                    <Variable key={index} color={data.color} style={{marginRight: '.25em'}}/>
                                )
                            }
                        </div>
                    </>
                )
            case 'category':
                return (
                    <>
                        <div className={classes.variablesContainerBottom}>
                            {
                                vars.map((data,index)=>
                                    <Variable key={index} color={data.color} style={{marginRight: '.25em'}}/>
                                )
                            }
                        </div>
                    </>
                )
            default:
                return (<React.Fragment/>);     
        }
    }

    return ( 
        <div id={id} className={classes.container} style={{...style}}>
            <Card className={classes.root}>
                <CardContent>
                        <Grid container alignItems='center' spacing={3}>
                            <Grid item xs={12}>
                                {title}
                            </Grid>
                            <Grid item xs={12} style={{padding:0, paddingLeft:'.25em'}}>
                                {getVariantContent()}
                            </Grid>
                        </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Item;