import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

import ConfirmDialog from '../../../Components/ConfirmDialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RadioGroup from '../../../Components/RadioGroup';
import CheckboxGroup from '../../../Components/CheckboxGroup';
import RadioGropupGroupers from './RadioGropupGroupers';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

const initialValue = {
    name:'',
    content:'',
    unit: null,
    grouper:null,
    subcategory:null,
    presentation:'',
    value:'',
    img:null
}

const useStyles = makeStyles((theme) => ({
    formControl: {
       // margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        //marginTop: theme.spacing(2),
    },
    colorSquare: {
        width: '1em',
        height: '1em',
        borderRadius: '2px',
        marginRight: '.5em',
        border: '2px solid #c4c4c4',
    },
    colorContainer: {
        display: 'flex',
        alignItems: 'center',
        width: 'inherit'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        padding:'1em',
        p: 4,
    }
}));

const Step2 = ({ groupers=[], pushSku, subcategories=[], skus=[], updateSkus, removeSku, onFilter }) => {

    const classes = useStyles();
    const [sku, setSku] = React.useState({
        ...initialValue
    })

    const [filter, setFilter] = React.useState({
        subcategory:null
    })

    const [openEditSku, setOpenEditSku] = React.useState(false);
    const [editSku, setEditSku] = React.useState({});

    React.useEffect(()=>{
        ////console.log('useffect',groupers,skus)
    },[skus])

    const getSkus = (filterData) => {
        let newSkus;
        if(filterData){
            newSkus = skus.filter(item=>(item.subcategory.id===filterData.id));
        }
        else{
            newSkus = skus;
        }
        //console.log(newSkus)
        return (
            newSkus.map((data, index) => 
                <React.Fragment>
                    <Grid item xs={3}>
                        <div style={{display:'flex', alignItems:'center'}}>
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
                            <Typography align='left'>
                                {data.name}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography align='left'>
                            {data.content} {data.unit} / {data.presentation}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {
                            data.grouper?
                                <div className={classes.colorContainer}>
                                    <div className={classes.colorSquare} style={{backgroundColor:data.grouper.color}}/>
                                    <Typography variant="subtitle1" align="left">{data.grouper.name}</Typography>
                                </div>
                            :
                            <></>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <Typography align='left'>
                            {data.subcategory.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <ConfirmDialog
                                message='Esta seguro de eliminar esta categoria?'
                                title='Esta seguro de eliminar esta categoria?'
                                onOk={()=>{handleRemoveSku(index)}}
                            >
                                <DeleteIcon/>
                            </ConfirmDialog>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', cursor:'pointer'}}
                            onClick={()=>{
                                setEditSku({...data, index})
                                setOpenEditSku(!openEditSku);
                            }}
                        >
                            <EditIcon/>
                        </div>
                    </Grid>
                </React.Fragment>
            )
        )
    }

    const handleInputSku = (e) => {
        const {name, value} = e.target;
        ////console.log(value)
        setSku({...sku, [name]:value});
    }

    const handleSaveSku = () => {
        ////console.log(sku)

        let cpy = JSON.stringify(sku);
        if(pushSku){
            let aux = JSON.parse(cpy);
            let newSkus = [];
                //console.log(aux.grouper)
            for(let i=0;i<aux.grouper.length;i++){
                if(aux.grouper[i].checked){
                    newSkus.push({...aux, grouper:aux.grouper[i]});
                }
                //console.log(newSku)
            }
            pushSku(newSkus);
            //pushSku();
        }   
        setSku({...initialValue})

    }

    const handleRemoveSku = (index) => {
        if(removeSku)
            removeSku(index);
    }

    const handleFilter = (e) => {
        if(onFilter){
            onFilter(JSON.parse(e.target.value))
        }
        setFilter({...filter, subcategory:e.target.value})
    }

    return (
        <React.Fragment>
            <Grid container alignItems='center' spacing={3}>
                <Grid item xs={12}/>
                <Grid item xs={12}>
                    <Typography
                        variant='h6'
                        align='left'
                    >
                        Añade o elimina tus SKUS
                    </Typography>
                    {/* {<Typography
                        variant='caption'
                        align='left'
                        display='block'
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography}> */}
                </Grid>
                <Grid item xs={12}/>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" align="left">Nombre</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" align="left">Contenido</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" align="left">Marcas</Typography>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Subcategorias</InputLabel>
                        <Select
                            //value={age}
                            name={'subcategory'}
                            label="Subcategoria"
                            value={filter.subcategory}
                            onChange={handleFilter}
                        >
                            <MenuItem value={null}>Subcategorias</MenuItem>
                            {
                                subcategories.map((data, index)=>
                                    <MenuItem value={JSON.stringify(data)} key={index}>{data.name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    
                </Grid>
                { getSkus(JSON.parse(filter.subcategory)) }
                <Grid item xs={3}>
                    <TextField 
                        id="" 
                        label="Nombre" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        name='name'
                        onChange={handleInputSku}
                        value={sku.name}
                        required
                    />
                </Grid>
                <Grid item xs={2}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <TextField 
                            id="" 
                            label="Contenido" 
                            variant="outlined" 
                            fullWidth
                            multiline
                            name='content'
                            //rows={2}
                            onChange={(e)=>{handleInputSku({target:{name:e.target.name, value:e.target.value.replace(/[^0-9]/g, '')}})}}
                            value={sku.content}
                            required
                        />
                        <div style={{marginTop:'.5em'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Unidad *</InputLabel>
                                <Select
                                    //value={age}
                                    name={'unit'}
                                    label="Unidad *"
                                    value={sku.unit}
                                    onChange={handleInputSku}
                                >
                                    <MenuItem value={'Kg'}>Kg</MenuItem>
                                    <MenuItem value={'Lib'}>Lib</MenuItem>
                                    <MenuItem value={'Gr'}>Gr</MenuItem>
                                    <MenuItem value={'Ml'}>Ml</MenuItem>
                                    <MenuItem value={'Pza'}>Pza</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{marginTop:'.5em'}}>
                            <TextField 
                                id="" 
                                label="Presentación" 
                                variant="outlined" 
                                fullWidth
                                multiline
                                name='presentation'
                                //rows={2}
                                onChange={handleInputSku}
                                value={sku.presentation}
                                required
                            />
                        </div>
                        <div style={{marginTop:'.5em'}}>
                            <TextField 
                                id="" 
                                label="Costo por unidad" 
                                variant="outlined" 
                                fullWidth
                                multiline
                                name='value'
                                //rows={2}
                                onChange={handleInputSku}
                                value={sku.value}
                                required
                            />
                        </div>
                        {/*<div style={{marginTop:'.5em', display:'block'}}>
                            <UploadImage
                                title={'Subir imagen'}
                                variant="outlined"
                                onChange={handleInputSku}
                                name='img'
                                value={sku.img}
                            />
                        </div>*/}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex'}}>
                        {/*<RadioGropupGroupers
                            name = 'grouper'
                            items = {[...groupers]}
                            onChange={handleInputSku}
                            value={sku.grouper}
                        />*/}
                        <CheckboxGroup
                            name = 'grouper'
                            items = {[...groupers]}
                            onChange={handleInputSku}
                            value={sku.grouper}
                        />
                    </div>
                </Grid>
                <Grid item xs={2} align='left'>
                    <RadioGroup
                        name = 'subcategory'
                        items = {[...subcategories]}
                        onChange={handleInputSku}
                        value={sku.subcategory}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        {/*<DeleteIcon/>*/}
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSaveSku}
                            disabled={sku.name==='' || sku.content==='' || sku.grouper===null || sku.subcategory===null || sku.unit===null || sku.presentation===''}
                        >
                            Guardar
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Modal
                open={openEditSku}
                onClose={()=>{setOpenEditSku(!openEditSku)}}
            >
                <Paper 
                    className={classes.modal}
                    variant="outlined"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h6'
                                align="left"
                            >
                                Editar Sku
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={3}>
                            <TextField 
                                id="" 
                                label="Nombre" 
                                variant="outlined" 
                                fullWidth
                                multiline
                                name='name'
                                onChange={(e)=>{
                                    setEditSku({...editSku, name:e.target.value})
                                }}
                                value={editSku.name}
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <TextField 
                                    id="" 
                                    label="Contenido" 
                                    variant="outlined" 
                                    fullWidth
                                    multiline
                                    name='content'
                                    //rows={2}
                                    onChange={(e)=>{
                                        setEditSku({...editSku, [e.target.name]:e.target.value.replace(/[^0-9]/g, '')})
                                    }}
                                    value={editSku.content}
                                    required
                                />
                                <div style={{marginTop:'.5em'}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Unidad *</InputLabel>
                                        <Select
                                            //value={age}
                                            name={'unit'}
                                            label="Unidad *"
                                            value={editSku.unit}
                                            onChange={(e)=>{
                                                setEditSku({...editSku, [e.target.name]:e.target.value})
                                            }}
                                        >
                                            <MenuItem value={'Kg'}>Kg</MenuItem>
                                            <MenuItem value={'Lib'}>Lib</MenuItem>
                                            <MenuItem value={'Gr'}>Gr</MenuItem>
                                    <MenuItem value={'Ml'}>Ml</MenuItem>
                                    <MenuItem value={'Pza'}>Pza</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{marginTop:'.5em'}}>
                                    <TextField 
                                        id=""
                                        label="Presentación" 
                                        variant="outlined" 
                                        fullWidth
                                        multiline
                                        name='presentation'
                                        //rows={2}
                                        onChange={(e)=>{
                                            setEditSku({...editSku, [e.target.name]:e.target.value})
                                        }}
                                        value={editSku.presentation}
                                        required
                                    />
                                </div>
                                <div style={{marginTop:'.5em'}}>
                                    <TextField 
                                        id=""
                                        label="Costo por unidad" 
                                        variant="outlined" 
                                        fullWidth
                                        multiline
                                        name='value'
                                        //rows={2}
                                        onChange={(e)=>{
                                            setEditSku({...editSku, [e.target.name]:e.target.value})
                                        }}
                                        value={editSku.value}
                                        required
                                    />
                                </div>
                                {
                                // <div style={{marginTop:'.5em', display:'block'}}>
                                //     <UploadImage
                                //         title={'Subir imagen'}
                                //         variant="outlined"
                                //         name='img'
                                //         onChange={(e)=>{
                                //             setEditSku({...editSku, [e.target.name]:e.target.value})
                                //         }}
                                //         value={editSku.img}
                                //     />
                                // </div>
                                }
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div style={{display:'flex'}}>
                                <RadioGropupGroupers
                                    name = 'grouper'
                                    items = {[...groupers.map(item=>({...item, checked:true}))]}
                                    onChange={(e)=>{
                                        setEditSku({...editSku, [e.target.name]:e.target.value})
                                    }}
                                    value={{...editSku.grouper}}
                                />  
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <RadioGroup
                                name = 'subcategory'
                                items = {[...subcategories]}
                                onChange={(e)=>{
                                    setEditSku({...editSku, [e.target.name]:e.target.value})
                                }}
                                value={editSku.subcategory}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Stack spacing={2} direction="row">
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={()=>{
                                        setOpenEditSku(!openEditSku)
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={()=>{
                                        let aux = skus.slice();
                                        aux[editSku.index] = editSku;
                                        if(updateSkus){
                                            //console.log(editGrouper)
                                            updateSkus(aux, editSku.index);
                                        }
                                        setOpenEditSku(!openEditSku)
                                    }}
                                    disabled={editSku.name==='' || editSku.content==='' || editSku.grouper===null || editSku.subcategory===null || editSku.unit===null || editSku.presentation===''}
                                >
                                    Actualizar
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </React.Fragment>
    )
}

export default Step2;