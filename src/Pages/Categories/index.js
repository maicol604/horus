import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import NewData from '../NewData';
import Category from './Category';
import DataInput from '../DataInput';

const Categories = () => {

    const [categories, setCategories] = React.useState([]);
    const [waiting, setWaiting] = React.useState(false);
    const [state, setState] = React.useState({
        dataInput:false
    });

    return (
        state.dataInput?
        (
        <DataInput
            categories={categories}
        />
        )
        :
        (
        <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={3}>
                <div style={{display: 'flex', flexDirection: 'column', position:'relative', height:'calc(100vh - 4em)', borderRight:'1px solid rgba(0, 0, 0, 0.12)', justifyContent: 'space-between'}}>
                    <div style={{position: 'relative', maxHeight:'calc(100vh - 8em)', overflow:'auto', boxSizing:'border-box', padding:'1.5em'}}>
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
                    </div>
                    <div style={{padding:'1em', boxSizing:'border-box', borderTop:'1px solid rgba(0, 0, 0, 0.12)'}}>
                        <Stack spacing={2}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={()=>{
                                    setState({...state, dataInput:true})
                                }}
                                disabled={categories.length===0}
                            >
                                Continuar
                            </Button>
                        </Stack>
                    </div>
                </div>
            </Grid>
            <Grid item xs={9} style={{padding:'1.5em', overflow:'auto', maxHeight: 'calc(100vh - 6em)'}}>
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
                                Terminar carga de datos
                            </Button>
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
    )
}

export default Categories;