import React, { useRef } from 'react';

import { Button, Grid, TextField, Typography } from '@mui/material';

import UploadImage from '../../../Components/UploadImage';
import ColorPicker from '../../../Components/ColorPicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CustomDatePicker from '../../../Components/CustomDatePicker';

import { allYears } from './constants'

function NewClients({ onNextPage }) {
    const name = useRef();
    const terms = useRef();
    const number_of_stores = useRef();
    const days = useRef();
    const som = useRef();

    const [image, setImage] = React.useState({});
    const [color, setColor] = React.useState('#ffffff');
    const [date, setDate] = React.useState();
    const [year, setYear] = React.useState();
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name.current.value,
            image: image,
            color: color,
            terms: terms.current.value,
            number_of_stores: number_of_stores.current.value,
            som: som.current.value,
            days: days.current.value,
            year: year,
            date: date
        }


        if (data.name === '' || data.image === null || data.terms === '') {
            alert('Todos los campos son obligatorios')
        } else {
            console.log(data);
        }
    }

    const nextPage = () => {
        onNextPage()
    }


    return (
        <div style={{
            width: '1184px',
            margin: 'auto',
            justifyContent: 'center',
            display: 'flex',
            flex: 1,
            alignContent: 'center',
            alignItems: 'center'
        }}>

            <Grid
                container
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                xs={12}
                md={12} >

                <Grid item xs={12}>
                    <Typography variant='h2'>Carga de Clientes</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Nombre Retailers"
                        required
                        fullWidth
                        inputRef={name}
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField
                        label="Condiciones comerciales"
                        required
                        fullWidth
                        inputRef={terms}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <ColorPicker
                        fullWidth
                        onChangeComplete={(e) => {
                            setColor(e.target.value)
                        }}
                        name='color'
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField
                        label="Cantidad de tiendas"
                        fullWidth
                        inputRef={number_of_stores}
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField
                        label="SOM RETAILERS"
                        fullWidth
                        inputRef={som}
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                    <UploadImage
                        title={'Subir imagen'}
                        variant="outlined"
                        name='img'
                        onChange={(e) => {
                            setImage(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField
                        label="Dias Inventario (OBJ)"
                        fullWidth
                        inputRef={days}
                    />
                </Grid>

                <Grid item xs={6} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Tipo de año</InputLabel>
                        <Select
                            label="Tipo de año"
                            onChange={(event) => {
                                setYear(event.target.value)
                            }}

                        >
                            <MenuItem value={'Calendar year'}>Año Calendario</MenuItem>
                            <MenuItem value={'Natural year'}>Año Natural</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Grid item xs={6}>
                        {year === 'Calendar year' ? (
                            <CustomDatePicker
                                label="Fecha de inicio"
                                onChange={(e) => {
                                    console.log(e);
                                    setDate({ ...date, periodicity: e })
                                }}
                            />
                        ) : (
                            <FormControl fullWidth>
                                <InputLabel>Año de inicio</InputLabel>
                                <Select
                                    label="Año de inicio"
                                    onChange={(event) => {
                                        setDate(event.target.value)
                                    }}>
                                    {allYears.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                    <div style={{ display: 'flex', flex: '1', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            variant='contained'
                            onClick={onSubmit}> Guardar</Button>
                        <Button
                            variant='contained'
                            onClick={nextPage} >Siguiente</Button>
                    </div>
                </Grid>
            </Grid>
        </div>

    );
}

export default NewClients;



