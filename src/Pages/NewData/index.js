import React from 'react';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';

import LinearProgress from '@mui/material/LinearProgress';

import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

import ConfirmDialog from '../../Components/ConfirmDialog';
import FullScreenDialog from '../../Components/FullScreenDialog';

import Groupers from './Groupers';
import Skus from './Skus';
import Variables from './Variables';

//temporal
import RelatableBoxes from '../../Components/RelatableBoxes';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import ColorPicker from '../../Components/ColorPicker';
import Tabs from '../../Components/Tabs';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const WrapperDiv = styled.div`
    ${props => props.classes}
`;

const randomColor = () => {
    let color = Math.floor(Math.random()*16777215).toString(16);
    return `#${color}`;
}

const getid = () => {
    return `${(Math.random() * (1000 - 1) + 1)}`.split('.').join("");
}

const initialValues = {
    category: {
        name:'',
        description:'',
        variables:[],
        id:getid()
    },
    subcategories: [],
    groupers: [],
    skus:[],
    relations:[],
}

const useStyles = makeStyles((theme)=>({
    root: {
        minWidth: 275,
    },
    title:'SKU '+ {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        //marginTop: theme.spacing(1),
        //marginRight: theme.spacing(1), 
    },
    actionsContainer: {
        //marginBottom: theme.spacing(2),
    },
    resetContainer: {
        //padding: theme.spacing(3),
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        padding:'1em',
        p: 4,
    },
    colorSquare: {
        width: '1em',
        height: '1em',
        borderRadius: '2px',
        marginRight: '.5em',
        border: '2px solid #c4c4c4',
    },
}));

function getSteps() {
    return ['Carga tus categorias y subcategorias', 'Carga tus marcas y SKU', 'Relaciona tus SKUs con los de la competencia', 'Carga tus variables'];
}

