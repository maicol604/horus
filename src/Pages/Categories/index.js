import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import NewData from '../NewData';
import Category from './Category';

const Categories = () => {

    const [categories, setCategories] = React.useState([]);
    const [waiting, setWaiting] = React.useState(false);

    return (
        <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={3}>
                <div style={{backgroundColor:'', height:'100vh', overflow:'auto', padding:'1.5em', boxSizing:'border-box', borderRight:'1px solid rgba(0, 0, 0, 0.12)'}}>
                    {
                        categories.map((state, index)=>{
                            return (
                            <div key={index} style={{marginBottom:'1em'}}>
                                <Category
                                    data={state}
                                />
                            </div>
                            );
                        })
                    }
                    <Stack spacing={2}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={()=>{
            
                            }}
                            disabled={categories.length===0}
                        >
                            Finalizar
                        </Button>
                    </Stack>
                </div>
            </Grid>
            <Grid item xs={9} style={{padding:'1.5em'}}>
                {waiting?
                    <div
                        style={{
                            marginTop: '1em',
                            height: '80vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Stack spacing={2}>
                            <Button
                                variant='contained'
                                onClick={()=>{
                                    setWaiting(false);
                                }}
                            >
                                Agregar otra categoria
                            </Button>
                            {
                            // <Button
                            //     variant='contained'
                            //     color='primary'
                            //     onClick={()=>{
                
                            //     }}
                            // >
                            //     Finalizar
                            // </Button>
                            }
                        </Stack>
                    </div>
                    :
                    <div style={{padding:'1.5em'}}>
                        <NewData
                            onUpdate={(data)=>{
                                setCategories([...categories, data])
                            }}
                            onFinish={()=>{
                                setWaiting(true);
                            }}
                        />
                    </div>
                }
            </Grid>
        </Grid>
    )
}

export default Categories;