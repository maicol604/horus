import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import CheckboxGroup from '../../../Components/CheckboxGroup';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import Modal from '@mui/material/Modal';
import SpreadSheetVariables from '../../../Components/SpreadSheetVariables';

const useStyles = makeStyles((theme)=>({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        padding:'1em',
        p: 4,
        maxHeight:'80vh',
        overflow: 'auto',
    },
    variablesItem: {
        padding: '1em',
        borderRadius: '.25em',
        marginBottom: '1em',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
}));

const defaultValue = {
    name:'',
    level:null,
    periodicity:null,
    periodicityName:null, 
    businessRule: null
}

const Variables = ({category=null, subcategories=[], skus=[], brands=[], onChange=()=>{}}) => {
    const classes = useStyles();

    const [openModal, setOpenModal] = React.useState(false);

    const [state, setState] = React.useState({
        ...defaultValue
    });
    const [variables, setVariables] = React.useState([]);

    const getLevels = (level) => {
        //console.log(level)
        switch(level){
            case 'enviroment':
                return (
                    <>
                        {`Afecta al entorno`}
                    </>
                )
            case 'category':
                return (
                    <>
                        {`Afecta a la categoria ${category.name}`}
                    </>
                )
            case 'subcategory':
                return (
                    <>
                        <CheckboxGroup
                            key={1}
                            items={subcategories}
                        />
                    </>
                )
            case 'brand':
                return (
                    <>
                        <CheckboxGroup
                            key={2}
                            items={brands}
                        />
                    </>
                )
            case 'sku':
                return (
                    <>
                        <CheckboxGroup
                            key={3}
                            items={skus}
                        />
                    </>
                )
            default:
                return (
                    <>
                    </>
                )
        }
    }

    return (
        <div
            style={{
                padding: '1.5em',
            }}
        >
            <Grid container alignItems='flex-start' spacing={3} style={{marginBottom:'1.5em'}}>
                <Grid item xs={12}>
                    {
                        variables.map((item, index)=>{
                            return (
                                <div key={index} className={classes.variablesItem}>
                                    <div>
                                        {item.name}
                                    </div>
                                    <div>
                                        {item.level}
                                    </div>
                                    <div>
                                        {item.periodicityName}
                                    </div>
                                    <div>
                                        {`Primera medición: ${item.periodicity.getDay()}/${item.periodicity.getMonth()+1}/${item.periodicity.getFullYear()}`}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Periodicidad</InputLabel>
                        <Select
                            label="Periodicidad"
                            value={state.periodicityName}
                            onChange={(event)=>{
                                //console.log(event)
                                setState({...state, periodicityName:event.target.value})
                            }}
                        >
                            <MenuItem value={'daily'}>Diaria</MenuItem>
                            <MenuItem value={'weekly'}>Semanal</MenuItem>
                            <MenuItem value={'monthly'}>Mensual</MenuItem>
                            <MenuItem value={'quarterly'}>Trimestral</MenuItem>
                            <MenuItem value={'biannual'}>Semestral</MenuItem>
                            <MenuItem value={'annual'}>Anual</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    {state.periodicityName?
                    <CustomDatePicker
                        periodicity={state.periodicityName}
                        onChange={(e)=>{
                            setState({...state, periodicity:e})
                        }}
                    />
                    :
                    <></>
                    }
                    {/*<LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha de la primera medicion"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>*/}
                </Grid>
            </Grid>
            <Grid container alignItems='flex-start' spacing={3}>
                <Grid item xs={6}>
                    <Grid container alignItems='flex-start' spacing={3}>
                        <Grid item xs={12}>
                            <TextField 
                                id="" 
                                label="Nombre" 
                                variant="outlined" 
                                fullWidth
                                name='name'
                                onChange={(e)=>{
                                    setState({...state, name:e.target.value})
                                }}
                                value={state.name}
                                /*required*/
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Nivel al que afecta</InputLabel>
                                <Select
                                    label="Nivel al que afecta"
                                    value={state.level}
                                    onChange={(event)=>{
                                        //console.log(event.target.value)
                                        setState({...state, level:event.target.value})
                                    }}
                                >
                                    <MenuItem value={'enviroment'}>Entorno</MenuItem>
                                    <MenuItem value={'category'}>Categoria</MenuItem>
                                    <MenuItem value={'subcategory'}>Subcategoria</MenuItem>
                                    <MenuItem value={'brand'}>Marca</MenuItem>
                                    <MenuItem value={'sku'}>Sku</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Regla de negocio</InputLabel>
                                <Select
                                    label="Regla de negocio"
                                    value={state.businessRule}
                                    onChange={(event)=>{
                                        setState({...state, businessRule :event.target.value})
                                    }}
                                >
                                    <MenuItem value={'Promedio'}>Promedio</MenuItem>
                                    <MenuItem value={'Repetir número'}>Repetir número</MenuItem>
                                    <MenuItem value={'Prorratear'}>Prorratear</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Paper 
                        variant="outlined"
                        style={{padding:'1em'}}
                    >
                        <Typography 
                            variant='subtitle1'
                            align='left'
                            style={{textTransform:'capitalize'}}
                        >
                            Crea una variable
                        </Typography>
                        <Typography 
                            variant='subtitle2'
                            align='left'
                            style={{textTransform:'capitalize'}}
                        >
                            Selecciona a quienes afecta
                        </Typography>
                        <Divider light style={{marginBottom: '.5em'}}/>
                        <div style={{marginBottom:'1em'}}>
                            {
                                getLevels(state.level) 
                            }
                        </div>
                        <Stack spacing={2}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={()=>{
                                    setOpenModal(!openModal)
                                }}
                            >
                                Agregar serie de datos
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={()=>{
                                    let aux = variables.slice();
                                    aux.push(state);
                                    setState(defaultValue);
                                    setVariables(aux);
                                    onChange(aux);
                                }}
                            >
                                Guardar variable
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
            {
                // console.log(openModal)
            }
            {
            <Modal
                open={openModal}
                onClose={()=>{setOpenModal(!openModal)}}
            >
                <Paper 
                    className={classes.modal}
                    variant="outlined"
                >
                    <SpreadSheetVariables
                        initDate = {state.periodicity}
                        periodicity={state.periodicityName}
                    />
                </Paper>
            </Modal>
            }
        </div>
    )
}

export default Variables;