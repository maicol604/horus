import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import NewData from '../NewData';
import Category from './Category';

const Categories = () => {

    const [categories, setCategories] = React.useState([]);
    const [waiting, setWaiting] = React.useState(false);

    return (
        <>
            {waiting?
                <>
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
                </>
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
        </>
    )
}

export default Categories;