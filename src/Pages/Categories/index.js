import React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import NewData from '../NewData';

const Categories = () => {

    const [categories, setCategories] = React.useState([]);
    const [waiting, setWaiting] = React.useState(false);

    return (
        <React.fragment>
            {waiting?
                <React.fragment>
                    {
                    categories.map((state, index)=>{
                        return (
                        <div key={index} style={{marginBottom:'1em'}}>
                            <Grid container alignItems='center' spacing={3}>
                                <Grid item xs={12}>
                                    <Paper 
                                        variant="outlined"
                                        style={{padding:'1em'}}
                                    >
                                        <div>
                                            
                                        <Grid container alignItems='center' spacing={3} alignItems="stretch">
                                            <Grid item xs={12}>
                                                <Typography 
                                                    variant='subtitle1'
                                                    align='left'
                                                    style={{textTransform:'capitalize'}}
                                                >
                                                    {state.category.name}
                                                </Typography>
                                                <Typography variant='body2' align='left' display='flex' alignItems='center'>
                                                    {state.category.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} style={{display: 'flex'}}>
                                                <Paper 
                                                    variant="outlined"
                                                    style={{padding:'1em', width: '100%'}}
                                                >
                                                    <Typography 
                                                        variant='subtitle2'
                                                        align='left'
                                                        style={{textTransform:'capitalize'}}
                                                    >
                                                        Marcas
                                                    </Typography>
                                                    <Divider light style={{marginBottom: '.5em'}}/>
                                                    <div>
                                                        {
                                                            state.groupers.map((data, index)=>{
                                                                return (
                                                                    <Typography key={index} variant='body2' align='left' display='flex' alignItems='center'>
                                                                        <div style={{width:'1em', height:'1em', backgroundColor:data.color, marginRight:'.5em', borderRadius: '50%'}}/>{data.name}
                                                                    </Typography>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6} style={{display: 'flex'}}>
                                                <Paper 
                                                    variant="outlined"
                                                    style={{padding:'1em', width: '100%'}}
                                                >
                                                    <Typography 
                                                        variant='subtitle2'
                                                        align='left'
                                                        style={{textTransform:'capitalize'}}
                                                    >
                                                        SKUs
                                                    </Typography>
                                                    <Divider light style={{marginBottom: '.5em'}}/>
                                                    <div>
                                                        {
                                                            state.skus.map((data, index)=>{
                                                                return (
                                                                    <Typography key={index} variant='body2' align='left'>
                                                                        {data.name}
                                                                    </Typography>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                        );
                    })
                    }
                    <div
                        style={{
                            marginTop: '1em'
                        }}
                    >
                        <Stack spacing={2} direction="row">
                            <Button
                                variant='contained'
                                onClick={()=>{
                                    setWaiting(false);
                                }}
                            >
                                Agregar otra categoria
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={()=>{
                
                                }}
                            >
                                Finalizar
                            </Button>
                        </Stack>
                    </div>
                </React.fragment>
            :
                <NewData
                    onUpdate={(data)=>{
                        setCategories([...categories, data])
                    }}
                    onFinish={()=>{
                        setWaiting(true);
                    }}
                />
            }
        </React.fragment>
    )
}

export default Categories;