import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

import Variable from './Variable';

const useStyles = makeStyles((theme)=>({
    container: {
        width: '15em',
        //height: '5em',
        position: 'relative',
        marginBottom: '2em',
        backgroundColor: '#fff',
        borderRadius: '2px',
        padding: '.25em 1.5em',
        overflow: 'hidden',
        zIndex: 1,
        display:'flex', 
        alignItems:'center'
        //border: '1px solid #E6EBF1'
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
    },
    borderColor: {
        backgroundColor: props => props.color,
        height: '110%',
        width: '.5em',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    description: {
        opacity: '.5',
        padding: '.5em',
        paddingLeft: 0,
        paddingTop: '.25em',
        fontSize: '.75em'
    }
}));

const Item = ({id, style, title='', variant='', groupers=[], vars=[], data=null}) => {

    const classes = useStyles({color:data.grouper?data.grouper.color:''});

    const getVariantContent = () => {
        switch(variant){
            case 'sku':
                return (
                    <>
                        <div style={{postition: 'relative', width: '100%'}}>
                            <div className={classes.borderColor}/>
                            <div style={{display: 'flex'}}>
                                <div style={{textTransform: 'capitalize'}}>
                                    {data.grouper.name}
                                </div> / 
                                <div style={{textTransform: 'capitalize'}}>
                                    {data.grouper.maker}
                                </div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <span style={{textTransform: 'capitalize'}}>
                                    {data.grouper.presentation}
                                </span> 
                                <span style={{fontWeight: '600'}}>
                                    {data.content} {data.unit} / {data.presentation}
                                </span>
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
                        <div className={classes.description}>
                            {data.description}
                        </div>  
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
                        <div className={classes.description}>
                            {data.description}
                        </div>  
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
            {variant==='sku'?                    
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
            :
            <></>}
            <Grid container alignItems='center' spacing={3}>
                <Grid item xs={12}>
                    <span style={{textTransform:'uppercase'}}>
                        {title}
                    </span>
                </Grid>
                <Grid item xs={12} style={{paddingTop:'0'}}>
                    {getVariantContent()}
                </Grid>
            </Grid>
        </div>
    )
}

export default Item;