const NewData = ({onUpdate, onFinish}) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const [state, setState] = React.useState({
        ...initialValues
    });

    const [subStep, setSubStep] = React.useState({
        step: 0
    })

    const [category, setCategory] = React.useState({
        name:'',
        description:'',
        variables:[],
    });
    
    const [subcategory, setSubcategory] = React.useState({
        name:'',
        description:'',
        totalSale:'',
        totalSaleValue:'',
        totalSaleUnit:'',
        category:null,
        color:randomColor()
    });

    const [editSubcategory, setEditSubcategory] = React.useState({
        name:'',
        description:'',
        totalSale:'',
        totalSaleValue:'',
        totalSaleUnit:'',
        category:null,
    });

    const [openEditSubcategory, setOpenEditSubcategory] = React.useState(false);

    const [tab, setTab] = React.useState(0);
    
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleInputChangeCategory = (e) => {
        const {name, value} = e.target;
        setState({...state, category: {...state.category, [name]:value}});
    }

    const pushCategory = () => {
        let data = category;
        setState({
            ...state,
            categories:[...state.categories, {...data, id:state.categories.length}],
        });
        setCategory({name:'',description:''});
    }

    const handleInputChangeSubcategories = (e) => {
        const {name, value} = e.target;
        setSubcategory({...subcategory, [name]:value});
    }

    const pushSubcategory = () => {
        let data = subcategory;
        setState({
            ...state,
            subcategories:[...state.subcategories, {...data, id:getid(), category: state.category}],
        });
        setSubcategory({name:'',description:'', category:'', totalSale: '', totalSaleValue: '', totalSaleUnit:'', color:randomColor()});
    }

    const handleRemoveSubcategory = (index) => {
        let subcategories = state.subcategories.slice();
        subcategories.splice(index,1);
        setState({
            ...state,
            subcategories:[...subcategories],
        });
    }

    const handleRemoveGrouper = (index) => {
        let groupers = state.groupers.slice();
        groupers.splice(index,1);
        setState({
            ...state,
            groupers:[...groupers],
        });
    }

    const handleRemoveSku = (index) => {
        let skus = state.skus.slice();
        skus.splice(index,1);
        setState({
            ...state,
            skus:[...skus],
        });
    }

    const getSubcategories = () => {
        return (
            state.subcategories.map((data, index) => 
                <React.Fragment key={index}>
                    <Grid item xs={4}>
                        <Typography align="left">
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="left">
                            {data.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.colorSquare} style={{backgroundColor:data.color}}/>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <ConfirmDialog
                                //message='Esta seguro de eliminar esta subcategoria?'
                                title='Esta seguro de eliminar esta subcategoria?'
                                onOk={()=>{handleRemoveSubcategory(index)}}
                            >
                                <DeleteIcon/>
                            </ConfirmDialog>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', cursor:'pointer'}}
                            onClick={()=>{
                                setOpenEditSubcategory(!openEditSubcategory);
                                setEditSubcategory({...data, index})
                            }}
                        >
                            <EditIcon/>
                        </div>
                    </Grid>
                </React.Fragment>
            )
        )
    }

    const pushGrouper = (data) => {
        setState({
            ...state,
            groupers:[...state.groupers, {...data, id: getid()}],
        });
    }

    const pushSku = (data) => {
        let newSkus = JSON.parse(JSON.stringify(data));
        for(let i=0;i<newSkus.length;i++){
            newSkus[i] = {...newSkus[i], id:getid()};
            delete newSkus[i]['checked'];
        }
        newSkus = [...state.skus, ...newSkus];
        
        setState({
            ...state,
            skus:[...newSkus],
        });
        /*setState({
            ...state,
            skus:[...state.skus, {...data, id:getid()}],
        });*/
    }

    const sortSubcategories = (base, sorted) => {
        let aux = [];

        ////console.log('sortSubcategories',base,sorted)
        for(let j=0;j<base.length;j++){
            for(let i=0;i<sorted.length;i++){
                ////console.log(`${base[j].id}`+`${sorted[i].category}`)
                if(`${base[j].id}`===`${sorted[i].category.id}`){
                    aux.push(sorted[i])
                }
            }
        }
        
        return aux;
    }

    const sortSkus = (base, sorted, brands) => {
        let aux = [];
        let skus = [];

        //console.log(brands, sorted)
        for(let j=0;j<brands.length;j++){
            for(let i=0;i<sorted.length;i++){
                if(`${brands[j].id}`===`${sorted[i].grouper.id}`){
                    skus.push(sorted[i])
                }
            }
        }

        //console.log(skus)
        for(let j=0;j<base.length;j++){
            for(let i=0;i<skus.length;i++){
                ////console.log(`${base[j].id}`+`${sorted[i].subcategory}`)
                if(`${base[j].id}`===`${skus[i].subcategory.id}`){
                    aux.push(skus[i])
                }
            }
        }
        ////console.log('aux', sorted, base)
        return aux;
    }

    const getClasses = () => {
        let lineClasses = {};

        for(let i=0;i<state.groupers.length;i++){
            lineClasses = {
                ...lineClasses, 
                ['.'+(`stroke-color-${state.groupers[i].name}-${state.groupers[i].id}`.replace(/\s/g, '_').split('.').join(""))]:{
                    stroke:`${state.groupers[i].color} !important`
                }
            };
        }
        ////console.log(JSON.stringify(lineClasses))
        return lineClasses;
    }

    const handleUpdate = (data) => {
        setState({...state, relations: data})
    }

    const skuFilter = (index) => {
        let newSkus = [];
        for(let i=0;i<state.skus.length;i++){
            if(state.skus[i].subcategory.id===state.subcategories[index].id)
                newSkus.push(state.skus[i])
            //console.log(state.skus[i].subcategory.id, state.subcategories[index].id)
        }
        return (newSkus);
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <div>
                        {   subStep.step===0?
                            <React.Fragment>
                                <Grid container alignItems='center' spacing={3}>
                                    <Grid item xs={12}>
                                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                            <Typography color="primary">
                                                Categoria
                                            </Typography>
                                            <Typography color="inherit">
                                                Subategorias
                                            </Typography>
                                        </Breadcrumbs>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant='h6'
                                            align="left"
                                        >
                                            Añade los datos de la categoria
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            align="left"
                                            display="block"
                                        >
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}/>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle1" align="left">Nombre</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="subtitle1" align="left">Descripcion</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField 
                                            id="" 
                                            label="Nombre" 
                                            variant="outlined" 
                                            fullWidth
                                            name='name'
                                            onChange={handleInputChangeCategory}
                                            value={state.category.name}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField 
                                            id="" 
                                            label="Descripcion" 
                                            variant="outlined" 
                                            fullWidth
                                            multiline
                                            name='description'
                                            //rows={2}
                                            onChange={handleInputChangeCategory}
                                            value={state.category.description}
                                        />
                                    </Grid>
                                </Grid>
                                <div
                                    style={{
                                        marginTop: '1em',
                                        display: 'flex'
                                    }}
                                >  
                                    <Stack spacing={2} direction="row">
                                        <Button
                                            variant='contained'
                                            disabled
                                        >
                                            Volver
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={
                                                ()=>{
                                                    setSubStep({step:1}); 
                                                    if(subStep.step===1){
                                                        setActiveStep(1); 
                                                        setSubStep({step:0})
                                                    }
                                                }
                                            }
                                            disabled={state.category.name===''}
                                        >
                                            Siguiente
                                        </Button>
                                    </Stack>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Grid container alignItems='center' spacing={3}>
                                    <Grid item xs={12}>
                                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                            <Typography color="inherit">
                                                Categorias
                                            </Typography>
                                            <Typography color="primary">
                                                Subategorias
                                            </Typography>
                                        </Breadcrumbs>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant='h6'
                                            align="left"
                                        >
                                            Añade o elimina subcategorias para <span style={{textTransform:'capitalize'}}>{state.category.name}</span>
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            align="left"
                                            display="block"
                                        >
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}/>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle1" align="left">Nombre</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle1" align="left">Descripcion</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle1" align="left">Color</Typography>
                                    </Grid>
                                    { getSubcategories() }
                                    <Grid item xs={4}>
                                        <TextField 
                                            id="" 
                                            label="Nombre" 
                                            variant="outlined" 
                                            fullWidth
                                            name='name'
                                            onChange={handleInputChangeSubcategories}
                                            value={subcategory.name}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField 
                                            id="" 
                                            label="Descripcion" 
                                            variant="outlined" 
                                            fullWidth
                                            multiline
                                            name='description'
                                            //rows={2}
                                            onChange={handleInputChangeSubcategories}
                                            value={subcategory.description}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ColorPicker
                                            onChangeComplete={handleInputChangeSubcategories}
                                            name='color'
                                            value={subcategory.color}
                                        />
                                    </Grid>
                                    {/* 
                                    <Grid item xs={2}>
                                        <TextField 
                                            id="" 
                                            label="Venta total" 
                                            variant="outlined" 
                                            fullWidth
                                            multiline
                                            name='totalSale'
                                            //rows={2}
                                            onChange={handleInputChangeSubcategories}
                                            value={subcategory.totalSale}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth>
                                            <InputLabel>Unidad *</InputLabel>
                                            <Select
                                                //value={age}
                                                name={'totalSaleUnit'}
                                                label="Unidad *"
                                                value={subcategory.totalSaleUnit}
                                                onChange={handleInputChangeSubcategories}
                                            >
                                                <MenuItem value={'Kg'}>Kg</MenuItem>
                                                <MenuItem value={'Lib'}>Lib</MenuItem>
                                                <MenuItem value={'Gr'}>Gr</MenuItem>
                                                <MenuItem value={'T'}>T</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField 
                                            id="" 
                                            label="Total de ventas $" 
                                            variant="outlined" 
                                            fullWidth
                                            multiline
                                            name='totalSaleValue'
                                            //rows={2}
                                            onChange={handleInputChangeSubcategories}
                                            value={subcategory.totalSaleValue}
                                        />
                                    </Grid>
                                    */}
                                    <Grid item xs={12}>
                                        <div style={{height: '100%', display: 'flex', justifyContent: 'left', alignItems:'center'}}>
                                            {/*<DeleteIcon/>*/}
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={pushSubcategory}
                                                disabled={subcategory.name===''}
                                            >
                                                Guardar
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                
                                <div
                                    style={{
                                        marginTop: '1em',
                                        display: 'flex'
                                    }}
                                >
                                    <Stack spacing={2} direction="row">
                                        <Button
                                            variant='contained'
                                            onClick={()=>{setSubStep({step:0})}}
                                            disabled={subStep.step===0}
                                        >
                                            Volver
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={()=>{setSubStep({step:1}); if(subStep.step===1){setActiveStep(1); setSubStep({step:0})}}}
                                            disabled={state.subcategories.length===0}
                                        >
                                            Siguiente
                                        </Button>
                                    </Stack>
                                </div>
                                <Modal
                                    open={openEditSubcategory}
                                    onClose={()=>{setOpenEditSubcategory(!openEditSubcategory)}}
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
                                                    Editar subcategoria
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField 
                                                    label="Nombre" 
                                                    variant="outlined" 
                                                    fullWidth
                                                    name='name'
                                                    onChange={(e)=>{
                                                        setEditSubcategory({...editSubcategory, name:e.target.value})
                                                    }}
                                                    value={editSubcategory.name}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField 
                                                    id="" 
                                                    label="Descripcion" 
                                                    variant="outlined" 
                                                    fullWidth
                                                    multiline
                                                    name='description'
                                                    //rows={2}
                                                    onChange={(e)=>{
                                                        setEditSubcategory({...editSubcategory, description:e.target.value})
                                                    }}
                                                    value={editSubcategory.description}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <ColorPicker
                                                    onChangeComplete={(e)=>{
                                                        //console.log(e)
                                                        setEditSubcategory({...editSubcategory, color:e.target.value})
                                                    }}
                                                    name='color'
                                                    value={editSubcategory.color}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField 
                                                    id="" 
                                                    label="Venta total" 
                                                    variant="outlined" 
                                                    fullWidth
                                                    multiline
                                                    name='totalSale'
                                                    //rows={2}
                                                    onChange={(e)=>{
                                                        //console.log(e)
                                                        setEditSubcategory({...editSubcategory, totalSale:e.target.value})
                                                    }}
                                                    value={editSubcategory.totalSale}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Unidad *</InputLabel>
                                                    <Select
                                                        //value={age}
                                                        name={'totalSaleUnit'}
                                                        label="Unidad *"
                                                        value={editSubcategory.totalSaleUnit}
                                                        onChange={(e)=>{
                                                            //console.log(e)
                                                            setEditSubcategory({...editSubcategory, totalSaleUnit:e.target.value})
                                                        }}
                                                    >
                                                        <MenuItem value={'Kg'}>Kg</MenuItem>
                                                        <MenuItem value={'Lib'}>Lib</MenuItem>
                                                        <MenuItem value={'Gr'}>Gr</MenuItem>
                                                        <MenuItem value={'T'}>T</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField 
                                                    id="" 
                                                    label="Total de ventas $" 
                                                    variant="outlined" 
                                                    fullWidth
                                                    multiline
                                                    name='totalSaleValue'
                                                    //rows={2}
                                                    onChange={(e)=>{
                                                        //console.log(e)
                                                        setEditSubcategory({...editSubcategory, totalSaleValue:e.target.value})
                                                    }}
                                                    value={editSubcategory.totalSaleValue}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={2} direction="row">
                                                    <Button
                                                        variant='contained'
                                                        color='secondary'
                                                        onClick={()=>{setOpenEditSubcategory(!openEditSubcategory)}}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        onClick={()=>{
                                                            //updatesubcategories
                                                            let aux = state.subcategories.slice();
                                                            let auxSkus = state.skus.slice();
                                                            aux[editSubcategory.index] = editSubcategory;
                                                            setOpenEditSubcategory(!openEditSubcategory);
                                                            //console.log(state.skus)
                                                            for(let i=0;i<auxSkus.length;i++){
                                                                if(auxSkus[i].subcategory.id===editSubcategory.id){
                                                                    auxSkus[i].subcategory=editSubcategory;
                                                                }
                                                            }
                                                            setState({...state, subcategories: aux, skus: auxSkus});
                                                        }}
                                                        disabled={editSubcategory.name===''}
                                                    >
                                                        Actualizar
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Modal>
                            </React.Fragment>
                        }
                    </div>
                );
            case 1:
                return (
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Typography color={subStep.step===0?"primary":"inherit"}>
                                    Marcas
                                </Typography>
                                <Typography  color={subStep.step===1?"primary":"inherit"}>
                                    SKUs
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                        {subStep.step===0?
                            <>
                                <Groupers
                                    groupers={state.groupers} 
                                    pushGrouper={pushGrouper}
                                    updateGroupers={(data)=>{
                                        //console.log('upating groupers', data)
                                        let newSkus = JSON.parse(JSON.stringify(state.skus));
                                        for(let i=0;i<newSkus.length;i++){
                                            for(let j=0;j<data.length;j++){
                                                if(newSkus[i].grouper.id===data[j].id){
                                                    newSkus[i].grouper=data[j];
                                                }
                                            }
                                        }
                                        setState({...state, groupers:data, skus:newSkus});
                                    }}
                                    removeGrouper={handleRemoveGrouper}
                                />
                                <div
                                    style={{
                                        marginTop: '1em',
                                        display: 'flex'
                                    }}
                                >
                                    <Stack spacing={2} direction="row">
                                        <Button
                                            variant='contained'
                                            onClick={()=>{setActiveStep(0); setSubStep({step:1})}}
                                        >
                                            Volver
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={()=>{setSubStep({step:1}); if(subStep.step===1)setActiveStep(2)}}
                                            disabled={state.groupers.length===0}
                                        >
                                            Siguiente
                                        </Button>
                                    </Stack>
                                </div>
                            </>
                            :
                            <>
                                <Skus
                                    groupers={state.groupers} 
                                    subcategories={state.subcategories}
                                    //groupers={[{color:'#eeefaf', name:'primer agrupador'},{color:'#25fafa', name:'2 agrupador'},{color:'#af3eee', name:'3'},{color:'#3fddaa', name:'agrupador con texto largo'},{color:'#afffaa', name:'5'}]}
                                    //subcategories={[{name:'primero'},{name:'2'},{name:'uno con texto largo'},{name:'uno mas'}]}
                                    pushSku={pushSku}
                                    skus={state.skus}
                                    updateSkus={(data)=>{
                                        setState({...state, skus: data})
                                    }}
                                    removeSku={handleRemoveSku}
                                    onFilter={(data)=>{
                                        setState({...state, filter: data})
                                    }}
                                />
                                <div
                                    style={{
                                        marginTop: '1em',
                                        display: 'flex'
                                    }}
                                >
                                    <Stack spacing={2} direction="row">
                                        <Button
                                            variant='contained'
                                            onClick={()=>{setSubStep({step:0})}}
                                            disabled={subStep.step===0}
                                        >
                                            Volver
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={()=>{setSubStep({step:1}); if(subStep.step===1)setActiveStep(2)}}
                                            disabled={state.skus.length===0}
                                        >
                                            Siguiente
                                        </Button>
                                    </Stack>
                                </div>
                            </>
                        }
                    </React.Fragment>
                );
            case 2:
            return(
                <>
                    <Grid container alignItems='center' spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h6'
                                align='left'
                            >
                                Relaciona tus SKU con los de los competidores
                            </Typography>
                            <Typography
                                variant='caption'
                                align='left'
                                display='block'
                                color='#aaa'
                            >
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                // <RelatableBoxes
                                //     dataFrom = {[...state.skus]}
                                //     dataTo = {[...state.skus]}
                                //     lineClasses={getClasses()}
                                //     onUpdate={handleUpdate}
                                //     relations={state.relations}
                                // />
                            }
                            <Tabs
                                tabs={state.subcategories}
                                onChange={(index)=>{
                                    //skuFilter(index);
                                    setTab(index);
                                }}
                            >
                                <RelatableBoxes
                                     dataFrom = {[...skuFilter(tab)]}
                                     dataTo = {[...skuFilter(tab)]}
                                     lineClasses={getClasses()}
                                     onUpdate={handleUpdate}
                                     relations={state.relations}
                                 />
                            </Tabs>
                        </Grid>
                    </Grid>
                    <div
                        style={{
                            marginTop: '1em'
                        }}
                    >
                        <Stack spacing={2} direction="row">
                            <Button
                                variant='contained'
                                onClick={()=>{setActiveStep(1)}}
                                disabled={subStep.step===0}
                            >
                                Volver
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={()=>{
                                    setActiveStep(3)
                                    //onUpdate(state);
                                    //onFinish();
                                }}
                            >
                                Guardar
                            </Button>
                        </Stack>
                    </div>
                </>
            );
            case 3:
                return (
                    <>
                    <Grid container alignItems='center' spacing={3}>
                        <Grid item xs={12}>
                            <Variables
                                subcategories={state.subcategories}
                                skus={state.skus}
                                brands={state.groupers}
                                category={state.category}
                                onChange={(e)=>{
                                    setState({...state, variables:e})
                                }}
                            />
                        </Grid>
                    </Grid>
                    <div
                        style={{
                            marginTop: '1em'
                        }}
                    >
                        <Stack spacing={2} direction="row">
                            <Button
                                variant='contained'
                                onClick={()=>{setActiveStep(2)}}
                                disabled={subStep.step===0}
                            >
                                Volver
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={()=>{
                                    //setActiveStep(3)
                                    onUpdate(state);
                                    onFinish();
                                }}
                            >
                                Guardar categoria
                            </Button>
                        </Stack>
                    </div>
                    </>
                );
            
            default:
                return 'Unknown step';
        }
    }

    return (
        <WrapperDiv classes={getClasses()}>
            <Grid container alignItems='flex-start' spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} orientation="horizontal" alternativeLabel>
                            {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            {
                                            // <Button
                                            //     disabled={activeStep === 0}
                                            //     onClick={handleBack}
                                            //     className={classes.button}
                                            // >
                                            //     Back
                                            // </Button>
                                            // <Button
                                            //     variant="contained"
                                            //     color="primary"
                                            //     onClick={handleNext}
                                            //     className={classes.button}
                                            // >
                                            //     {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            // </Button>
                                            }
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                            ))}
                        </Stepper>
                        {
                            // activeStep === steps.length && (
                            // <Paper square elevation={0} className={classes.resetContainer}>
                            //     <Typography>All steps completed - you&apos;re finished</Typography>
                            //     <Button onClick={handleReset} className={classes.button}>
                            //         Reset
                            //     </Button>
                            // </Paper>
                            // )
                        }
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Paper 
                        variant="outlined"
                        style={{padding:'1em'}}
                    >
                        <Grid container alignItems='center' spacing={3}>
                            <Grid item xs={12}>
                                <LinearProgress variant="determinate" value={activeStep*33.333} />
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    {
                                        getStepContent(activeStep)
                                    }
                                    {
                                        ////console.log(state.groupers,'groupers')
                                    }
                                    {
                                        activeStep<5?
                                            <FullScreenDialog
                                                skus={sortSkus( state.subcategories, state.skus, state.groupers)}
                                                categories={[state.category]}
                                                subcategories={sortSubcategories( [state.category], state.subcategories)}
                                                brands={state.groupers}
                                                filters={
                                                    state.filter
                                                }
                                            />
                                        :
                                            <></>
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </WrapperDiv>
    )
}

export default NewData;