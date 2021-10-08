import React from 'react';

import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import RadioGroup from '../../Components/RadioGroup';
import FullScreenDialog from '../../Components/FullScreenDialog';

import Groupers from './Groupers';
import Skus from './Skus';

//temporal
import RelatableBoxes from '../../Components/RelatableBoxes';
import styled from 'styled-components';

const WrapperDiv = styled.div`
    ${props => props.classes}
`;

const getid = () => {
    return (Math.random() * (1000 - 1) + 1);
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
}));


function getSteps() {
    return ['Carga tus categorias y subcategorias', 'Carga tus marcas y SKU', 'Relaciona tus SKUs con los de la competencia'];
}

const NewData = () => {

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
        category:null,
    });
    
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
        setSubcategory({name:'',description:'', category:''});
    }

    const handleRemoveSubcategory = (index) => {
        let subcategories = state.subcategories.slice();
        subcategories.splice(index,1);
        setState({
            ...state,
            subcategories:[...subcategories],
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
                    <Grid item xs={6}>
                        <Typography align="left">
                            {data.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <ConfirmDialog
                                message='Esta seguro de eliminar esta subcategoria?'
                                title='Esta seguro de eliminar esta subcategoria?'
                                onOk={()=>{handleRemoveSubcategory(index)}}
                            >
                                <DeleteIcon/>
                            </ConfirmDialog>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                            onClick={()=>{}}
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
        setState({
            ...state,
            skus:[...state.skus, {...data, id:getid()}],
        });
    }

    const sortSubcategories = (base, sorted) => {
        let aux = [];

        console.log(base,sorted)
        for(let j=0;j<base.length;j++){
            for(let i=0;i<sorted.length;i++){
                //console.log(`${base[j].id}`+`${sorted[i].category}`)
                if(`${base[j].id}`===`${sorted[i].category.id}`){
                    aux.push(sorted[i])
                }
            }
        }
        
        return aux;
    }

    const sortSkus = (base, sorted) => {
        let aux = [];

        for(let j=0;j<base.length;j++){
            for(let i=0;i<sorted.length;i++){
                //console.log(`${base[j].id}`+`${sorted[i].subcategory}`)
                if(`${base[j].id}`===`${sorted[i].subcategory}`){
                    aux.push(sorted[i])
                }
            }
        }

        return aux;
    }

    const getClasses = () => {
        let lineClasses = {};

        for(let i=0;i<state.groupers.length;i++){
            lineClasses = {...lineClasses, ['.'+(`stroke-color-${state.groupers[i].name}-${state.groupers[i].id}`.replace(/\s/g, '_').split('.').join(""))]:{stroke:`${state.groupers[i].color} !important`}};
        }
        //console.log(JSON.stringify(lineClasses))
        return lineClasses;
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
                                <Grid item xs={12}>
                                    <div
                                        style={{
                                            marginTop: '1em'
                                        }}
                                    >
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
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
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
                                        Añade o elimina subcategorias para {state.category.name}
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
                                <Grid item xs={8}>
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
                                <Grid item xs={2}>
                                    <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                                        {/*<DeleteIcon/>*/}
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={pushSubcategory}
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    }
                    <div
                        style={{
                            marginTop: '1em'
                        }}
                    >
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
                        >
                            Siguiente
                        </Button>
                    </div>
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
                        <Groupers
                            groupers={state.groupers} 
                            pushGrouper={pushGrouper}
                        />
                        :
                        <Skus
                            groupers={state.groupers} 
                            subcategories={state.subcategories}
                            //groupers={[{color:'#eeefaf', name:'primer agrupador'},{color:'#25fafa', name:'2 agrupador'},{color:'#af3eee', name:'3'},{color:'#3fddaa', name:'agrupador con texto largo'},{color:'#afffaa', name:'5'}]}
                            //subcategories={[{name:'primero'},{name:'2'},{name:'uno con texto largo'},{name:'uno mas'}]}
                            pushSku={pushSku}
                            skus={state.skus}
                        />
                    }
                    <div
                        style={{
                            marginTop: '1em'
                        }}
                    >
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
                        >
                            Siguiente
                        </Button>
                    </div>
                </React.Fragment>
            );
          case 2:
            return(
                <>
                    <Grid container alignItems='center' spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h6'
                            >
                                Relaciona tus SKU con los de los competidores
                            </Typography>
                            <Typography
                                variant='caption'
                            >
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RelatableBoxes
                                dataFrom = {[...state.skus]}
                                dataTo = {[...state.skus]}
                                lineClasses={getClasses()}
                            />
                        </Grid>
                    </Grid>
                    
                </>
            );
          default:
            return 'Unknown step';
        }
    }

    return (
        <WrapperDiv classes={getClasses()}>
            <Grid container alignItems='flex-start' spacing={3}>
                <Grid item xs={4}>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Grid container alignItems='center' spacing={3}>
                                <Grid item xs={12}>
                                    <LinearProgress variant="determinate" value={activeStep*25} />
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        {
                                            getStepContent(activeStep)
                                        }
                                        {
                                            //console.log(state.groupers,'groupers')
                                        }
                                        <FullScreenDialog
                                            skus={sortSkus( state.subcategories, state.skus)}
                                            categories={[state.category]}
                                            subcategories={sortSubcategories( [state.category], state.subcategories)}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                        {/*<CardActions>
                            <Button variant='contained'>Learn More</Button>
                        </CardActions>*/}
                    </Card>
                </Grid>
            </Grid>
        </WrapperDiv>
    )
}

export default NewData;